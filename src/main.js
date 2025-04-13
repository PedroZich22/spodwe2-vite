import { TodoFilter } from "./constants/filters";
import { addTodo, getTodos, toggleTodo } from "./services/todo-service";
import "./style.css";

let currentFilter = TodoFilter.ALL;

const newTodoInput = document.getElementById("new-todo");
const todoListUl = document.getElementById("todo-list");
const filterButtons = {
  all: document.getElementById("filter-all"),
  done: document.getElementById("filter-done"),
  notDone: document.getElementById("filter-not-done"),
};

async function init() {
  setupEventListeners();
  await loadTodos();
}

function setupEventListeners() {
  newTodoInput.addEventListener("keypress", handleNewTodoKeyPress);

  filterButtons.all.addEventListener("click", () => setFilter(TodoFilter.ALL));
  filterButtons.done.addEventListener("click", () =>
    setFilter(TodoFilter.DONE)
  );
  filterButtons.notDone.addEventListener("click", () =>
    setFilter(TodoFilter.NOT_DONE)
  );
}

async function handleNewTodoKeyPress(e) {
  if (e.key !== "Enter") return;

  const todoText = newTodoInput.value.trim();
  if (!todoText) return;

  await addTodo(todoText);
  await loadTodos();
}

async function loadTodos() {
  const todos = await getTodos(currentFilter);
  renderTodos(todos);
}

async function setFilter(filter) {
  currentFilter = filter;
  await loadTodos();
  updateActiveFilterButton();
}

function renderTodos(todos) {
  todoListUl.innerHTML = "";

  todos.forEach((todo) => {
    const todoItemLi = createTodoElement(todo);
    todoListUl.appendChild(todoItemLi);
  });

  updateActiveFilterButton();
}

function createTodoElement(todo) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", async () => {
    await toggleTodo(todo.id, todo.done);
    await loadTodos();
  });

  const span = document.createElement("span");
  span.textContent = todo.text;
  span.style.textDecoration = todo.done ? "line-through" : "none";

  li.appendChild(checkbox);
  li.appendChild(span);

  return li;
}

function updateActiveFilterButton() {
  Object.entries(filterButtons).forEach(([filter, button]) => {
    button.classList.toggle(
      "active",
      currentFilter === TodoFilter[filter.toUpperCase()]
    );
  });
}

init();
