"use server";

export const login = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http://localhost:5000/api/user/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const signup = async (formData) => {
  const username = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http://localhost:5000/api/user/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
