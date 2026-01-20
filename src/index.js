import "./styles.css";
import Todo from "./todo.js";
import {
  addTodo,
  delTodo,
  getDisplayTodos,
  addProject,
  getProjects,
  resetFilters,
  filterByProject,
} from "./todo-list.js";
import {
  renderTodos,
  renderProjects,
  openSideBar,
  closeSideBar,
  updateProjectOptions,
} from "./display.js";

// Form open and close
const addTodoBtn = document.querySelector(".add-todo");
const formCancelBtn = document.querySelector(".form-cancel");

addTodoBtn.addEventListener("click", () => openSideBar(getProjects()));

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
  addProject(projectInput.value);

  renderProjects(getProjects());
  updateProjectOptions(getProjects());

  closeProjectDialog();
});

// Remove todos
const todoList = document.querySelector(".todos");

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del-todo")) {
    delTodo(e.target.parentElement.getAttribute("data-id"));
    renderTodos(getDisplayTodos());
  }
});

// View todos for specific projects
const homeBtn = document.querySelector(".home-btn");
const projectList = document.querySelector(".project-list");

homeBtn.addEventListener("click", (e) => {
  resetFilters();
  renderTodos(getDisplayTodos());
});

projectList.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-btn")) {
    resetFilters();
    filterByProject(e.target.textContent);
    renderTodos(getDisplayTodos());
  }
});

renderTodos(getDisplayTodos());
renderProjects(getProjects());
