"use client";

import React from "react";

import { useVirtualizer } from "@tanstack/react-virtual";

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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

import Link from "next/link";
import SearchParam from "./searchParam";
import { Book, columns } from "./columns";
import { useBookData } from "@/app/hooks/useBookData";
import { BarLoader } from "react-spinners";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
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

export function DataTable<TData, TValue>() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { data, refetch, isLoading } = useBookData();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {},
  });

  const getColFilterValue = (name: string) => {
    return table.getColumn(name)?.getFilterValue() as string;
  };

  const setColFilterValue = (id: string, value: string) => {
    return table.getColumn(id)?.setFilterValue(value);
  };

  function tableFilter() {
    return (
      <div className="flex flex-row justify-between max-w-[100%] items-stretch my-4 py-4 flex-1 overflow-auto bg-slate-100 border border-black px-4 gap-4 rounded-sm">
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

  let rowValues: any = [];
  if (!isLoading) {
    const { rows } = table.getRowModel();
    rowValues = rows;
  }

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rowValues.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 20,
  });

  const virtualItems = virtualizer.getVirtualItems();

  if (isLoading)
    return (
      <div className="h-[100dvh] flex flex-col justify-center items-center">
        <BarLoader />
      </div>
    );

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
          onClick={() => setColumnFilters([])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-6 h-6"
          >
            <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z" />
          </svg>
        </Button>
      </div>
      <div className="flex justify-between">{tableFilter()}</div>
      <div
        //style={{ height: `${virtualizer.getTotalSize()}px` }}
        className="rounded-md border border-slate-800 h-[60vh] overflow-auto bg-slate-100"
        ref={parentRef}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`border-b border-slate-800 bg-slate-800 text-slate-100
                        ${header.id === "titol" && " w-[400px]"} 
                        ${header.id === "autor" && "w-[400px]"} 
                        ${header.id === "prestatge" && "w-[40px]"} 
                        ${header.id === "posicio" && "w-[40px]"} 
                        ${header.id === "habitacio" && "w-[100px]"} 
                        ${header.id === "tipus" && "w-[100px]"} 
                        ${header.id === "editorial" && "w-[180px]"} 
                        ${header.id === "idioma" && "w-[150px]"} 
                        ${header.id === "notes" && "w-[200px]"} 
                        ${header.id === "edit" && "w-[20px]"}
                      `}
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
            {virtualItems.map((virtualRow, index) => {
              const row = rowValues[virtualRow.index] as Row<TData>;
              return (
                <TableRow
                  key={row.id}
                  //data-state={row.getIsSelected() && "selected"}
                  className={`text-slate-700 hover:text-slate-900 ${
                    index % 2 === 0 ? "bg-slate-300 " : "bg-slate-200"
                  }`}
                  style={{
                    //height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`hover:font-medium 
                        ${cell.column.id === "titol" && " w-[400px]"} 
                        ${cell.column.id === "autor" && "w-[400px]"} 
                        ${cell.column.id === "prestatge" && "w-[40px]"} 
                        ${cell.column.id === "posicio" && "w-[40px]"} 
                        ${cell.column.id === "habitacio" && "w-[100px]"} 
                        ${cell.column.id === "tipus" && "w-[100px]"} 
                        ${cell.column.id === "editorial" && "w-[180px]"} 
                        ${cell.column.id === "idioma" && "w-[150px]"} 
                        ${cell.column.id === "notes" && "w-[200px]"} 
                        ${cell.column.id === "edit" && "w-[20px]"}`}
                        onClick={() => {
                          //Change columnFilters, such as the object inside the array with id === cell.column.id changes its value to cell.getValue()

                          setColFilterValue(
                            cell.column.id,
                            cell.getValue() as string
                          );
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
