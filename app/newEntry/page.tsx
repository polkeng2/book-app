import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { BookForm } from "./bookForm";

const EntryPage = () => {
  return (
    <Suspense fallback={<BarLoader color="#000" />}>
      <BookForm />
    </Suspense>
  );
};

export default EntryPage;
