import React from 'react'
import { BarLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="h-[100dvh] bg-gradient-to-r from-blue-500 to-blue-300 flex flex-col justify-center items-center">
      <BarLoader color="#f9fcff" />
    </div>
  )
}
