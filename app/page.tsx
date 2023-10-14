"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 }, // Start position
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // End position with transition
  };
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center">
      <Image
        className="absolute top-0 left-0 z-[-1]"
        src="/library-bg.jpg"
        alt="Imatge de biblioteca"
        fill={true}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        className="flex flex-col justify-center items-center text-white drop-shadow-2xl"
      >
        <h1 className="text-4xl lg:text-6xl text-bold pointer-events-none">
          Els teus llibres. Ara online.
        </h1>
        <Link href={"/library"}>
          <Button variant={"landing"} className="mt-10 text-xl lg:text-3xl">
            {"Ves a la biblioteca ->"}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
