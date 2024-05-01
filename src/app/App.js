import React from "react";
import MapContainer from "../components/MapContainer";
import Header from "../components/Header";

function App() {
  const [selectedStore, setSelectedStore] = React.useState(null);

  return (
    <div className="App">
      <Header />
      <MapContainer onSelectStore={setSelectedStore} />
      {selectedStore && <StoreDetails storeId={selectedStore} />}
    </div>
  );
}

export default App;
