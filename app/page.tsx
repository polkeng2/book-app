"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 }, // Start position
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // End position with transition
  };
  return (
    <div className="h-[100dvh] bg-gradient-to-r from-blue-600 to-blue-200 flex flex-col justify-center items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl text-bold text-slate-200">
          Els teus llibres. Ara online.
        </h1>
        <Link href={"/library"}>
          <Button variant={"landing"} className="mt-10 text-xl">
            {"Ves a la biblioteca ->"}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
