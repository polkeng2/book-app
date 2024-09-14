import { Suspense } from "react";
import { BookForm } from "./bookForm";
import Loader from "@/components/ui/loader";
import { cookies } from "next/headers";

const EntryPage = () => {
  const getToken = async () => {
    "use server";
    return cookies().get("token")?.value;
  };
  return (
    <Suspense fallback={<Loader />}>
      <BookForm getToken={getToken} />
    </Suspense>
  );
};

export default EntryPage;
