import Link from "next/link";
import { DataTable } from "./library/tableComponents/book-table";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Library() {
  const deleteToken = async () => {
    "use server";
    cookies().delete("token");
    redirect("/login");
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <form action={deleteToken} className="">
        <header className="flex justify-between items-center p-4 bg-gray-800 border-b-2 border-slate-50 shadow-md">
          <h1 className="text-2xl font-bold text-slate-100 pl-5">
            La meva biblioteca
          </h1>
          <Button className="" variant="destructive" type="submit">
            <LogOut className="mr-2 h-4 w-4" /> Tancar la sessió
          </Button>
        </header>
      </form>
      <div className="flex-1 grid place-items-center">
        <DataTable />
      </div>
    </div>
  );
}
