import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const NAVY = "#01263D";
const ORANGE = "#FF4C1D";

const OFFICE = { name: "Dallol Consult", coords: [9.0056, 38.7891] };

const Map = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomSnap: 0.5,
    });
    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);


    const marker = L.marker(OFFICE.coords, {
      icon: L.divIcon({
        className: "",
        iconSize: [0, 0],
        html: `<div style="display:flex;align-items:center;gap:8px;transform:translate(-8px,-50%);white-space:nowrap;cursor:pointer;">
          <span style="display:block;flex:none;width:16px;height:16px;border-radius:9999px;background:${ORANGE};border:3px solid #fff;box-shadow:0 0 0 1px ${NAVY};"></span>
          <span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${NAVY};background:#fff;padding:2px 8px;">${OFFICE.name}</span>
        </div>`,
      }),
    }).addTo(map);

    marker.bindPopup(
      `<div style="font-family:Montserrat,sans-serif;color:${NAVY};">
        <strong style="text-transform:uppercase;letter-spacing:0.08em;">Dallol Consult</strong><br/>
        Addis Ababa, Ethiopia<br/>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${OFFICE.coords.join(",")}"
          target="_blank" rel="noopener noreferrer"
          style="display:inline-block;margin-top:8px;color:${ORANGE};font-weight:700;">Get directions &rarr;</a>
      </div>`,
      { offset: [0, -6] }
    );

    map.setView(OFFICE.coords, 14);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[260px] sm:h-[300px] lg:h-[340px] w-full z-0"
    />
  );
};

export default Map;
