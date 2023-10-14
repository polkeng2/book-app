"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "./book-table";
import { columns } from "./columns";

export interface SearchParams {
  id: string;
  search: string;
}

export default function BookManager(books: any) {
  const { data: llibres } = useQuery({
    queryKey: ["getBooks"],
    queryFn: async () => {
      const result = await axios.get("/api/books");
      return result.data;
    },
    initialData: books.books,
    enabled: false,
  });

  return <DataTable columns={columns} data={llibres} />;
}
