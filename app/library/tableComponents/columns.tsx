"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Book = {
  titol: string;
  autor: string;
  prestatge: string;
  posicio: string;
  habitacio: string;
  tipus: string;
  editorial: string;
  idioma: string;
  notes: string;
}

export const columns: ColumnDef<Book>[] = [
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc")
          }}
        >
          Títol
        </button>
      )
    },
    accessorKey: "titol",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Autor
        </button>
      )
    },
    accessorKey: "autor",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prestatge
        </button>
      )
    },
    accessorKey: "prestatge",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posició
        </button>
      )
    },
    accessorKey: "posicio",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Habitació
        </button>
      )
    },
    accessorKey: "habitacio",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipus
        </button>
      )
    },
    accessorKey: "tipus",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Editorial
        </button>
      )
    },
    accessorKey: "editorial",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Idioma
        </button>
      )
    },
    accessorKey: "idioma",
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Notes
        </button>
      )
    },
    accessorKey: "notes",
  },  
/*   {
    header: "Editar",
    cell: ({ row }) => (
      <button
        className="button button-primary"
        onClick={() => alert(`Edit ${row.original.titol}`)}
      >
        Edit
      </button>
    ),
  }, */
]
