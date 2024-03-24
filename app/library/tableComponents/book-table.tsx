"use client";

import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import SearchParam from "./searchParam";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: any;
  refetch: () => void;
}

const colInfo = [
  { id: "titol", name: "Títol" },
  { id: "autor", name: "Autor" },
  { id: "prestatge", name: "Prestatge" },
  { id: "posicio", name: "Posició" },
  { id: "habitacio", name: "Habitació" },
  { id: "tipus", name: "Tipus" },
  { id: "editorial", name: "Editorial" },
  { id: "idioma", name: "Idioma" },
  { id: "notes", name: "Notes" },
];

export function DataTable<TData, TValue>({
  columns,
  data,
  refetch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [openCollapsible, setOpenCollapsible] = React.useState<boolean>(false);
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

  const getColFilterValue = (name: string) => {
    return table.getColumn(name)?.getFilterValue() as string;
  };

  const setColFilterValue = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    return table.getColumn(name)?.setFilterValue(event.target.value);
  };

  function tableFilter() {
    if (!openCollapsible) {
      return (
        <div className="flex flex-row justify-between max-w-[100%] items-stretch gap-2 my-4 py-4 flex-1 overflow-auto">
          {colInfo.map((column, key) => (
            <SearchParam
              key={key}
              info={column}
              getFilterValue={getColFilterValue}
              setFilterValue={setColFilterValue}
            />
          ))}
        </div>
      );
    }
    return (
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
          className="border-b p-1 bg-transparent outline-none mb-10"
          type="text"
          placeholder="Filtra per categoria"
          value={(table.getColumn(filterId)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterId)?.setFilterValue(event.target.value)
          }
        />
      </div>
    );
  }
  return (
    <div className="w-[80%]">
      <div className="flex items-center">
        <Link href="/newEntry" className="ml-auto">
          <Button variant="outline">Crea nou llibre</Button>
        </Link>
        <Button
          variant="outline"
          size={"icon"}
          className="ml-3 aspect-square"
          onClick={refetch}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            version="1.1"
          >
            <title>Reload</title>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="Reload">
                <rect
                  id="Rectangle"
                  fill-rule="nonzero"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                ></rect>
                <path
                  d="M4,13 C4,17.4183 7.58172,21 12,21 C16.4183,21 20,17.4183 20,13 C20,8.58172 16.4183,5 12,5 C10.4407,5 8.98566,5.44609 7.75543,6.21762"
                  id="Path"
                  stroke="#0C0310"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M9.2384,1.89795 L7.49856,5.83917 C7.27552,6.34441 7.50429,6.9348 8.00954,7.15784 L11.9508,8.89768"
                  id="Path"
                  stroke="#0C0310"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </g>
            </g>
          </svg>
        </Button>
      </div>
      <div className="flex justify-between">{tableFilter()}</div>
      <div className="rounded-md border border-slate-800 max-h-[60vh] overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border-b border-slate-800"
                    >
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
                    className={`${
                      index % 2 === 0 && "bg-gray-200 hover:bg-gray-300"
                    }`}
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
                  className="h-24 text-center"
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
