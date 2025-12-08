import {
  flexRender,
  type Row,
  type Table as TableReturn,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import type {
  ComponentPropsWithoutRef,
  RefObject,
  UIEventHandler,
} from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableInfinite,
  TableRow,
} from "./base";
import { columnSizingHandler, pinnedPosition, pinnedStyles } from "./utils";

interface DataTableProps<TData> extends ComponentPropsWithoutRef<"table"> {
  table: TableReturn<TData>;
  bottomFetchFn: UIEventHandler<HTMLDivElement>;
  ref: RefObject<HTMLDivElement | null>;
  height?: string;
}

/**
 * WARNING: infinite table has a default width of 150 to columns, longer columns
 * will need to specify their width in the `columns` definition
 */
export function InfiniteTable<TData>({
  table,
  bottomFetchFn,
  ref: containerRef,
  height = "600px",
  ...props
}: DataTableProps<TData>) {
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 37, //estimate row height for accurate scrollbar dragging
    // we need a reference to the scrolling element for logic down below
    getScrollElement: () => containerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  // Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights
  return (
    <TableInfinite
      containerRef={containerRef}
      height={height}
      onScroll={bottomFetchFn}
      {...props}
    >
      <TableHeader className="grid">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="flex w-full">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  // NOTE: IMPORTANT
                  colSpan={header.colSpan}
                  // pinning styles
                  style={{
                    width: header.getSize(),
                    ...pinnedStyles(header.column, true),
                    ...pinnedPosition(header.column),
                  }}
                  // callback ref which does the heavy lifting
                  ref={(thElem) =>
                    columnSizingHandler(thElem, table, header.column)
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody
        // needed for absolute positioning of rows
        className="relative grid"
        // tells scrollbar how big the table is
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems()?.length ? (
          rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<TData>;

            return (
              <TableRow
                data-index={virtualRow.index} //needed for dynamic row height measurement
                ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                style={{
                  display: "flex",
                  position: "absolute",
                  transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                  width: "100%",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      ...pinnedStyles(cell.column, false),
                      ...pinnedPosition(cell.column),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableInfinite>
  );
}
