import React from "react";
import MapContainer from "../components/MapContainer";
import Header from "../components/Header";

function App() {
  return (
    <div className="App">
      <Header /> // bu render eder ve yukarida import u otomatik yapar
      <MapContainer />
    </div>
  );
}

export default App;