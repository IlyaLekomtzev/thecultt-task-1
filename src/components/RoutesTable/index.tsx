import { Table } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectRoutesState } from "@/store/routes/selectors";
import { setSelectedRouteId } from "@/store/routes/slice";
import { useRoutesTable } from "./useRoutesTable";

export const RoutesTable = () => {
    const dispatch = useAppDispatch();
    const { isLoading, selectedRouteId } = useAppSelector(selectRoutesState);
    const { columns, data } = useRoutesTable();

    const handleRowClick = (routeId: number) => {
        dispatch(setSelectedRouteId(routeId));
    };

    return (
        <Table
            loading={isLoading}
            scroll={{ x: "max-content" }}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            onRow={(record) => ({
                onClick: () => handleRowClick(record.id),
                style: { cursor: "pointer" },
                className:
                    record.id === selectedRouteId
                        ? "ant-table-row-selected"
                        : "",
            })}
        />
    );
};
