import storeData from "../data/storeData.json";

const getStores = async () => {
  return Promise.resolve(storeData.stores);
};

/**
 * Belirli bir ID'ye sahip mağazayı almak için bir fonksiyon.
 * @param {string} id - Aranan mağazanın ID'si.
 * @returns {Promise<Object>} Belirtilen ID'ye sahip mağaza.
 */
const getStoreById = async (id) => {
  const store = storeData.stores.find((store) => store.id === id);
  return Promise.resolve(store); // Statik veri dönüşü
};

export { getStores, getStoreById };
