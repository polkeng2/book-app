import { NextResponse } from "next/server";
import { google } from "googleapis";
import { NextApiRequest } from "next";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
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
      range: 'A:I'
    });
    const books = response?.data?.values?.slice(1)?.map(mapValuesToObj);
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.file"],
  });

  const sheets = google.sheets({
    auth,
    version: "v4",
  });

  try {
    console.log("body", [body.titol, body.autor, body.prestatge, body.posicio, body.habitacio, body.tipus, body.editorial, body.idioma, body.notes])
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:I1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.titol, body.autor, body.prestatge, body.posicio, body.habitacio, body.tipus, body.editorial, body.idioma, body.notes]],
      },
    });
/*     const path = req.nextUrl.searchParams.get('path') || '/'
    console.log("PATH", path)
    revalidatePath(path);
    console.log("DONETE") */
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.error();
  }

}