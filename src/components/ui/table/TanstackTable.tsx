import { flexRender, type Table as TableReturn } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./base";
import { columnSizingHandler, pinnedPosition, pinnedStyles } from "./utils";
import type { ComponentPropsWithoutRef } from "react";

interface DataTableProps<TData> extends ComponentPropsWithoutRef<"table"> {
  table: TableReturn<TData>;
}

export function TanstackTable<TData>({
  table,
  ...props
}: DataTableProps<TData>) {
  return (
    <Table {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
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
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  // pinning styles
                  style={{
                    ...pinnedStyles(cell.column, false),
                    ...pinnedPosition(cell.column),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
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
    </Table>
  );
}
