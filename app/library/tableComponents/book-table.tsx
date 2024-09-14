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
import Loader from "@/components/ui/loader";
import { X } from "lucide-react";

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
  const { data, isLoading } = useBookData();
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

  const getColFilterValue = (id: string) => {
    return table.getColumn(id)?.getFilterValue() as string;
  };

  const setColFilterValue = (id: string, value: string) => {
    return table.getColumn(id)?.setFilterValue(value);
  };

  function tableFilter() {
    return (
      <div className="flex flex-row gap-6 md:justify-between max-w-[100%] items-stretch my-4 py-4 flex-1 overflow-auto bg-slate-800  px-4 rounded-sm">
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

  if (isLoading) return <Loader />;

  return (
    <div className="w-[80%]">
      <div className="flex items-center">
        <Link href="/newEntry" className="ml-auto">
          <Button variant="outline">Afegeix un llibre nou</Button>
        </Link>

        <Button
          variant="outline"
          size={"icon"}
          className="ml-3 aspect-square"
          onClick={() => setColumnFilters([])}
        >
          <X />
        </Button>
      </div>
      <div className="flex justify-between">{tableFilter()}</div>
      <div
        className="rounded-md border-b border-slate-200 h-[60vh] overflow-auto bg-slate-800"
        ref={parentRef}
      >
        <Table className="">
          <TableHeader className="sticky top-0 z-[9999]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={` bg-slate-800 text-slate-100
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
                  className={`text-slate-300 hover:bg-slate-700 border-b border-b-slate-200"
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
