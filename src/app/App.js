import React from "react";
import StoreList from "../components/StoreList";
import MapContainer from "../components/MapContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Adidas Store Finder</h1>
      </header>
      <StoreList />
      <MapContainer />
    </div>
  );
}

export default App;
