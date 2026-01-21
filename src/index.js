import "./styles.css";
import Todo from "./todo.js";
import { TodoList } from "./todo-list.js";
import {
  renderTodos,
  renderProjects,
  openSideBar,
  closeSideBar,
  updateProjectOptions,
} from "./display.js";

// Create Todo List
const todoList = new TodoList();

// Form open and close
const addTodoBtn = document.querySelector(".add-todo");
const formCancelBtn = document.querySelector(".form-cancel");

addTodoBtn.addEventListener("click", () => openSideBar(todoList.getProjects()));

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

  todoList.addTodo(
    new Todo(
      todoNameInput.value,
      todoTextInput.value,
      todoDeadlineInput.value,
      projectSelectInput.value,
      importantInput.checked,
    ),
  );

  renderTodos(todoList.getDisplayTodos());

  closeSideBar();
});

// Add project form
const addProjectBtn = document.querySelector(".add-project");
const addProjectForm = document.querySelector(".add-project-form");
const addProjectDialog = document.querySelector("dialog");
const closeProjectFormBtn = document.querySelector(".project-form-close");
const projectInput = document.querySelector("#project-name");

const closeProjectDialog = () => {
  addProjectDialog.close();
  projectInput.value = "";
};

addProjectBtn.addEventListener("click", (e) => {
  addProjectDialog.showModal();
});

closeProjectFormBtn.addEventListener("click", closeProjectDialog);

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todoList.addProject(projectInput.value);

  renderProjects(todoList.getProjects());
  updateProjectOptions(todoList.getProjects());

  closeProjectDialog();
});

// Todo actions
const todoListElement = document.querySelector(".todos");

todoListElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("del-todo")) {
    todoList.delTodo(e.target.parentElement.getAttribute("data-id"));
    renderTodos(todoList.getDisplayTodos());
  }

  if (e.target.classList.contains("todo-check")) {
    todoList.toggleTodoComplete(e.target.parentElement.getAttribute("data-id"));
  }
});

// Todo filters and sorting
const homeBtn = document.querySelector(".home-btn");
const projectList = document.querySelector(".project-list");
const timeTabs = document.querySelector(".tabs");

homeBtn.addEventListener("click", (e) => {
  todoList.resetFilters();
  renderTodos(todoList.getDisplayTodos());
});

projectList.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-btn")) {
    todoList.resetFilters();
    todoList.filterByProject(e.target.textContent);
    renderTodos(todoList.getDisplayTodos());
  }
});

timeTabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab")) {
    todoList.filterByTime(e.target.textContent);
    renderTodos(todoList.getDisplayTodos());
  }
});

renderTodos(todoList.getDisplayTodos());
renderProjects(todoList.getProjects());
