const display = (function () {
  const todoList = document.querySelector(".todos");
  const projectList = document.querySelector(".project-list");

  const render = (todos, projects, sort, filters, currTodoId) => {
    renderTodos(todos, currTodoId);
    renderProjects(projects);
    updateProjectOptions(projects);
    updateFilters(sort, filters);
  };

  const renderTodos = (todos, currTodoId) => {
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

      if (todo.id == currTodoId) {
        todoElement.classList.add("todo-selected");
      } else {
        todoElement.classList.remove("todo-selected");
      }

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

  // Add todo form display
  const todoNameInput = document.querySelector("#todo-name");
  const todoTextInput = document.querySelector("#todo-text");
  const todoDeadlineInput = document.querySelector("#deadline");
  const projectSelectInput = document.querySelector("#project-select");
  const importantInput = document.querySelector("#important-check");
  const formTitle = document.querySelector(".form-title");
  const projectLabel = document.querySelector(".project-label");

  const addTodoBtn = document.querySelector(".add-todo");
  const rightSideBar = document.querySelector(".right-sidebar");

  let sideBarOpen = false;

  // const toggleSideBar = (projects, todo) => {
  //   if (sideBarOpen) {
  //     closeSideBar();
  //   } else {
  //     openSideBar(projects, todo);
  //   }
  // };

  const openSideBar = (projects, todo) => {
    rightSideBar.classList.add("open");
    addTodoBtn.classList.add("hidden");
    if (todo) {
      projectSelectInput.style.display = "none";
      projectLabel.style.display = "none";

      todoNameInput.value = todo.name;
      todoTextInput.value = todo.text;
      todoDeadlineInput.value = todo.deadline;
      importantInput.checked = todo.important;
      formTitle.textContent = "Edit Todo";
    } else {
      projectSelectInput.style.display = "block";
      projectLabel.style.display = "none";
      formTitle.textContent = "New Todo";
    }
    sideBarOpen = true;
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
    sideBarOpen = false;
  };

  const getSideBarOpen = () => {
    return sideBarOpen;
  };

  const sortButton = document.querySelector(".sort-label");
  const filterImportantEl = document.querySelector("#filter-important");
  const filterCompleteEl = document.querySelector("#filter-complete");
  const filterIncompleteEl = document.querySelector("#filter-incomplete");

  const timeFilters = document.querySelectorAll(".tab");

  const updateFilters = (sort, filters) => {
    sortButton.innerHTML = `Sort by: ${sort} <ion-icon name="chevron-down-outline"></ion-icon>`;
    filterImportantEl.checked = filters.filterImportant;
    filterCompleteEl.checked = filters.filterComplete;
    filterIncompleteEl.checked = filters.filterIncomplete;

    timeFilters.forEach((tab) => {
      if (tab.textContent.toLowerCase() == filters.timeFilter) {
        tab.classList.add("tab-selected");
      } else {
        tab.classList.remove("tab-selected");
      }
    });

    for (const project of projectList.children) {
      if (project.textContent == filters.projectFilter) {
        project.classList.add("project-selected");
      } else {
        project.classList.remove("project-selected");
      }
    }
  };

  return { openSideBar, closeSideBar, getSideBarOpen, render };
})();

export default display;
