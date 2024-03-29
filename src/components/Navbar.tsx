import React from "react";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import SearchBox from "./SearchBox";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3x1">Weather</h2>
          <IoIosSunny className="text-3xl mt-1 text-yellow-300" />
        </div>
        <section className="flex gap-2 items-center">
          <FaLocationCrosshairs className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <FaLocationDot className="text-2xl" />
          <p className="text-slate-900/80 text-sm">Brasil</p>
          <div>
            <SearchBox value={""} onChange={undefined} onSubmit={undefined} />
          </div>
        </section>
      </div>
    </nav>
  );
}
