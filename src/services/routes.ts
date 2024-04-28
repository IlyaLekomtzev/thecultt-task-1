import axios from "axios";
import { decode as decodePolyline } from "@mapbox/polyline";
import { ROUTES_API_URL } from "@/constants/api";
import { LatLon } from "@/types/routes";

const getPolyline = async (markers: LatLon[]) => {
    const coordinates = markers.map(([from, to]) => `${to},${from}`).join(";");

    try {
        const { data } = await axios.get(
            `${ROUTES_API_URL}/route/v1/driving/${coordinates}`
        );

        if (data.code !== "Ok" || !data.routes[0].geometry) {
            throw new Error();
        }

        const encodedPolyline = data.routes[0].geometry;

        if (!encodedPolyline) {
            throw new Error();
        }

        const decodedPolyline = decodePolyline(encodedPolyline);

        return decodedPolyline as LatLon[];
    } catch (error) {
        console.error("Error fetching route data:", error);
        return [];
    }
};

export const routesApi = { getPolyline };
