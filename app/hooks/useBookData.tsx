import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

export const useBookData = () => {
  const { getAllBooks } = useApi();

  return useQuery({
    queryKey: ["getBooks"],
    queryFn: getAllBooks,
    staleTime: Infinity,
  });
};
