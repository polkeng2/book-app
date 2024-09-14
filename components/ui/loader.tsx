import React from "react";
import { BarLoader } from "react-spinners";

function Loader() {
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center">
      <BarLoader />
    </div>
  );
}

export default Loader;
