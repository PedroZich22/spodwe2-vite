import { fetchTodos, createTodo, updateTodo } from "../api/todos-api";
import { TodoFilter } from "../constants/filters";

export const getTodos = async (filter = TodoFilter.ALL) => {
  const todos = await fetchTodos();
  return filterTodos(todos, filter);
};

const filterTodos = (todos, filter) => {
  switch (filter) {
    case TodoFilter.DONE:
      return todos.filter((todo) => todo.done);
    case TodoFilter.NOT_DONE:
      return todos.filter((todo) => !todo.done);
    default:
      return todos;
  }
};

export const addTodo = async (text) => {
  return await createTodo({ text, done: false });
};

export const toggleTodo = async (id, currentStatus) => {
  return await updateTodo(id, { done: !currentStatus });
};
