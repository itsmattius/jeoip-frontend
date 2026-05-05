import Props from "@/types/Props";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, useMap, ImageOverlay } from "react-leaflet";
import styles from "@/styles/Map.module.scss";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import { getDirection } from "@/lang/locale";

export interface MapProps {
  lat: number;
  lng: number;
  fixed?: boolean;
}

const markerIcon = L.icon({ iconUrl: "/marker.png" });

const OFFSET = 0.03;
const NESHAN_STATIC_URL = "https://api.neshan.org/v4/static";

const calculateCenter = (lat: number, lng: number): [number, number] => {
  const direction = getDirection();
  return [
    lat - OFFSET,
    direction === "rtl" ? lng + OFFSET * 2 : lng - OFFSET * 2,
  ];
};

const RecenterAutomatically: React.FC<{ center: [number, number] }> = ({
  center,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true, duration: 10 });
  }, [center[0], center[1]]);
  return null;
};

const Map: React.FC<MapProps & Props> = (props) => {
  const { lat, lng, fixed } = props;
  const hasLocation = lat !== -200 && lng !== -200;

  const center = useMemo<[number, number]>(
    () => (fixed ? calculateCenter(lat, lng) : [lat, lng]),
    [lat, lng, fixed]
  );

  const markerPosition = useMemo<[number, number]>(() => [lat, lng], [lat, lng]);

  const bounds = useMemo<[[number, number], [number, number]]>(
    () => [
      [lat - OFFSET, lng - OFFSET],
      [lat + OFFSET, lng + OFFSET],
    ],
    [lat, lng]
  );

  const imageUrl = useMemo(() => {
    const params = new URLSearchParams({
      key: process.env.NEXT_PUBLIC_NESHAN_API_KEY ?? "",
      type: "dreamy",
      zoom: "12",
      width: "620",
      height: "400",
      center: `${lat},${lng}`,
    });
    return `${NESHAN_STATIC_URL}?${params.toString()}`;
  }, [lat, lng]);

  if (!hasLocation) return null;

  return (
    <MapContainer
      className={`${props.className} ${fixed ? styles["map-fixed"] : styles.map}`}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
    >
      <ImageOverlay url={imageUrl} bounds={bounds} />
      <Marker icon={markerIcon} position={markerPosition} />
      <RecenterAutomatically center={center} />
    </MapContainer>
  );
};

export default Map;
