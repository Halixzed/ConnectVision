import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiaGFycmkxMjEiLCJhIjoiY21pMjVqODcxMGEwcDJqcXZsN3F6Yzh6aSJ9.l1scP5F9xLLA0d9ZqbaMVA";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create the map instance
    mapInstance.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-0.1276, 51.5074], // London (change later)
      zoom: 10,
    });

    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
