import { Select, type TableProps } from "antd";
import { IRoute, LatLon } from "@/types/routes";
import { FROM_COORDS, TO_COORDS } from "@/constants/routes";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectRoutesState } from "@/store/routes/selectors";
import { setFromPoints, setToPoints } from "@/store/routes/slice";

const SEPARATOR_SYMBOL = ", ";

interface ITableRoute extends IRoute {
    key: number;
}

export const useRoutesTable = () => {
    const dispatch = useAppDispatch();
    const { routes } = useAppSelector(selectRoutesState);

    const handleFromSelect = (
        field: "from" | "to",
        routeId: number,
        value: string
    ) => {
        const points = value
            .split(SEPARATOR_SYMBOL)
            .map((point) => +point) as LatLon;

        if (field === "from") {
            dispatch(setFromPoints({ routeId, points }));
        } else {
            dispatch(setToPoints({ routeId, points }));
        }
    };

    const columns: TableProps<ITableRoute>["columns"] = [
        {
            title: "Name",
            dataIndex: "id",
            key: "id",
            render: (_, { id }) => `Заявка #${id}`,
        },
        {
            title: "From",
            dataIndex: "from",
            key: "from",
            render: (_, { id, from }) => (
                <Select
                    style={{ width: "100%" }}
                    value={from.join(SEPARATOR_SYMBOL)}
                    options={FROM_COORDS.map((item) => ({
                        value: item.coords.join(SEPARATOR_SYMBOL),
                        label: item.coords.join(SEPARATOR_SYMBOL),
                    }))}
                    onChange={(value) => handleFromSelect("from", id, value)}
                />
            ),
        },
        {
            title: "To",
            dataIndex: "to",
            key: "to",
            render: (_, { id, to }) => (
                <Select
                    style={{ width: "100%" }}
                    value={to.join(SEPARATOR_SYMBOL)}
                    options={TO_COORDS.map((item) => ({
                        value: item.coords.join(SEPARATOR_SYMBOL),
                        label: item.coords.join(SEPARATOR_SYMBOL),
                    }))}
                    onChange={(value) => handleFromSelect("to", id, value)}
                />
            ),
        },
    ];

    const data: ITableRoute[] = routes.map((route) => ({
        ...route,
        key: route.id,
    }));

    return { columns, data };
};
