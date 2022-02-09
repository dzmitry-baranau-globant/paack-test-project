import React, { useEffect } from "react";
import DeliveryItemsList from "../DeliveryItemsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryItem from "../DeliveryItem";

function App() {
  useEffect(() => {
    (async () => {
      const res = await navigator.permissions.query({ name: "geolocation" });
    })();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DeliveryItemsList />} />
        <Route path=":deliveryId" element={<DeliveryItem />} />
      </Routes>
    </div>
  );
}

export default App;
