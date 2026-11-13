(function () {
  const APP_VERSION = 'v1.2.0';
  const BUILD_DATE = '2026-11-13';
  const statsEl = document.getElementById('statsText');

  // Set version labels
  document.querySelectorAll('.js-app-ver').forEach((el) => {
    el.textContent = APP_VERSION;
  });
  const modalVerEl = document.getElementById('modalAppVersion');
  if (modalVerEl) {
    modalVerEl.textContent = `アプリバージョン: ${APP_VERSION} (ビルド: ${BUILD_DATE})`;
  }

  function showError(msg) {
    if (statsEl) {
      statsEl.innerHTML = `<span style="color:#dc2626;font-weight:700;">エラー: ${msg}</span>`;
    }
    console.error(msg);
  }

  if (typeof L === 'undefined') {
    showError('地図ライブラリ(Leaflet)の読込に失敗しました。通信環境を確認してください。');
    return;
  }
  if (typeof Dexie === 'undefined') {
    showError('データベース(Dexie)の読込に失敗しました。');
    return;
  }

  // Legend definitions (3:空き家, 4:空き家ではない, 5:判断できない, 6:未判定)
  const STATUS_DEFS = {
    '3': { label: '空き家', color: '#004cff', fillOpacity: 0.65 },
    '4': { label: '空き家ではない', color: '#84cc16', fillOpacity: 0.65 },
    '5': { label: '判断できない', color: '#fb24ff', fillOpacity: 0.65 },
    '6': { label: '未判定', color: '#ff4000', fillOpacity: 0.55 }
  };

  let map = null;
  let houseLayerGroup = null;
  let currentHouseId = null;
  let currentProps = {};
  let userMarker = null;
  let watchId = null;

  // Register Service Worker
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  }

  // Network badge
  function updateNetBadge() {
    const el = document.getElementById('netStatus');
    if (!el) return;
    if (navigator.onLine) {
      el.textContent = 'オンライン';
      el.className = 'badge-status badge-online';
    } else {
      el.textContent = 'オフライン動作中';
      el.className = 'badge-status badge-offline';
    }
  }
  window.addEventListener('online', updateNetBadge);
  window.addEventListener('offline', updateNetBadge);
  updateNetBadge();

  // Extract HH:MM from strings like "1900-01-01 14:10:00.0" or "14:10"
  function formatTimeInput(raw) {
    if (!raw) return '';
    const s = String(raw).trim();
    const m = s.match(/(\d{2}:\d{2})/);
    return m ? m[1] : '';
  }

  // Image auto-resize (max 1600px, JPEG 0.8)
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
          (blob) => (blob ? resolve(blob) : reject(new Error('画像変換に失敗しました'))),
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  // Initialize Leaflet Map with Canvas renderer (smooth for 6,000+ polygons)
  function initMap() {
    map = L.map('map', {
      center: [37.38, 140.38],
      zoom: 13,
      maxZoom: 20,
      preferCanvas: true,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',
      maxZoom: 20,
      maxNativeZoom: 18
    }).addTo(map);

    houseLayerGroup = L.layerGroup().addTo(map);

    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 200);
  }

  // Render Legend
  function renderLegend() {
    const wrap = document.getElementById('legendWrap');
    wrap.innerHTML = '';
    ['3', '4', '5', '6'].forEach((code) => {
      const def = STATUS_DEFS[code];
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `<span class="legend-dot" style="background:${def.color}"></span><span>${def.label}</span>`;
      wrap.appendChild(item);
    });
  }

  // Fetch default R8 GeoJSON
  async function fetchDefaultGeoJSON() {
    statsEl.textContent = '初期家屋データ(R8)を読み込み中...';
    const res = await fetch('./data/default_r8.geojson');
    if (!res.ok) {
      throw new Error(`初期データの取得に失敗しました (HTTP ${res.status})`);
    }
    return await res.json();
  }

  // Load & Render Houses on Map
  async function loadAndRenderHouses(fitBounds = false) {
    try {
      let houses = await SurveyDB.getAllHouses();
      if (houses.length === 0) {
        const defaultData = await fetchDefaultGeoJSON();
        await SurveyDB.saveGeoJSON(defaultData);
        houses = await SurveyDB.getAllHouses();
        fitBounds = true;
      }

      houseLayerGroup.clearLayers();

      const fc = {
        type: 'FeatureCollection',
        features: houses.map((h) => ({
          type: 'Feature',
          geometry: h.geometry,
          properties: {
            '調査id': h.id,
            '空家判定': h.status
          }
        }))
      };

      const geoLayer = L.geoJSON(fc, {
        style: (feature) => {
          const code = String((feature.properties && feature.properties['空家判定']) || '6');
          const def = STATUS_DEFS[code] || STATUS_DEFS['6'];
          return {
            color: '#1e293b',
            weight: 1.5,
            fillColor: def.color,
            fillOpacity: def.fillOpacity
          };
        },
        pointToLayer: (feature, latlng) => {
          const code = String((feature.properties && feature.properties['空家判定']) || '6');
          const def = STATUS_DEFS[code] || STATUS_DEFS['6'];
          return L.circleMarker(latlng, {
            radius: 7,
            color: '#1e293b',
            weight: 1.5,
            fillColor: def.color,
            fillOpacity: 0.85
          });
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            openSurveyDrawer(feature.properties['調査id']);
          });
        }
      });

      geoLayer.addTo(houseLayerGroup);

      // Update top-left counter
      const total = houses.length;
      const done = houses.filter((h) => h.status !== '6').length;
      const akiya = houses.filter((h) => h.status === '3').length;
      statsEl.innerHTML = `対象: <b>${total.toLocaleString()}</b>棟 / 判定済: <b>${done.toLocaleString()}</b>棟 (空き家: <b>${akiya.toLocaleString()}</b>棟)`;

      if (fitBounds && houses.length > 0) {
        const bounds = geoLayer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [30, 30], maxZoom: 16 });
        }
      }
    } catch (err) {
      showError('データ表示エラー: ' + err.message);
    }
  }

  // Open Survey Drawer for a House
  async function openSurveyDrawer(houseId) {
    const house = await SurveyDB.getHouse(houseId);
    if (!house) return;
    currentHouseId = houseId;
    currentProps = { ...house.properties };

    const savedSurveyor = await SurveyDB.getMeta('surveyorName');
    if (!currentProps['調査員'] && savedSurveyor) {
      currentProps['調査員'] = savedSurveyor;
    }
    const now = new Date();
    if (!currentProps['調査日付']) {
      currentProps['調査日付'] = now.toISOString().slice(0, 10);
    }
    const parsedTime = formatTimeInput(currentProps['調査時間']);
    currentProps['調査時間'] = parsedTime || now.toTimeString().slice(0, 5);

    document.getElementById('drawerTitle').textContent = `調査ID: ${houseId}`;
    document.getElementById('drawerSub').textContent =
      currentProps['所在地住所'] || currentProps['家屋_所在地'] || '所在地未登録';

    // Set input fields
    document.getElementById('inpDate').value = currentProps['調査日付'] || '';
    document.getElementById('inpTime').value = currentProps['調査時間'] || '';
    document.getElementById('inpSurveyor').value = currentProps['調査員'] || '';

    renderStatusSelector();
    await renderPhotoList();
    renderReferenceTable();

    document.getElementById('surveyDrawer').classList.add('open');
  }

  function closeSurveyDrawer() {
    document.getElementById('surveyDrawer').classList.remove('open');
    currentHouseId = null;
  }

  // Render 空家判定 4-button selector
  function renderStatusSelector() {
    const wrap = document.getElementById('statusSelector');
    wrap.innerHTML = '';
    const currentVal = String(currentProps['空家判定'] || '6');

    ['3', '4', '5', '6'].forEach((code) => {
      const def = STATUS_DEFS[code];
      const btn = document.createElement('div');
      btn.className = 'status-option' + (currentVal === code ? ' selected' : '');
      btn.innerHTML = `
        <span class="status-swatch" style="background:${def.color}"></span>
        <span>${def.label}</span>
      `;
      btn.onclick = () => {
        currentProps['空家判定'] = code;
        renderStatusSelector();
      };
      wrap.appendChild(btn);
    });
  }

  // Render Read-only Reference Properties
  function renderReferenceTable() {
    const tbody = document.getElementById('refTableBody');
    tbody.innerHTML = '';

    const editableKeys = new Set(['調査日付', '調査時間', '調査員', '空家判定']);
    const priorityKeys = [
      '調査id', '所在地住所', '大字区分', '住居表示',
      '家屋_所在地', '家屋_用途', '家屋_所有者氏名', '家屋_所有者住所',
      '所有者氏名・名称', '所有者住所',
      '水道使用有無', '建物用途',
      '水道閉栓_使用者氏名', '水道閉栓_住所', '水道閉栓_契約日', '水道閉栓_開栓日', '水道閉栓_閉栓日', '水道閉栓_上水用途名',
      '水道再契約_使用者氏名', '水道再契約_住所', '水道再契約_契約日', '水道再契約_開栓日', '水道再契約_上水用途名',
      '総合判定', '不良度評点', '不良度ランク', '影響_被害_危険性ランク', '管理状況判定結果', '備考',
      '画像ID'
    ];

    const allKeys = Object.keys(currentProps);
    const orderedKeys = [
      ...priorityKeys.filter((k) => allKeys.includes(k)),
      ...allKeys.filter((k) => !priorityKeys.includes(k) && !editableKeys.has(k))
    ];

    orderedKeys.forEach((key) => {
      const val = currentProps[key];
      const disp = val !== undefined && val !== null && String(val).trim() !== '' && String(val) !== '-1' ? String(val) : '—';
      const tr = document.createElement('tr');
      tr.innerHTML = `<th>${key}</th><td>${disp}</td>`;
      tbody.appendChild(tr);
    });
  }

  // Photo list & capture
  async function renderPhotoList() {
    if (!currentHouseId) return;
    const photos = await SurveyDB.getPhotosByHouse(currentHouseId);
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = '';

    const fileNames = photos.map((p) => p.fileName);
    currentProps['画像ID'] = fileNames.join(',');

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
          renderReferenceTable();
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
        alert('画像の保存に失敗しました: ' + err.message);
      }
    }
    e.target.value = '';
    await renderPhotoList();
    renderReferenceTable();
  });

  // Save House
  document.getElementById('btnSaveHouse').addEventListener('click', async () => {
    if (!currentHouseId) return;
    currentProps['調査日付'] = document.getElementById('inpDate').value;
    currentProps['調査時間'] = document.getElementById('inpTime').value;
    currentProps['調査員'] = document.getElementById('inpSurveyor').value.trim();

    if (currentProps['調査員']) {
      await SurveyDB.setMeta('surveyorName', currentProps['調査員']);
    }

    await SurveyDB.updateHouse(currentHouseId, currentProps);
    await loadAndRenderHouses(false);
    closeSurveyDrawer();
  });

  document.getElementById('btnCloseDrawer').addEventListener('click', closeSurveyDrawer);
  document.getElementById('btnCancelDrawer').addEventListener('click', closeSurveyDrawer);

  // GPS Tracking
  document.getElementById('btnGps').addEventListener('click', () => {
    const btn = document.getElementById('btnGps');
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      btn.classList.remove('active');
      if (userMarker) {
        map.removeLayer(userMarker);
        userMarker = null;
      }
      return;
    }
    if (!navigator.geolocation) {
      alert('この端末はGPSに対応していません');
      return;
    }
    btn.classList.add('active');
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        if (!userMarker) {
          userMarker = L.circleMarker(latlng, {
            radius: 9,
            color: '#ffffff',
            weight: 3,
            fillColor: '#2563eb',
            fillOpacity: 1
          }).addTo(map);
          map.setView(latlng, 18);
        } else {
          userMarker.setLatLng(latlng);
        }
      },
      (err) => {
        alert('現在地を取得できませんでした: ' + err.message);
        btn.classList.remove('active');
        watchId = null;
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  });

  // Data Management Modal
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
      statsEl.textContent = 'GeoJSONファイルを読み込み中...';
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

  // Export ZIP (GeoJSON + CSV + photos/)
  document.getElementById('btnExportZip').addEventListener('click', async () => {
    if (typeof JSZip === 'undefined') {
      alert('ZIPライブラリの読込に失敗しています');
      return;
    }
    const btn = document.getElementById('btnExportZip');
    btn.disabled = true;
    btn.textContent = 'ZIP作成中...しばらくお待ちください';
    try {
      const houses = await SurveyDB.getAllHouses();
      const photos = await SurveyDB.getAllPhotos();
      const areaName = (await SurveyDB.getMeta('geojsonName')) || 'R8_koriyama';
      const zip = new JSZip();

      const outGeoJSON = {
        type: 'FeatureCollection',
        name: areaName,
        features: houses.map((h) => ({
          type: 'Feature',
          geometry: h.geometry,
          properties: h.properties
        }))
      };
      zip.file(`${areaName}_result.geojson`, JSON.stringify(outGeoJSON));

      const colSet = new Set(['調査id', '空家判定', '調査日付', '調査時間', '調査員', '画像ID']);
      houses.forEach((h) => Object.keys(h.properties).forEach((k) => colSet.add(k)));
      const cols = Array.from(colSet);
      const csvRows = [cols.join(',')];
      houses.forEach((h) => {
        const row = cols.map((c) => {
          const v = h.properties[c] !== undefined && h.properties[c] !== null ? String(h.properties[c]) : '';
          return `"${v.replace(/"/g, '""')}"`;
        });
        csvRows.push(row.join(','));
      });
      zip.file(`${areaName}_result.csv`, '\uFEFF' + csvRows.join('\r\n'));

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

  // Reset Data back to default R8 GeoJSON
  document.getElementById('btnResetSample').addEventListener('click', async () => {
    if (!confirm('端末内の入力内容と写真をすべて消去し、初期データ（R8.geojson）に戻しますか？')) return;
    await SurveyDB.clearAll();
    await loadAndRenderHouses(true);
    dataModal.classList.remove('open');
  });

  // Boot
  renderLegend();
  initMap();
  loadAndRenderHouses(false);
})();
