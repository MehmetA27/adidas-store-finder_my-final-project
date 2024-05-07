import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import "../styles/InfoWindowStyles.css";
import { fetchStores } from "../api/StoreAPI"; // fetchStores fonksiyonunu import ediyoruz

const mapContainerStyle = {
  width: "99vw",
  height: "70vh",
};

const defaultCenter = {
  lat: 49.450886,
  lng: 11.074092,
};

function formatHours(hours, minutes) {
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function OpeningHours({ hours }) {
  return (
    <>
      <div className="info-content">Opening Hours:</div>
      {Object.entries(hours).map(([day, times]) => (
        <div key={day} className="info-content">
          {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
          {formatHours(times.startHours, times.startMinutes)} -{" "}
          {formatHours(times.endHours, times.endMinutes)}
        </div>
      ))}
    </>
  );
}

function MapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAFyZSO9Qdf3Ri7NutgWLJoM-C2VLTDu5w",
    libraries: ["places"],
  });

  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [center, setCenter] = useState(defaultCenter);
  const [error, setError] = useState("");
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (center.lat && center.lng) {
      fetchStores(center.lat, center.lng)
        .then(setStores)
        .catch((e) => {
          console.error("Error fetching stores:", e);
          setStores([]);
        });
    }
  }, [center]);

  const handleLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setError("");
    } else {
      setError("You entered invalid location.");
    }
  };

  const handleMarkerClick = useCallback((store) => {
    setSelectedStore(store);
  }, []);

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
      {error && (
        <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </div>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onClick={() => setSelectedStore(null)}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={{
              lat: store.latitude,
              lng: store.longitude,
            }}
            onClick={() => handleMarkerClick(store)}
          >
            {selectedStore && selectedStore.id === store.id && (
              <InfoWindow onCloseClick={() => setSelectedStore(null)}>
                <div className="info-window">
                  <h2 className="info-title">{selectedStore.name}</h2>
                  <p className="info-content">
                    {selectedStore.street}, {selectedStore.city}
                  </p>
                  <p className="info-content">
                    Phone: {selectedStore.phoneNumber}
                  </p>
                  <OpeningHours hours={selectedStore.openingHours} />
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