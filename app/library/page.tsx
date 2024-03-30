"use client";

import { DataTable } from "./tableComponents/book-table";

export default function Library() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <DataTable />;
    </div>
  );
}
