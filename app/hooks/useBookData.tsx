import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import { Book } from "../library/tableComponents/columns";

interface Props {
  books: Book[] | undefined;
}

export const useBookData = () => {
  const { getAllBooks } = useApi();

  return useQuery({
    queryKey: ["getBooks"],
    queryFn: getAllBooks,
    staleTime: Infinity,
  });
};
