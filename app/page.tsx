import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center">
      <Image
        className="absolute top-0 left-0 z-[-1]"
        src="/library-bg.jpg"
        alt="Imatge de biblioteca"
        fill
        priority
      />

      <div className="flex flex-col justify-center items-center text-slate-100 font-medium drop-shadow-2xl animate-fade-in animate-delay-800 animate-duration-800">
        <h1 className="text-4xl lg:text-6xl text-bold pointer-events-none">
          Els teus llibres. Ara online.
        </h1>
        <Link href={"/library"}>
          <Button className="mt-10 text-xl lg:text-3xl transition hover:scale-110">
            {"Ves a la biblioteca ->"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
