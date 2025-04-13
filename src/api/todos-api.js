const API_BASE_URL = "http://localhost:3000/todos";

export const fetchTodos = async () => {
  const response = await fetch(API_BASE_URL);
  return await response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return await response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await response.json();
};
