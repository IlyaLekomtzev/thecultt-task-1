import { IRoute, LatLon } from "@/types/routes";

export interface IPolylineRequestData {
    routeId: number;
    from: LatLon;
    to: LatLon;
}

export interface IRoutesState {
    routes: IRoute[];
    selectedRouteId: number;
    isLoading: boolean;
    error: string | null;
}

export const ROUTES_NAME = "routes";
