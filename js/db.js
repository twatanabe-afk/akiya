const db = new Dexie('KoriyamaAkiyaSlimDB_v120');
db.version(1).stores({
  houses: 'id, status, updatedAt',
  photos: '++pk, houseId, fileName, createdAt',
  meta: 'key'
});

function mercatorToWgs84(x, y) {
  const lon = (x / 20037508.34) * 180.0;
  let lat = (y / 20037508.34) * 180.0;
  lat = (180.0 / Math.PI) * (2.0 * Math.atan(Math.exp((lat * Math.PI) / 180.0)) - Math.PI / 2.0);
  return [Number(lon.toFixed(6)), Number(lat.toFixed(6))];
}

function normalizeCoords(coords) {
  if (!Array.isArray(coords) || coords.length === 0) return coords;
  if (typeof coords[0] === 'number') {
    if (Math.abs(coords[0]) > 180 || Math.abs(coords[1]) > 90) {
      return mercatorToWgs84(coords[0], coords[1]);
    }
    return coords;
  }
  return coords.map(normalizeCoords);
}

window.SurveyDB = {
  async saveGeoJSON(geojson) {
    await db.transaction('rw', db.houses, db.meta, async () => {
      await db.houses.clear();
      const records = geojson.features.map((feat, i) => {
        const props = { ...(feat.properties || {}) };
        const id = String(props['調査id'] || `HOUSE-${String(i + 1).padStart(5, '0')}`);
        props['調査id'] = id;
        if (!props['空家判定'] || !['3', '4', '5', '6'].includes(String(props['空家判定']))) {
          props['空家判定'] = '6';
        }
        const geom = feat.geometry ? {
          type: feat.geometry.type,
          coordinates: normalizeCoords(feat.geometry.coordinates)
        } : null;

        return {
          id,
          status: String(props['空家判定']),
          geometry: geom,
          properties: props,
          updatedAt: null
        };
      });
      await db.houses.bulkPut(records);
      await db.meta.put({ key: 'geojsonName', value: geojson.name || 'R8_koriyama' });
    });
  },

  async getAllHouses() {
    return await db.houses.toArray();
  },

  async getHouse(id) {
    return await db.houses.get(id);
  },

  async updateHouse(id, properties) {
    const house = await db.houses.get(id);
    if (!house) return;
    house.properties = properties;
    house.status = String(properties['空家判定'] || '6');
    house.updatedAt = new Date().toISOString();
    await db.houses.put(house);
    return house;
  },

  async addPhoto(houseId, blob, fileName) {
    return await db.photos.add({
      houseId,
      blob,
      fileName,
      createdAt: new Date().toISOString()
    });
  },

  async getPhotosByHouse(houseId) {
    return await db.photos.where('houseId').equals(houseId).toArray();
  },

  async getAllPhotos() {
    return await db.photos.toArray();
  },

  async deletePhoto(pk) {
    await db.photos.delete(pk);
  },

  async getMeta(key) {
    const row = await db.meta.get(key);
    return row ? row.value : null;
  },

  async setMeta(key, value) {
    await db.meta.put({ key, value });
  },

  async clearAll() {
    await db.houses.clear();
    await db.photos.clear();
  }
};
