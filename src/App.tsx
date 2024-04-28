import { Spin } from "antd";
import { useEffect } from "react";
import { Map } from "@/components/Map";
import { RoutesTable } from "@/components/RoutesTable";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getPolylineAction } from "@/store/routes/slice";
import { selectRoutesState } from "@/store/routes/selectors";

export const App = () => {
    const dispatch = useAppDispatch();
    const { routes, selectedRouteId, isLoading } =
        useAppSelector(selectRoutesState);

    const selectedRoute =
        routes.find((route) => route.id === selectedRouteId) ?? null;

    useEffect(() => {
        if (selectedRoute && !selectedRoute.polyline) {
            dispatch(
                getPolylineAction({
                    routeId: selectedRoute.id,
                    from: selectedRoute.from,
                    to: selectedRoute.to,
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoute]);

    return (
        <>
            <div className="wrapper">
                <div className="half half-table">
                    <RoutesTable />
                </div>
                <div className="half half-map">
                    <Map selectedRoute={selectedRoute} />
                </div>
            </div>
            <Spin spinning={isLoading} fullscreen />
        </>
    );
};
