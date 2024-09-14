import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Manager",
  description: "Administra la teva propia biblioteca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-900 ${inter.className}`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
