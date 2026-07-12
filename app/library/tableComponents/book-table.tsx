"use client";

import React from "react";

import { useVirtualizer } from "@tanstack/react-virtual";

import {
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

const columnConfig = [
  { id: "titol", name: "Títol", width: "400px" },
  { id: "autor", name: "Autor", width: "400px" },
  { id: "prestatge", name: "Prestatge", width: "40px" },
  { id: "posicio", name: "Posició", width: "40px" },
  { id: "habitacio", name: "Habitació", width: "100px" },
  { id: "tipus", name: "Tipus", width: "100px" },
  { id: "editorial", name: "Editorial", width: "180px" },
  { id: "idioma", name: "Idioma", width: "150px" },
  { id: "notes", name: "Notes", width: "200px" },
  { id: "edit", name: "", width: "20px" },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const { data, isLoading, isError } = useBookData();
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
        {columnConfig
          .filter((c) => c.name)
          .map((column) => (
            <SearchParam
              key={column.id}
              info={column}
              getFilterValue={getColFilterValue}
              setFilterValue={setColFilterValue}
            />
          ))}
      </div>
    );
  }

  let rowValues: Row<Book>[] = [];
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
  if (isError)
    return (
      <div className="text-slate-300 text-center py-20">
        No s&apos;han pogut carregar els llibres. Refresca la pàgina.
      </div>
    );

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
        className="h-[60vh] overflow-auto bg-slate-800 rounded-md border-b border-slate-200"
        ref={parentRef}
      >
        <Table className="table-fixed">
          <colgroup>
            {columnConfig.map((col) => (
              <col key={col.id} style={{ width: col.width }} />
            ))}
          </colgroup>
          <TableHeader className="sticky top-0 z-[9999]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`bg-slate-800 text-slate-100 ${
                        header.id === "prestatge" || header.id === "posicio"
                          ? "text-center"
                          : ""
                      }`}
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
            {virtualItems.map((virtualRow, index) => {
              const row = rowValues[virtualRow.index] as Row<Book>;
              return (
                <TableRow
                  key={row.id}
                  className="text-slate-300 hover:bg-slate-700"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`hover:font-medium ${
                          cell.column.id === "prestatge" ||
                          cell.column.id === "posicio"
                            ? "text-center"
                            : ""
                        }`}
                        onClick={() => {
                          setColFilterValue(
                            cell.column.id,
                            cell.getValue() as string,
                          );
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
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
