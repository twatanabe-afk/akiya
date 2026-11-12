const db = new Dexie('KoriyamaAkiyaSurveyDB');
db.version(1).stores({
  houses: 'id, status, updatedAt',
  photos: '++pk, houseId, fileName, createdAt',
  meta: 'key'
});

window.SurveyDB = {
  async saveGeoJSON(geojson) {
    await db.transaction('rw', db.houses, db.meta, async () => {
      await db.houses.clear();
      const records = geojson.features.map((feat, i) => {
        const props = feat.properties || {};
        const id = String(props['調査id'] || `HOUSE-${String(i + 1).padStart(5, '0')}`);
        props['調査id'] = id;
        if (!props['空家判定'] || props['空家判定'] === '-1') {
          props['空家判定'] = '6'; // 6: 未判定
        }
        return {
          id,
          status: String(props['空家判定']),
          geometry: feat.geometry,
          properties: props,
          updatedAt: null
        };
      });
      await db.houses.bulkPut(records);
      await db.meta.put({ key: 'geojsonName', value: geojson.name || 'survey_area' });
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
