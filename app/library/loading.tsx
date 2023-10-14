import { BarLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center">
      <BarLoader />
    </div>
  );
}
