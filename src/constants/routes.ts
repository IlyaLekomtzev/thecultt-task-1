import { ICoord, IRoute } from "@/types/routes";

export const FROM_COORDS: ICoord[] = [
    {
        id: 1,
        coords: [55.72188, 37.62388],
    },
    {
        id: 2,
        coords: [55.73197, 37.63341],
    },
    {
        id: 3,
        coords: [55.69878, 37.52329],
    },
    {
        id: 4,
        coords: [55.66623, 37.54569],
    },
];

export const TO_COORDS: ICoord[] = [
    {
        id: 1,
        coords: [55.75942, 37.55687],
    },
    {
        id: 2,
        coords: [55.74695, 37.64459],
    },
    {
        id: 3,
        coords: [55.67444, 37.76291],
    },
    {
        id: 4,
        coords: [55.79901, 37.45445],
    },
];

export const ROUTES: IRoute[] = [
    {
        id: 1,
        from: FROM_COORDS[0].coords,
        to: TO_COORDS[0].coords,
        polyline: null,
    },
    {
        id: 2,
        from: FROM_COORDS[1].coords,
        to: TO_COORDS[1].coords,
        polyline: null,
    },
    {
        id: 3,
        from: FROM_COORDS[2].coords,
        to: TO_COORDS[2].coords,
        polyline: null,
    },
    {
        id: 4,
        from: FROM_COORDS[3].coords,
        to: TO_COORDS[3].coords,
        polyline: null,
    },
];
