import "./style.css";

const todos = [];
let filter = "all";

document.getElementById("new-todo").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const newTodoInput = document.getElementById("new-todo");
    const todoText = newTodoInput.value.trim();
    if (todoText === "") return;

    addTodo(todoText);
    newTodoInput.value = "";
    renderTodos();
  }
});

document
  .getElementById("filter-all")
  .addEventListener("click", () => setFilter("all"));
document
  .getElementById("filter-done")
  .addEventListener("click", () => setFilter("done"));
document
  .getElementById("filter-not-done")
  .addEventListener("click", () => setFilter("not-done"));

function setFilter(newFilter) {
  filter = newFilter;
  renderTodos();
  updateFilterButtons();
}

function updateFilterButtons() {
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`filter-${filter}`).classList.add("active");
}

function renderTodos() {
  updateFilterButtons();
  const todoListUl = document.getElementById("todo-list");
  todoListUl.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "not-done") return !todo.done;
    return true;
  });

  for (const todo of filteredTodos) {
    const todoItemLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      renderTodos();
    });

    const todoTextSpan = document.createElement("span");
    todoTextSpan.textContent = todo.text;
    if (todo.done) {
      todoTextSpan.style.textDecoration = "line-through";
    }

    todoItemLi.appendChild(checkbox);
    todoItemLi.appendChild(todoTextSpan);
    todoListUl.appendChild(todoItemLi);
  }
}

function addTodo(todoText) {
  const id = todos.length;
  const newTodo = { id, text: todoText, done: false };
  todos.push(newTodo);
}

renderTodos();
