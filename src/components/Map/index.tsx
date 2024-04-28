import { FC } from "react";
import Leaflet from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { IRoute } from "@/types/routes";
import marker from "@/assets/map-pin.svg";
import { SetBounds } from "./SetBounds";
import "leaflet/dist/leaflet.css";

const CUSTOM_MARKER = new Leaflet.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [32, 32],
});

interface Props {
    selectedRoute: IRoute | null;
}

export const Map: FC<Props> = ({ selectedRoute }) => (
    <MapContainer className="map" center={[55.751244, 37.618423]} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SetBounds
            bounds={
                selectedRoute?.polyline ? selectedRoute.polyline : undefined
            }
        />
        {selectedRoute?.polyline && selectedRoute.polyline.length > 0 && (
            <Polyline positions={selectedRoute.polyline} color="green" />
        )}
        {selectedRoute && (
            <>
                <Marker icon={CUSTOM_MARKER} position={selectedRoute.from} />
                <Marker icon={CUSTOM_MARKER} position={selectedRoute.to} />
            </>
        )}
    </MapContainer>
);
