"use client";

import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [filterId, setFilterId] = React.useState<string>("titol");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  React.useEffect(() => {
    setColumnFilters([]);
    setSorting([]);
  }, [filterId]);

  return (
    <div className="w-[80%]">
      <div className="flex justify-between">
        <div className="flex flex-row gap-4">
          <Select
            defaultValue="titol"
            onValueChange={(id) => setFilterId(id as string)}
          >
            <SelectTrigger className="w-[220px] text-slate-200">
              <SelectValue placeholder="Selecciona una categoria" />
            </SelectTrigger>
            <SelectContent className="bg-blue-100 text-slate-600">
              <SelectItem value="titol">Títol</SelectItem>
              <SelectItem value="autor">Autor</SelectItem>
              <SelectItem value="prestatge">Prestatge</SelectItem>
              <SelectItem value="posicio">Posició</SelectItem>
              <SelectItem value="editorial">Editorial</SelectItem>
              <SelectItem value="idioma">Idioma</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
            </SelectContent>
          </Select>
          <input
            className="border-b border-b-slate-200 p-1 bg-transparent text-slate-200 placeholder:text-slate-200 outline-none mb-10"
            type="text"
            placeholder="Filtra per categoria"
            value={
              (table.getColumn(filterId)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterId)?.setFilterValue(event.target.value)
            }
            />
            </div>
        <Link href="/newEntry">
          <Button>Crea nou llibre</Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-slate-200">
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
              table.getRowModel().rows.map((row, index) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`${index % 2 === 0 && "bg-blue-200"}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-blue-50"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
