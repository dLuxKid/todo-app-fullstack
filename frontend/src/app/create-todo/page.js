"use client";

import { useUserContext } from "@/context/useContext";
import { createTodo } from "@/utils/mutate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTodo() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateTodo = async (formData) => {
    setLoading(false);
    const data = await createTodo(formData, user.token);

    console.log(data);

    if (data.status === "fail") {
      setLoading(false);
      return toast.error(data.message);
    }

    setLoading(false);
    router.push("/");
  };
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <form
        className="w-full max-w-md flex gap-2 flex-col"
        action={handleCreateTodo}
      >
        <input
          required
          type="text"
          name="title"
          placeholder="name of the todo"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          minLength={4}
        />
        <textarea
          minLength={10}
          required
          name="description"
          placeholder="write about your todo"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
