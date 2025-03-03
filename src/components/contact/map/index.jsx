import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import InfoWindow from "./info-window";

const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        scrollWheelZoom: false, // Disable scroll wheel zoom
      }).setView([9.005575912620671, 38.789145827947856], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  const customIcon = L.icon({
    iconUrl: "/Pin.svg",
    iconSize: [60, 60],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    const marker = L.marker([9.005575912620671, 38.789145827947856], {
      icon: customIcon,
    }).addTo(mapRef.current);

    const pharmacy = {
      name: "Logihub",
      distanceInKm: 1.23,
      latitude: 9.011357127660336,
      longitude: 38.76136003644539,
    };

    const popupContainer = document.createElement("div");
    const root = ReactDOM.createRoot(popupContainer);
    root.render(<InfoWindow pharmacy={pharmacy} />);
    marker.bindPopup(popupContainer);
  }, []);

  return (
    <div
      id="map"
      style={{ height: "500px", width: "100%", position: "relative" }}
    />
  );
};

export default Map;
