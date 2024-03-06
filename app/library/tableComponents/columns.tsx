"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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
