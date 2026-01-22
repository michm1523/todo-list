const todoList = document.querySelector(".todos");
const projectList = document.querySelector(".project-list");

const renderTodos = (todos) => {
  // Clear list
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Render new list
  todos.forEach((todo) => {
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo");
    todoElement.setAttribute("data-id", todo.id);

    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.classList.add("todo-check");
    if (todo.completed) {
      check.checked = true;
    }
    todoElement.appendChild(check);

    let todoName = document.createElement("p");
    todoName.classList.add("todo-name");
    todoName.textContent = todo.name;
    todoElement.appendChild(todoName);

    let todoDeadline = document.createElement("p");
    todoDeadline.textContent = todo.deadline;
    todoElement.appendChild(todoDeadline);

    let todoProject = document.createElement("p");
    if (todo.project != "Default") {
      todoProject.textContent = todo.project;
    }
    todoElement.appendChild(todoProject);

    if (todo.important) {
      let importantTag = document.createElement("p");
      importantTag.textContent = "Important";
      importantTag.classList.add("important-tag");
      todoElement.appendChild(importantTag);
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("del-todo");
    let deleteIcon = document.createElement("ion-icon");
    deleteIcon.setAttribute("name", "trash-outline");
    deleteBtn.appendChild(deleteIcon);
    todoElement.appendChild(deleteBtn);

    todoList.appendChild(todoElement);
  });
};

const renderProjects = (projects) => {
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }

  projects.forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.classList.add("project");

    const projectBtn = document.createElement("button");
    projectBtn.setAttribute("type", "button");
    projectBtn.classList.add("project-btn");
    projectBtn.textContent = project;
    projectElement.appendChild(projectBtn);

    if (project != "Default") {
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.classList.add("delete-project-btn");

      const deleteIcon = document.createElement("ion-icon");
      deleteIcon.setAttribute("name", "trash-outline");
      deleteBtn.appendChild(deleteIcon);

      projectElement.appendChild(deleteBtn);
    }

    projectList.appendChild(projectElement);
  });
};

// Form submission
const addTodoForm = document.querySelector(".add-form");
const todoNameInput = document.querySelector("#todo-name");
const todoTextInput = document.querySelector("#todo-text");
const todoDeadlineInput = document.querySelector("#deadline");
const projectSelectInput = document.querySelector("#project-select");
const importantInput = document.querySelector("#important-check");

const addTodoBtn = document.querySelector(".add-todo");
const rightSideBar = document.querySelector(".right-sidebar");
const formCancelBtn = document.querySelector(".form-cancel");

const openSideBar = (projects) => {
  rightSideBar.classList.add("open");
  addTodoBtn.classList.add("hidden");
  updateProjectOptions(projects);
};

const updateProjectOptions = (projects) => {
  while (projectSelectInput.firstChild) {
    projectSelectInput.removeChild(projectSelectInput.firstChild);
  }
  projects.forEach((project) => {
    const projectOption = document.createElement("option");

    if (project === "Default") {
      projectOption.setAttribute("default", "");
    }

    projectOption.setAttribute("value", project);
    projectOption.textContent = project;
    projectSelectInput.appendChild(projectOption);
  });
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

export {
  renderTodos,
  renderProjects,
  openSideBar,
  closeSideBar,
  updateProjectOptions,
};
