import "./styles.css";
import Todo from "./todo.js";
import { addTodo, getDisplayTodos } from "./todo-list.js";
import { renderTodos } from "./display.js";

// Form open and close
const addTodoBtn = document.querySelector(".add-todo");
const rightSideBar = document.querySelector(".right-sidebar");
const formCancelBtn = document.querySelector(".form-cancel");

const openSideBar = () => {
  rightSideBar.classList.add("open");
  addTodoBtn.classList.add("hidden");
};

const closeSideBar = () => {
  todoNameInput.value = "";
  todoTextInput.value = "";
  projectSelectInput.value = "";
  todoDeadlineInput.value = "";
  importantInput.checked = false;
  rightSideBar.classList.remove("open");
  addTodoBtn.classList.remove("hidden");
};

addTodoBtn.addEventListener("click", openSideBar);

formCancelBtn.addEventListener("click", closeSideBar);

// Form submission
const addTodoForm = document.querySelector(".add-form");
const todoNameInput = document.querySelector("#todo-name");
const todoTextInput = document.querySelector("#todo-text");
const todoDeadlineInput = document.querySelector("#deadline");
const projectSelectInput = document.querySelector("#project-select");
const importantInput = document.querySelector("#important-check");

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo(
    new Todo(
      todoNameInput.value,
      todoTextInput.value,
      todoDeadlineInput.value,
      projectSelectInput.value,
      importantInput.checked,
    ),
  );

  renderTodos(getDisplayTodos());

  closeSideBar();
});
