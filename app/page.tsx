import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100dvh] bg-gradient-to-r from-blue-600 to-blue-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl text-bold text-slate-200">
        Els teus llibres. Ara online.
      </h1>
      <Link href={"/library"}>
        <Button variant={'landing'} className="mt-10 text-xl">{'Ves a la biblioteca ->'}</Button>
      </Link>
    </div>
  );
}
