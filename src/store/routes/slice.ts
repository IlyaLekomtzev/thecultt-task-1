import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LatLon } from "@/types/routes";
import { ROUTES } from "@/constants/routes";
import { ROUTES_NAME, IRoutesState, IPolylineRequestData } from "./types";

const ROUTES_INITIAL_STATE: IRoutesState = {
    routes: ROUTES,
    selectedRouteId: -1,
    isLoading: false,
    error: null,
};

export const routesSlice = createSlice({
    name: ROUTES_NAME,
    initialState: ROUTES_INITIAL_STATE,
    reducers: {
        setSelectedRouteId: (state, { payload }: PayloadAction<number>) => {
            state.selectedRouteId = payload;
        },
        setFromPoints: (
            state,
            { payload }: PayloadAction<{ routeId: number; points: LatLon }>
        ) => {
            state.routes = state.routes.map((route) => {
                if (route.id === payload.routeId) {
                    return {
                        ...route,
                        from: payload.points,
                        polyline: null,
                    };
                }

                return route;
            });
        },
        setToPoints: (
            state,
            { payload }: PayloadAction<{ routeId: number; points: LatLon }>
        ) => {
            state.routes = state.routes.map((route) => {
                if (route.id === payload.routeId) {
                    return {
                        ...route,
                        to: payload.points,
                        polyline: null,
                    };
                }

                return route;
            });
        },
        getPolylineAction: (
            state,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _: PayloadAction<IPolylineRequestData>
        ) => {
            state.isLoading = true;
            state.error = null;
        },
        getPolylineSuccessAction: (
            state,
            {
                payload,
            }: PayloadAction<{
                routeId: number;
                polyline: LatLon[];
            }>
        ) => {
            state.routes = state.routes.map((route) => {
                if (route.id === payload.routeId) {
                    return {
                        ...route,
                        polyline: payload.polyline,
                    };
                }

                return route;
            });
            state.isLoading = false;
        },
        getPolylineErrorAction: (
            state,
            { payload: error }: PayloadAction<string>
        ) => {
            state.isLoading = false;
            state.error = error;
        },
    },
});

export const {
    setSelectedRouteId,
    setFromPoints,
    setToPoints,
    getPolylineAction,
    getPolylineSuccessAction,
    getPolylineErrorAction,
} = routesSlice.actions;

export default routesSlice.reducer;
