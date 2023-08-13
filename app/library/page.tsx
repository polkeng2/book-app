import React from "react";
import BookManager from "./tableComponents/book-manager";
import { notFound } from "next/navigation";
import { google } from "googleapis";

const getData = async () => {
  function mapValuesToObj(values: string[]): Record<string, string> {
    return {
      titol: values[0],
      autor: values[1],
      prestatge: values[2],
      posicio: values[3],
      habitacio: values[4],
      tipus: values[5],
      editorial: values[6],
      idioma: values[7],
      notes: values[8] || "",
    };
  }

  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:I",
    });
    const books = response?.data?.values?.slice(1)?.map(mapValuesToObj);
    return books;
  } catch (error) {
    console.log(error);
  }
};

export default async function Library() {
  const data = await getData();

  if (!data) return notFound();

  return (
    <div className="h-[100dvh] bg-gradient-to-r from-blue-500 to-blue-300 flex flex-col justify-center items-center">
      <BookManager books={data} />
    </div>
  );
}
