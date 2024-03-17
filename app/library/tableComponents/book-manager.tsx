"use client";

import { useQuery } from "@tanstack/react-query";
import useApi from "../../hooks/useApi";
import { DataTable } from "./book-table";
import { columns } from "./columns";

export interface SearchParams {
  id: string;
  search: string;
}

export default function BookManager(books: any) {
  const { getAllBooks } = useApi();
  const { data: llibres, refetch } = useQuery({
    queryKey: ["getBooks"],
    queryFn: getAllBooks,
    initialData: books.books,
    enabled: false,
  });

  return <DataTable columns={columns} data={llibres} refetch={refetch} />;
}
