const todoList = document.querySelector(".todos");

const renderTodos = (todos) => {
  // Clear list
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Render new list
  todos.forEach((todo) => {
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo");

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

    // let editBtn = document.createElement("button");
    // editBtn.setAttribute("type", "button");
    // editBtn.classList.add("edit-todo");
    // let editIcon = document.createElement("ion-icon");
    // editIcon.setAttribute("name", "create-outline");
    // editBtn.appendChild(editIcon);
    // todoElement.appendChild(editBtn);

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

export { renderTodos };
