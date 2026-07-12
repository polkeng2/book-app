"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";

const accentInsensitiveFilter = <TData extends object>(
  row: Row<TData>,
  columnId: string,
  filterValue: unknown,
): boolean => {
  const value = row.getValue(columnId) as string;
  if (value == null || filterValue == null) return false;
  const norm = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/l·l/g, "ll")
      .replace(/·/g, "");
  return norm(value).includes(norm(filterValue as string));
};

export type Book = {
  id: number;
  titol: string;
  autor: string;
  prestatge: string;
  posicio: string;
  habitacio: string;
  tipus: string;
  editorial: string;
  idioma: string;
  notes: string;
};

export const columns: ColumnDef<Book>[] = [
  {
    id: "titol",
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Títol
        </button>
      );
    },
    accessorKey: "titol",
    filterFn: accentInsensitiveFilter,
    cell: (info) => info.getValue(),
  },
  {
    id: "autor",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Autor
        </button>
      );
    },
    accessorKey: "autor",
    filterFn: accentInsensitiveFilter,
    cell: (info) => info.getValue(),
  },
  {
    id: "prestatge",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prestatge
        </button>
      );
    },
    accessorKey: "prestatge",
    cell: (info) => info.getValue(),
  },
  {
    id: "posicio",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posició
        </button>
      );
    },
    accessorKey: "posicio",
    cell: (info) => info.getValue(),
  },
  {
    id: "habitacio",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Habitació
        </button>
      );
    },
    accessorKey: "habitacio",
    filterFn: accentInsensitiveFilter,
    cell: (info) => info.getValue(),
  },
  {
    id: "tipus",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipus
        </button>
      );
    },
    accessorKey: "tipus",
    filterFn: accentInsensitiveFilter,
    cell: (info) => info.getValue(),
  },
  {
    id: "editorial",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Editorial
        </button>
      );
    },
    accessorKey: "editorial",
    filterFn: accentInsensitiveFilter,
    cell: (info) => info.getValue(),
  },
  {
    id: "idioma",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Idioma
        </button>
      );
    },
    accessorKey: "idioma",
    filterFn: accentInsensitiveFilter,
    cell: (info) => info.getValue(),
  },
  {
    id: "notes",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Notes
        </button>
      );
    },
    accessorKey: "notes",
    filterFn: accentInsensitiveFilter,
    cell: (info) => info.getValue(),
  },
  {
    id: "edit",
    header: "",
    cell: ({ row }) => (
      <Link
        href={`/newEntry?id=${row.original.id}`}
        className="button button-primary"
      >
        Edit
      </Link>
    ),
  },
];
