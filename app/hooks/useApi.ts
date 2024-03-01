import axios from "axios";

interface Book {
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
}

function useApi() {
  const API = "https://178.33.35.235:8000";

  const getAllBooks = async () => {
    const response = await axios.get(`${API}/books`);
    return response.data;
  };

  const createBook = async (book: any) => {
    const response = await axios.post(`${API}/books`, book);
    return response.data;
  };

  const editBook = async (id: string, book: Book) => {
    const response = await axios.put(`${API}/books/${id}`, book);
    return response.data;
  };

  const deleteBook = async (id: number) => {
    const response = await axios.delete(`${API}/books/${id}`);
    return response.data;
  };

  return { getAllBooks, createBook, editBook, deleteBook };
}

export default useApi;
