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
  const API = "http://localhost:8000";

  const getAllBooks = async () => {
    const response = await axios.get(`${API}/books`);
    return response.data;
  };

  const createBook = async (book: any, cookie: String | undefined) => {
    console.log("book: ", book);
    const response = await axios.post(`${API}/books`, book, {
      headers: {
        Authorization: `${cookie}`,
      },
    });
    return response.data;
  };

  const editBook = async (
    id: string,
    book: Book,
    cookie: String | undefined
  ) => {
    console.log("Edited book: ", book);
    const response = await axios.put(`${API}/books/${id}`, book, {
      headers: {
        Authorization: `${cookie}`,
      },
    });
    return response.data;
  };

  const deleteBook = async (id: number, cookie: String | undefined) => {
    const response = await axios.delete(`${API}/books/${id}`, {
      headers: {
        Authorization: `${cookie}`,
      },
    });
    return response.data;
  };

  const getAuth = async (email: string, password: string) => {
    const response = await axios.post(`${API}/login`, { email, password });
    return response.data;
  };

  return { getAllBooks, createBook, editBook, deleteBook, getAuth };
}

export default useApi;
