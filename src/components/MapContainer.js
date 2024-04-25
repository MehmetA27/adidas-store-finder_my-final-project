import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import storeData from "../data/storeData.json";
import "dotenv/config";

const mapContainerStyle = {
  width: "800px",
  height: "800px",
};
const center = {
  lat: 49.450886, // Haritanın başlangıç merkezi olarak belirlediğiniz koordinatlar
  lng: 11.074092,
};

function MapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {storeData.stores.map(
        (
          store // JSON dosyasındaki mağazaların harita üzerine işaretçileri
        ) => (
          <Marker
            key={store.id}
            position={{
              lat: store.location.latitude,
              lng: store.location.longitude,
            }}
          />
        )
      )}
    </GoogleMap>
  );
}

export default MapContainer;
