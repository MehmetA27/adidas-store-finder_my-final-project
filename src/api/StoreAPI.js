import storeData from "../data/storeData.json";

const getStores = async () => {
  return Promise.resolve(storeData.stores);
};

const getStoreById = async (id) => {
  const store = storeData.stores.find((store) => store.id === id);
  return Promise.resolve(store); 
};

export { getStores, getStoreById };
