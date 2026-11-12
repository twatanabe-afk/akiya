(function () {
  const SCHEMA = window.SURVEY_SCHEMA;
  const LEGENDS = SCHEMA.legends;
  let map = null;
  let currentHouseId = null;
  let currentFormProps = {};
  let userLocationMarker = null;
  let watchId = null;
  let pmtilesObjectUrl = null;

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  }

  // Online / Offline indicator
  function updateNetworkStatus() {
    const el = document.getElementById('netStatus');
    if (navigator.onLine) {
      el.textContent = 'オンライン';
      el.className = 'badge-status badge-online';
    } else {
      el.textContent = 'オフライン動作中';
      el.className = 'badge-status badge-offline';
    }
  }
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus();

  // Image auto-resize (max 1600px, JPEG 0.8) to prevent iOS memory/storage crash
  function resizeImageFile(file, maxDim = 1600, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('Blob変換失敗'))),
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  // Build MapLibre style (GSI Pale/Std Raster or Offline PMTiles)
  function createMapStyle(pmtilesUrl) {
    if (pmtilesUrl) {
      return {
        version: 8,
        sources: {
          offline_vec: {
            type: 'vector',
            url: 'pmtiles://' + pmtilesUrl
          }
        },
        layers: [
          { id: 'bg', type: 'background', paint: { 'background-color': '#f1f5f9' } },
          {
            id: 'water',
            type: 'fill',
            source: 'offline_vec',
            'source-layer': 'waterarea',
            paint: { 'fill-color': '#bae6fd' }
          },
          {
            id: 'road',
            type: 'line',
            source: 'offline_vec',
            'source-layer': 'road',
            paint: { 'line-color': '#cbd5e1', 'line-width': 1.5 }
          },
          {
            id: 'building',
            type: 'fill',
            source: 'offline_vec',
            'source-layer': 'building',
            paint: { 'fill-color': '#e2e8f0', 'fill-outline-color': '#94a3b8' }
          }
        ]
      };
    }
    return {
      version: 8,
      sources: {
        gsi_std: {
          type: 'raster',
          tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '国土地理院'
        }
      },
      layers: [
        {
          id: 'gsi_std_layer',
          type: 'raster',
          source: 'gsi_std',
          minzoom: 0,
          maxzoom: 18
        }
      ]
    };
  }

  // Initialize Map
  async function initMap() {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);

    map = new maplibregl.Map({
      container: 'map',
      style: createMapStyle(null),
      center: [140.3597, 37.4005], // 郡山市役所付近
      zoom: 16,
      maxZoom: 20
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', async () => {
      addHouseLayers();
      await loadAndRenderHouses();
    });
  }

  function addHouseLayers() {
    if (!map.getSource('houses')) {
      map.addSource('houses', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
    }

    // Legend colors from CSV: 3=空き家(#004cff), 4=空き家ではない(#c8ff00), 5=判断できない(#fb24ff), 6=未判定(#ff4000)
    const colorMatch = [
      'match',
      ['to-string', ['get', '空家判定']],
      '3', LEGENDS['3'].fillColor,
      '4', LEGENDS['4'].fillColor,
      '5', LEGENDS['5'].fillColor,
      '6', LEGENDS['6'].fillColor,
      '#ff4000'
    ];

    if (!map.getLayer('houses-fill')) {
      map.addLayer({
        id: 'houses-fill',
        type: 'fill',
        source: 'houses',
        paint: {
          'fill-color': colorMatch,
          'fill-opacity': 0.65
        }
      });
    }

    if (!map.getLayer('houses-line')) {
      map.addLayer({
        id: 'houses-line',
        type: 'line',
        source: 'houses',
        paint: {
          'line-color': colorMatch,
          'line-width': 2.5
        }
      });
    }

    if (!map.getLayer('houses-point')) {
      map.addLayer({
        id: 'houses-point',
        type: 'circle',
        source: 'houses',
        filter: ['==', ['geometry-type'], 'Point'],
        paint: {
          'circle-radius': 8,
          'circle-color': colorMatch,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000'
        }
      });
    }

    // Tap on house polygon/point
    ['houses-fill', 'houses-point'].forEach((layerId) => {
      map.on('click', layerId, (e) => {
        if (!e.features || !e.features.length) return;
        const props = e.features[0].properties;
        openSurveyDrawer(props['調査id']);
      });
    });
  }

  async function loadAndRenderHouses(fitBounds = false) {
    let houses = await SurveyDB.getAllHouses();
    if (houses.length === 0) {
      await SurveyDB.saveGeoJSON(window.SAMPLE_GEOJSON);
      houses = await SurveyDB.getAllHouses();
    }

    const fc = {
      type: 'FeatureCollection',
      features: houses.map((h) => ({
        type: 'Feature',
        geometry: h.geometry,
        properties: h.properties
      }))
    };

    const src = map.getSource('houses');
    if (src) src.setData(fc);

    updateStatsBar(houses);

    if (fitBounds && fc.features.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      fc.features.forEach((f) => {
        const coords = f.geometry.type === 'Point'
          ? [f.geometry.coordinates]
          : f.geometry.type === 'Polygon'
            ? f.geometry.coordinates[0]
            : f.geometry.coordinates.flat(2);
        coords.forEach((c) => {
          if (Array.isArray(c) && c.length >= 2) bounds.extend(c);
        });
      });
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 50, maxZoom: 18 });
      }
    }
  }

  function updateStatsBar(houses) {
    const total = houses.length;
    const done = houses.filter((h) => h.status !== '6').length;
    const akiya = houses.filter((h) => h.status === '3').length;
    document.getElementById('statsText').innerHTML =
      `対象: <b>${total}</b>棟 / 調査済: <b>${done}</b>棟 (空き家: <b>${akiya}</b>棟)`;
  }

  // Build Legend UI
  function renderLegend() {
    const wrap = document.getElementById('legendWrap');
    ['3', '4', '5', '6'].forEach((k) => {
      const item = LEGENDS[k];
      const div = document.createElement('div');
      div.className = 'legend-item';
      div.innerHTML = `<span class="legend-dot" style="background:${item.fillColor}"></span><span>${item.name}</span>`;
      wrap.appendChild(div);
    });
  }

  // Open Survey Form Drawer
  async function openSurveyDrawer(houseId) {
    const house = await SurveyDB.getHouse(houseId);
    if (!house) return;
    currentHouseId = houseId;
    currentFormProps = { ...house.properties };

    // Auto-fill surveyor, date, time if empty
    const savedSurveyor = await SurveyDB.getMeta('surveyorName');
    if (!currentFormProps['調査員'] && savedSurveyor) {
      currentFormProps['調査員'] = savedSurveyor;
    }
    const now = new Date();
    if (!currentFormProps['調査日付']) {
      currentFormProps['調査日付'] = now.toISOString().slice(0, 10);
    }
    if (!currentFormProps['調査時間']) {
      currentFormProps['調査時間'] = now.toTimeString().slice(0, 5);
    }

    document.getElementById('drawerTitle').textContent = `家屋ID: ${houseId}`;
    document.getElementById('drawerSub').textContent =
      currentFormProps['所在地住所'] || currentFormProps['家屋_所在地'] || '住所未登録';

    renderFormSections();
    recalculateScores();
    await renderPhotoList();

    document.getElementById('surveyDrawer').classList.add('open');
  }

  function closeSurveyDrawer() {
    document.getElementById('surveyDrawer').classList.remove('open');
    currentHouseId = null;
  }

  // Calculate Badness Score & Check Counts automatically
  function recalculateScores() {
    let badnessTotal = 0;
    let dangerCount = 0;
    let mgmtCount = 0;

    SCHEMA.fields.forEach((f) => {
      const val = currentFormProps[f.col];
      if (f.options && f.options.length > 0 && val && val !== '-1') {
        const matched = f.options.find((o) => o.code === String(val));
        if (matched && typeof matched.score === 'number') {
          badnessTotal += matched.score;
        }
      }
      if (f.type === 14 && (val === true || val === '1' || val === 1)) {
        if (f.col.startsWith('影響_被害_危険性_')) dangerCount++;
        if (f.col.startsWith('管理状況_')) mgmtCount++;
      }
    });

    currentFormProps['不良度評点'] = String(badnessTotal);
    currentFormProps['影響_被害_危険性該当数'] = String(dangerCount);
    currentFormProps['管理状況該当数'] = String(mgmtCount);

    const elBad = document.getElementById('input_不良度評点');
    if (elBad) elBad.value = badnessTotal;
    const elDan = document.getElementById('input_影響_被害_危険性該当数');
    if (elDan) elDan.value = dangerCount;
    const elMgt = document.getElementById('input_管理状況該当数');
    if (elMgt) elMgt.value = mgmtCount;

    document.getElementById('liveBadnessScore').textContent = `${badnessTotal} 点`;
    document.getElementById('liveDangerCount').textContent = `${dangerCount} 件`;

    updatePhotoBoxState();
  }

  function updatePhotoBoxState() {
    const box = document.getElementById('photoBox');
    const hint = document.getElementById('photoHint');
    const isAkiya = String(currentFormProps['空家判定']) === '3';
    if (isAkiya) {
      box.classList.remove('inactive');
      hint.textContent = '※「空き家」判定のため、外観写真（2枚目安）を撮影してください';
    } else {
      box.classList.add('inactive');
      hint.textContent = '※ 空家判定が「空き家」の場合に撮影対象になります（任意撮影も可）';
    }
  }

  // Render Dynamic Form with Parent-Child Visibility
  function renderFormSections() {
    const container = document.getElementById('formSectionsContainer');
    const tabsWrap = document.getElementById('sectionTabs');
    container.innerHTML = '';
    tabsWrap.innerHTML = '';

    const sections = [];
    const sectionMap = {};
    SCHEMA.fields.forEach((f) => {
      if (!sectionMap[f.section]) {
        sectionMap[f.section] = [];
        sections.push(f.section);
      }
      sectionMap[f.section].push(f);
    });

    sections.forEach((secName, sIdx) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'tab-btn' + (sIdx === 0 ? ' active' : '');
      tab.textContent = secName.replace(/^\d+\.\s*/, '');
      tab.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`sec_${sIdx}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      tabsWrap.appendChild(tab);

      const card = document.createElement('div');
      card.className = 'section-card';
      card.id = `sec_${sIdx}`;
      card.innerHTML = `<h3 class="section-title">${secName}</h3>`;

      sectionMap[secName].forEach((field) => {
        const row = document.createElement('div');
        row.className = 'field-row' + (field.condition ? ' child-field' : '');
        row.dataset.col = field.col;

        if (field.type === 14) {
          // Checkbox
          const checked = currentFormProps[field.col] === true || currentFormProps[field.col] === '1' || currentFormProps[field.col] === 1;
          row.innerHTML = `
            <label class="check-row">
              <input type="checkbox" id="input_${field.col}" ${checked ? 'checked' : ''}>
              <span>${field.label}</span>
            </label>
          `;
          const cb = row.querySelector('input');
          cb.addEventListener('change', () => {
            currentFormProps[field.col] = cb.checked ? '1' : '0';
            recalculateScores();
            updateConditionalVisibility();
          });
        } else if (field.options && field.options.length > 0) {
          // Dropdown (type 3 or 5)
          const curVal = currentFormProps[field.col] !== undefined ? String(currentFormProps[field.col]) : '-1';
          const selectedOpt = field.options.find((o) => o.code === curVal);
          const scoreBadge = selectedOpt && typeof selectedOpt.score === 'number'
            ? `<span class="score-tag" id="score_${field.col}">配点: ${selectedOpt.score}</span>`
            : `<span class="score-tag" id="score_${field.col}" style="display:none"></span>`;

          let optsHtml = field.options
            .map((o) => {
              const scTxt = typeof o.score === 'number' ? ` (${o.score}点)` : '';
              return `<option value="${o.code}" ${o.code === curVal ? 'selected' : ''}>${o.label}${scTxt}</option>`;
            })
            .join('');

          row.innerHTML = `
            <div class="field-label">
              <span>${field.label}</span>
              ${scoreBadge}
            </div>
            <select id="input_${field.col}">${optsHtml}</select>
          `;
          const sel = row.querySelector('select');
          sel.addEventListener('change', () => {
            currentFormProps[field.col] = sel.value;
            const opt = field.options.find((o) => o.code === sel.value);
            const tag = document.getElementById(`score_${field.col}`);
            if (opt && typeof opt.score === 'number') {
              tag.textContent = `配点: ${opt.score}`;
              tag.style.display = 'inline-block';
            } else {
              tag.style.display = 'none';
            }
            recalculateScores();
            updateConditionalVisibility();
          });
        } else {
          // Text / Date / Time / ImageID
          let inputType = 'text';
          if (field.type === 11) inputType = 'date';
          if (field.type === 15) inputType = 'time';
          const val = currentFormProps[field.col] !== undefined && currentFormProps[field.col] !== null
            ? String(currentFormProps[field.col])
            : '';

          row.innerHTML = `
            <div class="field-label"><span>${field.label}</span></div>
            <input type="${inputType}" id="input_${field.col}" value="${val.replace(/"/g, '&quot;')}" ${field.readonly ? 'readonly' : ''}>
          `;
          const inp = row.querySelector('input');
          if (!field.readonly) {
            inp.addEventListener('input', () => {
              currentFormProps[field.col] = inp.value;
            });
          }
        }

        card.appendChild(row);
      });

      container.appendChild(card);
    });

    updateConditionalVisibility();
  }

  // Show/hide child fields based on parent selection
  function updateConditionalVisibility() {
    SCHEMA.fields.forEach((field) => {
      if (!field.condition) return;
      const row = document.querySelector(`.field-row[data-col="${CSS.escape(field.col)}"]`);
      if (!row) return;
      const parentVal = String(currentFormProps[field.condition.field] || '');
      const visible = field.condition.values.includes(parentVal);
      row.style.display = visible ? 'block' : 'none';
    });
  }

  // Photo Capture & Display
  async function renderPhotoList() {
    if (!currentHouseId) return;
    const photos = await SurveyDB.getPhotosByHouse(currentHouseId);
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = '';

    // Sync 画像ID field with comma-separated filenames
    const fileNames = photos.map((p) => p.fileName);
    currentFormProps['画像ID'] = fileNames.join(',');
    const imgIdInp = document.getElementById('input_画像ID');
    if (imgIdInp) imgIdInp.value = currentFormProps['画像ID'];

    photos.forEach((p) => {
      const url = URL.createObjectURL(p.blob);
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <img src="${url}" alt="${p.fileName}">
        <div class="photo-meta">${p.fileName}</div>
        <button type="button" class="photo-del" title="削除">×</button>
      `;
      card.querySelector('.photo-del').onclick = async () => {
        if (confirm(`写真「${p.fileName}」を削除しますか？`)) {
          await SurveyDB.deletePhoto(p.pk);
          await renderPhotoList();
        }
      };
      grid.appendChild(card);
    });
  }

  document.getElementById('cameraInput').addEventListener('change', async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !currentHouseId) return;
    const existing = await SurveyDB.getPhotosByHouse(currentHouseId);
    let seq = existing.length + 1;

    for (const file of files) {
      try {
        const resizedBlob = await resizeImageFile(file, 1600, 0.8);
        const fileName = `${currentHouseId}_${String(seq).padStart(2, '0')}.jpg`;
        await SurveyDB.addPhoto(currentHouseId, resizedBlob, fileName);
        seq++;
      } catch (err) {
        alert('画像の処理に失敗しました: ' + err.message);
      }
    }
    e.target.value = '';
    await renderPhotoList();
  });

  // Save House Survey
  document.getElementById('btnSaveHouse').addEventListener('click', async () => {
    if (!currentHouseId) return;
    if (currentFormProps['調査員']) {
      await SurveyDB.setMeta('surveyorName', currentFormProps['調査員']);
    }
    await SurveyDB.updateHouse(currentHouseId, currentFormProps);
    await loadAndRenderHouses(false);
    closeSurveyDrawer();
  });

  document.getElementById('btnCloseDrawer').addEventListener('click', closeSurveyDrawer);
  document.getElementById('btnCancelDrawer').addEventListener('click', closeSurveyDrawer);

  // GPS Current Location
  document.getElementById('btnGps').addEventListener('click', () => {
    const btn = document.getElementById('btnGps');
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      btn.classList.remove('active');
      return;
    }
    if (!navigator.geolocation) {
      alert('この端末ではGPSが利用できません');
      return;
    }
    btn.classList.add('active');
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lngLat = [pos.coords.longitude, pos.coords.latitude];
        if (!userLocationMarker) {
          const el = document.createElement('div');
          el.style.cssText = 'width:18px;height:18px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 8px rgba(37,99,235,0.8);';
          userLocationMarker = new maplibregl.Marker({ element: el }).setLngLat(lngLat).addTo(map);
          map.flyTo({ center: lngLat, zoom: 18 });
        } else {
          userLocationMarker.setLngLat(lngLat);
        }
      },
      (err) => {
        alert('位置情報の取得に失敗しました: ' + err.message);
        btn.classList.remove('active');
        watchId = null;
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  });

  // Data Management Modal (Import GeoJSON / PMTiles, Export ZIP)
  const dataModal = document.getElementById('dataModal');
  document.getElementById('btnOpenDataModal').addEventListener('click', async () => {
    const surveyor = await SurveyDB.getMeta('surveyorName');
    if (surveyor) document.getElementById('defaultSurveyorInput').value = surveyor;
    dataModal.classList.add('open');
  });
  document.getElementById('btnCloseDataModal').addEventListener('click', () => {
    dataModal.classList.remove('open');
  });

  document.getElementById('defaultSurveyorInput').addEventListener('change', async (e) => {
    await SurveyDB.setMeta('surveyorName', e.target.value.trim());
  });

  // Import GeoJSON
  document.getElementById('geojsonFileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (!json.features || !Array.isArray(json.features)) {
        throw new Error('有効なGeoJSON（FeatureCollection）ではありません');
      }
      json.name = file.name.replace(/\.[^/.]+$/, '');
      await SurveyDB.saveGeoJSON(json);
      await loadAndRenderHouses(true);
      alert(`${json.features.length}棟の家屋データを読み込みました。`);
      dataModal.classList.remove('open');
    } catch (err) {
      alert('GeoJSON読込エラー: ' + err.message);
    }
    e.target.value = '';
  });

  // Import Offline PMTiles
  document.getElementById('pmtilesFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (pmtilesObjectUrl) URL.revokeObjectURL(pmtilesObjectUrl);
    pmtilesObjectUrl = URL.createObjectURL(file);
    map.setStyle(createMapStyle(pmtilesObjectUrl));
    map.once('styledata', () => {
      addHouseLayers();
      loadAndRenderHouses(false);
    });
    alert(`オフライン地図「${file.name}」を背景図にセットしました。`);
    dataModal.classList.remove('open');
  });

  // Export ZIP (GeoJSON + CSV + photos/)
  document.getElementById('btnExportZip').addEventListener('click', async () => {
    const btn = document.getElementById('btnExportZip');
    btn.disabled = true;
    btn.textContent = 'ZIP作成中...しばらくお待ちください';
    try {
      const houses = await SurveyDB.getAllHouses();
      const photos = await SurveyDB.getAllPhotos();
      const areaName = (await SurveyDB.getMeta('geojsonName')) || 'koriyama_survey';
      const zip = new JSZip();

      // 1. GeoJSON
      const outGeoJSON = {
        type: 'FeatureCollection',
        name: areaName,
        features: houses.map((h) => ({
          type: 'Feature',
          geometry: h.geometry,
          properties: h.properties
        }))
      };
      zip.file(`${areaName}_result.geojson`, JSON.stringify(outGeoJSON, null, 2));

      // 2. CSV (UTF-8 with BOM for Excel)
      const cols = SCHEMA.fields.map((f) => f.col);
      const csvRows = [cols.join(',')];
      houses.forEach((h) => {
        const row = cols.map((c) => {
          const v = h.properties[c] !== undefined && h.properties[c] !== null ? String(h.properties[c]) : '';
          return `"${v.replace(/"/g, '""')}"`;
        });
        csvRows.push(row.join(','));
      });
      zip.file(`${areaName}_result.csv`, '﻿' + csvRows.join('
'));

      // 3. Photos folder (linked by 家屋ID_連番.jpg)
      const photoFolder = zip.folder('photos');
      photos.forEach((p) => {
        photoFolder.file(p.fileName, p.blob);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = `${areaName}_${dateStr}.zip`;
      a.click();
    } catch (err) {
      alert('出力エラー: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = '調査結果と写真をZIPで一括出力';
    }
  });

  // Reset Sample Data
  document.getElementById('btnResetSample').addEventListener('click', async () => {
    if (!confirm('端末内の調査データと写真をすべて消去し、サンプルデータに戻しますか？')) return;
    await SurveyDB.clearAll();
    await loadAndRenderHouses(true);
    dataModal.classList.remove('open');
  });

  renderLegend();
  initMap();
})();
