"use client";

import { useUserContext } from "@/context/useContext";
import { signup } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Signup() {
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (formData) => {
    setLoading(true);
    const data = await signup(formData);

    if (data.status === "fail") {
      setLoading(false);
      return toast.error(data.message);
    }

    setUser({ token: data.token, user: data.data.user });
    toast.success(`${data.data.user.username}, your account has been created`);
    localStorage.setItem(
      "user",
      JSON.stringify({ token: data.token, user: data.data.user })
    );
    setLoading(false);
    router.push("/");
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-8">Create account</h2>
      <form
        className="w-full max-w-md flex gap-2 flex-col"
        action={handleSignup}
      >
        <input
          required
          type="text"
          name="name"
          placeholder="username"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <button
            type="submit"
            disabled={loading}
            className="border disabled:cursor-not-allowed border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            signup
          </button>
        </div>
      </form>
    </main>
  );
}
