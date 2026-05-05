import Props from "@/types/Props";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import styles from "@/styles/Map.module.scss";
import L from "leaflet";
import { useEffect } from "react";
import { getDirection } from "@/lang/locale";

export interface MapProps {
  lat: number;
  lng: number;
  fixed?: boolean;
}

const markerIcon = L.icon({ iconUrl: "/marker.png" });

const calculateCenter = (geo: [number, number]) => {
  const direction = getDirection();
  const lat = geo[0];
  const lng = geo[1];
  const center: [number, number] = [0, 0];
  const offset = 0.03;
  center[0] = lat - offset;
  center[1] = direction === "rtl" ? lng + offset * 2 : lng - offset * 2;
  return center;
};

const RecenterAutomatically: React.FC<
  {
    center: [number, number];
  } & Props
> = (props) => {
  const map = useMap();
  useEffect(() => {
    map.setView(props.center, map.getZoom(), {
      animate: true,
      duration: 10,
    });
  }, props.center);
  return <></>;
};

const Map: React.FC<MapProps & Props> = (props) => {
  
  const center: [number, number] = props.fixed ? calculateCenter([props.lat, props.lng]) : [props.lat, props.lng];
  const markerPosition: [number, number] = [props.lat, props.lng];

  return (
    <MapContainer
      className={`${props.className} ${
        props.fixed ? styles["map-fixed"] : styles.map
      }`}
      key={new Date().getTime()}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {(props.lat != -200 && props.lng != -200) && (
        <Marker icon={markerIcon} position={markerPosition} />
      )}
      <RecenterAutomatically center={center} />
    </MapContainer>
  );
};

export default Map;
