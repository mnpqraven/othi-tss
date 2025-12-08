import { rankItem } from "@tanstack/match-sorter-utils";
import type {
  Column,
  ColumnDef,
  ColumnPinningState,
  FilterFn,
  Table as TableReturn,
} from "@tanstack/react-table";
import type { CSSProperties } from "react";

//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
// TODO: `tv` can solve style spreading
export const pinnedStyles = (
  // biome-ignore lint/suspicious/noExplicitAny: safe any
  column: Column<any>,
  isHeader: boolean,
): CSSProperties => {
  const metaValue = column.columnDef.meta?.pinned;
  const isPinned = column.getIsPinned() || metaValue;
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px white inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px white inset"
        : undefined,
    top: isPinned && isHeader ? "0px" : undefined,
    position: isPinned ? "sticky" : "relative",
    background:
      isPinned && isHeader
        ? "var(--secondary)"
        : isPinned
          ? "var(--card)"
          : undefined,
    zIndex: isPinned ? 1 : 0,
  };
};

// biome-ignore lint/suspicious/noExplicitAny: safe any
export function pinnedPosition(column: Column<any>): CSSProperties {
  return {
    left:
      isPinned(column) === "left" ? `${column.getStart("left")}px` : undefined,
    right:
      isPinned(column) === "right"
        ? `${column.getAfter("right")}px`
        : undefined,
  };
}

// biome-ignore lint/suspicious/noExplicitAny: safe any
function isPinned(column: Column<any>) {
  const metaValue = column.columnDef.meta?.pinned;
  return column.getIsPinned() || metaValue;
}

export function columnSizingHandler<TData>(
  thElem: HTMLTableCellElement | null,
  table: TableReturn<TData>,
  column: Column<TData>,
) {
  if (!thElem) return;
  const stateSize = table.getState().columnSizing[column.id] as
    | number
    | undefined;

  // WARN: virtualizer contenxt always returns default 150 here
  const rectSize = thElem.getBoundingClientRect().width;

  // toFixed(4) to avoid fractional diff (Q)
  if (stateSize === undefined || stateSize.toFixed(3) !== rectSize.toFixed(3)) {
    table.setColumnSizing((prevSizes) => ({
      ...prevSizes,
      [column.id]: rectSize,
    }));
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function makeDefaultPinnedState<TData>(
  // biome-ignore lint/suspicious/noExplicitAny: we dont care about column type here
  columns: ColumnDef<TData, any>[],
): ColumnPinningState {
  const left = columns
    .filter((col) => col.meta?.pinned === "left")
    .map((col) => col.id)
    .filter((id) => id !== undefined);
  const right = columns
    .filter((col) => col.meta?.pinned === "right")
    .map((col) => col.id)
    .filter((id) => id !== undefined);

  return { left, right };
}
