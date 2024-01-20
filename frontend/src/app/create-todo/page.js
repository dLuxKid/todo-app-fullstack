import Link from "next/link";

export default function NewTodo() {
  return (
    <form className="flex gap-2 flex-col">
      <input
        required
        type="text"
        name="title"
        placeholder="name of the todo"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        minLength={4}
        maxLength={10}
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
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Create
        </button>
      </div>
    </form>
  );
}
