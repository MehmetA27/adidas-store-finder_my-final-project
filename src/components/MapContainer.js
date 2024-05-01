import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import storeData from "../data/storeData.json";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const defaultCenter = {
  lat: 49.450886, // Default center of the map
  lng: 11.074092,
};

function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function filterStores(center, maxDistance = 10) {
  // Max distance in kilometers
  return storeData.stores.filter((store) => {
    const dist = distance(
      center.lat,
      center.lng,
      store.location.latitude,
      store.location.longitude
    );
    return dist <= maxDistance;
  });
}

function MapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAFyZSO9Qdf3Ri7NutgWLJoM-C2VLTDu5w", // API keyinizi buraya ekleyin
    libraries: ["places"], // Otomatik tamamlama için gerekli kütüphane
  });

  const [selectedStore, setSelectedStore] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const autocompleteRef = useRef(null);

  const handleLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleMarkerClick = useCallback((store) => {
    setSelectedStore(store);
  }, []);

  const nearbyStores = filterStores(center);

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;

  return (
    <div>
      <Autocomplete
        onLoad={handleLoadAutocomplete}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          style={{
            width: "50%",
            padding: "24px 20px",
            fontSize: "20px",
            border: "2px solid #ccc",
            borderRadius: "25px",
            boxSizing: "border-box",
            margin: "30px auto",
            display: "block",
          }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onClick={() => setSelectedStore(null)}
      >
        {nearbyStores.map((store) => (
          <Marker
            key={store.id}
            position={{
              lat: store.location.latitude,
              lng: store.location.longitude,
            }}
            onClick={() => handleMarkerClick(store)}
          >
            {selectedStore && selectedStore.id === store.id && (
              <InfoWindow onCloseClick={() => setSelectedStore(null)}>
                <div>
                  <h2>{store.name}</h2>
                  <p>
                    {store.location.street}, {store.location.city}
                  </p>
                  <p>Phone: {store.contact.phoneNumber}</p>
                  <div>Opening Hours:</div>
                  {store.openingHours.map((hour, index) => (
                    <div key={index}>
                      {hour.day}: {hour.start} - {hour.end}
                    </div>
                  ))}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapContainer;
