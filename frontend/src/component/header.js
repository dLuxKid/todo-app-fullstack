"use client";

import { useUserContext } from "@/context/useContext";
import Link from "next/link";

export default function Header() {
  const { user } = useUserContext();

  return (
    <nav className="w-full">
      <h1 className="text-2xl">
        {!user && "Todos"}
        {user && `${user?.user?.username}'s todolist`}
      </h1>

      {user?.token ? (
        <div>
          <Link
            href={"/create-todo"}
            className="border border-slate-300 text-slate-300 px-2 py-1 duration-200 transition-all rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            New todo
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Link
            href={"/login"}
            className="text-slate-300 font-medium hover:scale-105 hover:font-bold duration-200 transition-all"
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className="border border-slate-300 text-slate-300 px-2 py-1 duration-200 transition-all rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}
