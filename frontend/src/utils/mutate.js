"use server";

export const createTodo = async (form, token) => {
  const title = form.get("title");
  const description = form.get("description");

  const res = await fetch("http://localhost:5000/api/todo", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const updateTodo = async (
  { title, description, completed, _id },
  token
) => {
  const res = await fetch("http://localhost:5000/api/todo/" + _id, {
    method: "PATCH",
    body: JSON.stringify({ title, description, completed }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const deleteTodo = async (_id, token) => {
  const res = await fetch("http://localhost:5000/api/todo/" + _id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
