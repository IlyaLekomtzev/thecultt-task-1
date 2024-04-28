import { all, fork } from "redux-saga/effects";
import usersReducer from "./routes/slice";
import { watchGetPolyline } from "./routes/sagas";

export const rootReducers = {
    routes: usersReducer,
};

export const rootSagas = function* () {
    yield all([fork(watchGetPolyline)]);
};
