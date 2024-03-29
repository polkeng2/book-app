import axios from "axios";
import { notFound } from "next/navigation";
import BookManager from "./tableComponents/book-manager";

const getData = async () => {
  try {
    const API = "https://llibres-api.driescode.dev";
    const response = await axios.get(`${API}/books`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Library() {
  const data = await getData();

  if (!data) return notFound();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <BookManager books={data} />
    </div>
  );
}
