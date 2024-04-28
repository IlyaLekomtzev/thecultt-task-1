export type LatLon = [number, number];

export interface IRoute {
    id: number;
    from: LatLon;
    to: LatLon;
    polyline: LatLon[] | null;
}

export interface ICoord {
    id: number;
    coords: LatLon;
}
