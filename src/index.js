import "./styles.css";
import Todo from "./todo.js";
import TodoList from "./todo-list.js";
import display from "./display.js";

// Create Todo List
const todoList = new TodoList();

// Form open and close
const addTodoBtn = document.querySelector(".add-todo");
const formCancelBtn = document.querySelector(".form-cancel");
let currTodoId = null;

addTodoBtn.addEventListener("click", (e) => {
  display.openSideBar(
    todoList.getProjects(),
    currTodoId,
    todoList.getFilters().projectFilter,
  );
  updateRender();
});

formCancelBtn.addEventListener("click", () => {
  display.closeSideBar();
  currTodoId = null;
  updateRender();
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
  currTodoId = null;
  updateFormDisplay();
  updateRender();

  display.closeSideBar();
});

const submitTodoForm = () => {
  const submitEvent = new Event("submit", { cancelable: true, bubbles: true });
  addTodoForm.dispatchEvent(submitEvent);
};

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

  updateRender();

  addProjectDialog.close();
});

// Todo actions
const todoListElement = document.querySelector(".todos");

todoListElement.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("del-todo")) {
    todoList.delTodo(e.target.parentElement.getAttribute("data-id"));
    updateFormDisplay();
    updateRender();
    e.stopPropagation();
  }

  if (e.target.classList.contains("todo-check")) {
    todoList.toggleTodoComplete(e.target.parentElement.getAttribute("data-id"));
    updateRender();
    updateFormDisplay();
    e.stopPropagation();
  }

  if (e.target.classList.contains("todo")) {
    const todoId = e.target.getAttribute("data-id");
    if (currTodoId) {
      if (currTodoId == todoId) {
        submitTodoForm();
      } else {
        submitTodoForm();
        currTodoId = todoId;
        display.openSideBar(
          todoList.getProjects(),
          todoList.getTodoById(todoId),
          todoList.getFilters().projectFilter,
        );
      }
    } else {
      currTodoId = todoId;
      display.openSideBar(
        todoList.getProjects(),
        todoList.getTodoById(todoId),
        todoList.getFilters().projectFilter,
      );
    }
    updateRender();
  }
});

// Todo filters and sorting
const homeBtn = document.querySelector(".home-btn");
const projectList = document.querySelector(".project-list");
const timeTabs = document.querySelector(".tabs");

homeBtn.addEventListener("click", (e) => {
  reset();
  updateRender();
  updateFormDisplay();
});

const sort = document.querySelector(".sort");
const sortButton = document.querySelector(".sort-label");
const sortOptions = document.querySelector(".sort-options");

sortButton.addEventListener("click", (e) => {
  sort.classList.toggle("sort-open");
});

sortOptions.addEventListener("click", (e) => {
  if (e.target.classList.contains("sort-option")) {
    todoList.changeSort(e.target.textContent);
    sort.classList.remove("sort-open");
  }
  updateFormDisplay();
  updateRender();
});

const statusFilter = document.querySelector(".filter");
const statusButton = document.querySelector(".filter-label");
const statusOptions = document.querySelector(".filter-options");
const filterImportant = document.querySelector("#filter-important");
const filterComplete = document.querySelector("#filter-complete");
const filterIncomplete = document.querySelector("#filter-incomplete");

statusButton.addEventListener("click", (e) => {
  statusFilter.classList.toggle("filter-open");
});

statusOptions.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("filter-desc") ||
    e.target.classList.contains("filter-check")
  ) {
    todoList.filterByStatus(
      filterImportant.checked,
      filterComplete.checked,
      filterIncomplete.checked,
    );

    updateRender();
    updateFormDisplay();
  }
});

// Project filter and delete project
const deleteProjectDialog = document.querySelector(".delete-project-dialog");
const deleteProjectClose = document.querySelector(".delete-project-close");
const deleteProjectSubmit = document.querySelector(".delete-project-submit");
const deleteProjectForm = document.querySelector(".delete-project-form");
let pendingDelete = null;

projectList.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-btn")) {
    reset();
    todoList.filterByProject(e.target.textContent);
    updateFormDisplay();
    updateRender();
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
  updateFormDisplay();
  updateRender();
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
    updateFormDisplay();
    updateRender();
  }
});

// Close form if todo being edited is no longer being displayed
const updateFormDisplay = () => {
  if (
    currTodoId &&
    !todoList
      .getDisplayTodos()
      .map((todo) => todo.id)
      .includes(currTodoId)
  ) {
    submitTodoForm();
  }
};

const reset = () => {
  todoList.resetFilters();
  updateRender();
};

const updateRender = () => {
  display.render(
    todoList.getDisplayTodos(),
    todoList.getProjects(),
    todoList.getSort(),
    todoList.getFilters(),
    currTodoId,
  );
};

todoList.getFromStorage();
updateRender();
