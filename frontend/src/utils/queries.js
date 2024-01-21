"use server";

export const getTodos = async (token) => {
  const res = await fetch("http://localhost:5000/api/todo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
};
