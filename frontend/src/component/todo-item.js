"use client";

import { useUserContext } from "@/context/useContext";
import { deleteTodo, updateTodo } from "@/utils/mutate";
import { useState } from "react";
import { toast } from "sonner";

const TodoItem = ({ title, description, _id, completed, fetchTodos }) => {
  const { user } = useUserContext();

  const [showDescription, setShowDescription] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [todoData, setTodoData] = useState({ title, description, completed });
  const [loading, setLoading] = useState(false);

  const showForm = () => {
    setShowUpdateForm((prev) => !prev);
    setShowDescription(false);
  };

  const handleChange = (e) => {
    setTodoData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(false);
    const data = await updateTodo(
      {
        title: todoData.title,
        description: todoData.description,
        _id,
        completed,
      },
      user.token
    );

    if (data.status === "fail") {
      setLoading(false);
      return toast.error(data.message);
    }

    toast.success(`todo updated successfully`);
    setShowUpdateForm((prev) => !prev);
    setLoading(false);
    fetchTodos();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(false);
    const data = await deleteTodo(_id, user.token);

    if (data.status === "fail") {
      setLoading(false);
      return toast.error(data.message);
    }

    toast.success(`todo deleted successfully`);
    setLoading(false);
    setShowUpdateForm((prev) => !prev);
    fetchTodos();
  };

  const toggleTodo = async (_id, completed) => {
    const data = await updateTodo(
      {
        title,
        description,
        _id,
        completed,
      },
      user.token
    );

    if (data.status === "fail") {
      return toast.error(data.message);
    }

    fetchTodos();
  };

  return (
    <li className="cursor-pointer">
      <div className="todo-title">
        <div className="flex gap-1 items-center">
          <input
            id={_id}
            type="checkbox"
            className="cursor-pointer peer todo"
            defaultChecked={completed}
            onChange={(e) => toggleTodo(_id, e.target.checked)}
          />
          <label
            htmlFor={_id}
            className="peer-checked:line-through peer-checked:text-slate-500 cursor-pointer"
          />

          <p
            onClick={() => setShowDescription((prev) => !prev)}
            className="title"
          >
            {title}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end" onClick={showForm}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"
              />
              <path
                fill="currentColor"
                d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"
              />
            </svg>
          </span>
          <p>Edit</p>
        </div>
      </div>

      {showDescription && (
        <p className="text-slate-100 border border-slate-100 desc">
          {description}
        </p>
      )}

      {showUpdateForm && (
        <form className="w-full max-w-md flex gap-2 flex-col mt-2">
          <input
            required
            type="text"
            name="title"
            placeholder="name of the todo"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
            value={todoData.title || ""}
            onChange={handleChange}
          />
          <textarea
            value={todoData.description || ""}
            minLength={10}
            required
            onChange={handleChange}
            name="description"
            placeholder="write about your todo"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <div className="flex gap-1 justify-end">
            <button
              onClick={handleDelete}
              type="submit"
              className="del px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Delete
            </button>
            <button
              type="submit"
              disabled={loading}
              onClick={handleUpdate}
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </li>
  );
};

export default TodoItem;
