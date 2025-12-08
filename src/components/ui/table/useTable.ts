import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import { fuzzyFilter, makeDefaultPinnedState } from "./utils";

interface Props<TData> {
  data: TData[] | undefined | null;
  // biome-ignore lint/suspicious/noExplicitAny: known issue with columns type
  columns: ColumnDef<TData, any>[];
  totalItems?: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export function useTable<TData>({
  columns,
  data,
  pagination,
  setPagination,
  totalItems,
}: Props<TData>) {
  const stableData = useMemo(() => data || [], [data]);

  return useReactTable({
    // data and definitions
    initialState: { columnPinning: makeDefaultPinnedState(columns) },
    data: stableData,
    columns,

    // logic
    globalFilterFn: "fuzzy",
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    // NOTE: all rows can be expanded, this might be the desired behaviour
    // since we want full JSON data on all events
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    rowCount: totalItems ?? -1,

    // pagination
    manualPagination: true,
    onPaginationChange: setPagination,
    state: { pagination },
  });
}
