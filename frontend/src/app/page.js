"use client";

import TodoItem from "@/component/todo-item";
import { useUserContext } from "@/context/useContext";
import { getTodos } from "@/utils/queries";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [todos, setTodos] = useState(null);
  const { user } = useUserContext();

  const fetchTodos = async () => {
    const data = await getTodos(user.token);

    if (data.status === "fail") return toast.error(data.message);

    setTodos(data.data.todos);
  };

  return (
    <main>
      <div className="mt-8 w-full flex flex-col gap-2 justify-center items-center">
        <h1 className="text-2xl text-slate-100 font-bold">
          Welcome to todo app
        </h1>
        {!todos && (
          <button
            onClick={fetchTodos}
            className="border border-slate-300 text-slate-300 px-2 py-1 duration-200 transition-all rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Fetch todos
          </button>
        )}
      </div>
      {todos && todos.length == 0 && (
        <p className="text-2xl text-slate-100 font-bold mt-12 w-full text-center">
          You currently have no todos create todos please
        </p>
      )}
      <ul className="pl-4">
        {todos &&
          todos.map((todo) => (
            <TodoItem key={todo._id} {...todo} fetchTodos={fetchTodos} />
          ))}
      </ul>
    </main>
  );
}
