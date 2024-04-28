import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLon } from "@/types/routes";

interface Props {
    bounds?: LatLon[];
}

export const SetBounds: FC<Props> = ({ bounds }) => {
    const map = useMap();

    useEffect(() => {
        if (bounds && bounds.length > 0) {
            map.fitBounds(bounds);
        }
    }, [map, bounds]);

    return null;
};
