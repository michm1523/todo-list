import "./styles.css";
import Todo from "./todo.js";
import { TodoList } from "./todo-list.js";
import {
  renderTodos,
  renderProjects,
  openSideBar,
  closeSideBar,
  updateProjectOptions,
  toggleSideBar,
  getSideBarOpen,
} from "./display.js";

// Create Todo List
const todoList = new TodoList();

// Form open and close
const addTodoBtn = document.querySelector(".add-todo");
const formCancelBtn = document.querySelector(".form-cancel");
let currTodoId = null;

addTodoBtn.addEventListener("click", () => openSideBar(todoList.getProjects()));

formCancelBtn.addEventListener("click", () => {
  closeSideBar();
  currTodoId = null;
});

// Add/edit todo form submission
const addTodoForm = document.querySelector(".add-form");
const todoNameInput = document.querySelector("#todo-name");
const todoTextInput = document.querySelector("#todo-text");
const todoDeadlineInput = document.querySelector("#deadline");
const projectSelectInput = document.querySelector("#project-select");
const importantInput = document.querySelector("#important-check");

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currTodoId) {
    todoList.addTodo(
      new Todo(
        todoNameInput.value,
        todoTextInput.value,
        todoDeadlineInput.value,
        projectSelectInput.value,
        importantInput.checked,
      ),
    );
  } else {
    const formData = {
      name: todoNameInput.value,
      text: todoTextInput.value,
      deadline: todoDeadlineInput.value,
      important: importantInput.checked,
    };
    todoList.editTodo(currTodoId, formData);
  }

  showTodos();

  currTodoId = null;
  closeSideBar();
});

// Add project form
const addProjectBtn = document.querySelector(".add-project");
const addProjectForm = document.querySelector(".add-project-form");
const addProjectDialog = document.querySelector(".add-project-dialog");
const closeProjectFormBtn = document.querySelector(".project-form-close");
const projectInput = document.querySelector("#project-name");

addProjectDialog.addEventListener("close", (e) => {
  projectInput.value = "";
});

addProjectBtn.addEventListener("click", (e) => {
  addProjectDialog.showModal();
});

closeProjectFormBtn.addEventListener("click", () => addProjectDialog.close());

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todoList.addProject(projectInput.value);

  renderProjects(todoList.getProjects());
  updateProjectOptions(todoList.getProjects());

  addProjectDialog.close();
});

// Todo actions
const todoListElement = document.querySelector(".todos");

todoListElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("del-todo")) {
    todoList.delTodo(e.target.parentElement.getAttribute("data-id"));
    showTodos();
  }

  if (e.target.classList.contains("todo-check")) {
    todoList.toggleTodoComplete(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("todo-name")) {
    const todoId = e.target.parentElement.getAttribute("data-id");
    if (getSideBarOpen() && currTodoId == todoId) {
      currTodoId = null;
      closeSideBar();
    } else {
      currTodoId = todoId;
      closeSideBar();
      openSideBar(todoList.getProjects(), todoList.getTodoById(todoId));
    }
  }
});

// Todo filters and sorting
const homeBtn = document.querySelector(".home-btn");
const projectList = document.querySelector(".project-list");
const timeTabs = document.querySelector(".tabs");

homeBtn.addEventListener("click", (e) => {
  todoList.resetFilters();
  showTodos();
});

// Project filter and delete project
const deleteProjectDialog = document.querySelector(".delete-project-dialog");
const deleteProjectClose = document.querySelector(".delete-project-close");
const deleteProjectSubmit = document.querySelector(".delete-project-submit");
const deleteProjectForm = document.querySelector(".delete-project-form");
let pendingDelete = null;

projectList.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-btn")) {
    todoList.resetFilters();
    todoList.filterByProject(e.target.textContent);
    showTodos();
  }

  if (e.target.classList.contains("delete-project-btn")) {
    pendingDelete = e.target.parentElement.firstChild.textContent;
    deleteProjectDialog.showModal();
  }
});

deleteProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pendingDelete) {
    todoList.delProject(pendingDelete);
  }
  renderProjects(todoList.getProjects());
  showTodos();
  deleteProjectDialog.close();
});

deleteProjectClose.addEventListener("click", (e) => {
  deleteProjectDialog.close();
});

deleteProjectDialog.addEventListener("close", (e) => {
  pendingDelete = null;
});

timeTabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab")) {
    todoList.filterByTime(e.target.textContent);
    showTodos();
  }
});

// Show todos
const showTodos = () => {
  renderTodos(todoList.getDisplayTodos());
  if (currTodoId) {
    if (
      !todoList
        .getDisplayTodos()
        .map((todo) => todo.id)
        .includes(currTodoId)
    ) {
      currTodoId = null;
      closeSideBar();
    }
  }
};

showTodos();
renderProjects(todoList.getProjects());
