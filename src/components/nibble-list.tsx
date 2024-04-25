"use client";

import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "./ui/toast";
import { Nibble } from "@/db/schema";
import * as actions from "@/actions";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { columns } from "./nibble-list-columns";

interface NibbleListProps<TData, TValue> {
  data: TData[];
}

export default function NibbleList<TData, TValue>({
  data,
}: NibbleListProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { toast } = useToast();

  const confirmDelete = (nibble: Nibble) => {
    toast({
      title: "Confirm deletion ❌",
      description: `Would you like to delete the nibble "${nibble.topic}"?`,
      action: (
        <ToastAction
          altText="Delete this Nibble"
          onClick={async () => await actions.deleteNibble(nibble)}
        >
          Delete
        </ToastAction>
      ),
    });
  };

  const table = useReactTable<TData>({
    data,
    columns: columns(confirmDelete) as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by topic..."
          value={(table.getColumn("topic")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("topic")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                    <TableCell key={cell.id} className="text-lg">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-lg h-24">
                  No Nibbles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <Toaster />
    </div>
  );
}
