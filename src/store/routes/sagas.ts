import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { routesApi } from "@/services/routes";
import { LatLon } from "@/types/routes";
import {
    getPolylineSuccessAction,
    getPolylineErrorAction,
    getPolylineAction,
} from "./slice";
import { IPolylineRequestData } from "./types";

function* getPolylineSaga({ payload }: PayloadAction<IPolylineRequestData>) {
    const { routeId, from, to } = payload;

    try {
        const polyline: LatLon[] = yield routesApi.getPolyline([from, to]);
        yield put(getPolylineSuccessAction({ routeId, polyline }));
    } catch (error) {
        yield put(getPolylineErrorAction(JSON.stringify(error)));
    }
}

export function* watchGetPolyline() {
    yield takeLatest(getPolylineAction.type, getPolylineSaga);
}
