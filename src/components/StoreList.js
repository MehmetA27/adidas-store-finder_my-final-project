import React, { useEffect, useState } from "react";
import { getStores } from "../api/StoreAPI";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const storesData = await getStores();
      setStores(storesData);
    };

    fetchStores();
  }, []);

  return (
    <div>
      <h1>Mağazalar Listesi</h1>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} - {store.location.city} - {store.location.street}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
