"use server";

export const createTodo = async (form) => {
  const title = form.get("title");
  const description = form.get("description");

  console.log(form);
};
