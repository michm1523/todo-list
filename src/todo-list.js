import { differenceInDays, compareAsc } from "date-fns";
import Todo from "./todo.js";

class TodoList {
  constructor() {
    this.todos = [];
    this.projects = ["Default"];
    this.projectFilter = null;
    this.timeFilter = "all time";
    this.filterImportant = false;
    this.filterComplete = true;
    this.filterIncomplete = true;
    this.sort = "creation date";
  }

  addTodo = (todo) => {
    this.todos.push(todo);
    this.saveToStorage();
  };

  delTodo = (id) => {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.saveToStorage();
  };

  toggleTodoComplete = (id) => {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completed = !todo.completed;
        return;
      }
    }
    this.saveToStorage();
  };

  editTodo = (id, details) => {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.update(details);
      }
    }
    this.saveToStorage();
  };

  getDisplayTodos = () => {
    let displayTodos = [...this.todos];
    if (this.projectFilter != null) {
      displayTodos = displayTodos.filter(
        (todo) => todo.project == this.projectFilter,
      );
    }

    const date = new Date();
    const today = new Date(date.toISOString().slice(0, 10));
    if (this.timeFilter == "today") {
      displayTodos = displayTodos.filter(
        (todo) =>
          todo.deadline == date.toISOString().slice(0, 10) && todo.deadline,
      );
    } else if (this.timeFilter == "next 7 days") {
      displayTodos = displayTodos.filter((todo) => {
        const todoDeadlineDate = new Date(todo.deadline);
        return (
          differenceInDays(todoDeadlineDate, today) <= 7 &&
          differenceInDays(todoDeadlineDate, today) >= 0 &&
          todo.deadline
        );
      });
    }

    if (this.sort == "deadline") {
      displayTodos.sort((todo1, todo2) => {
        return compareAsc(new Date(todo1.deadline), new Date(todo2.deadline));
      });
    }

    if (this.filterImportant) {
      displayTodos = displayTodos.filter((todo) => todo.important);
    }

    displayTodos = displayTodos.filter((todo) => {
      return (
        (this.filterComplete && todo.completed) ||
        (this.filterIncomplete && !todo.completed)
      );
    });

    return displayTodos;
  };

  getTodoById = (id) => {
    for (let todo of this.todos) {
      if (todo.id == id) {
        return todo;
      }
    }

    return null;
  };

  resetFilters = () => {
    this.projectFilter = null;
    this.timeFilter = "all time";
    this.sort = "creation date";
    this.filterImportant = false;
    this.filterComplete = true;
    this.filterIncomplete = true;
  };

  filterByProject = (project) => {
    this.projectFilter = project;
  };

  filterByTime = (time) => {
    this.timeFilter = time.toLowerCase();
  };

  filterByStatus = (important, complete, incomplete) => {
    this.filterImportant = important;
    this.filterComplete = complete;
    this.filterIncomplete = incomplete;
  };

  changeSort = (sort) => {
    this.sort = sort;
  };

  getSort = () => {
    return this.sort;
  };

  getFilters = () => {
    return {
      timeFilter: this.timeFilter,
      projectFilter: this.projectFilter,
      filterImportant: this.filterImportant,
      filterComplete: this.filterComplete,
      filterIncomplete: this.filterIncomplete,
    };
  };

  addProject = (name) => {
    this.projects.push(name);
    this.saveToStorage();
  };

  delProject = (name) => {
    this.projects = this.projects.filter((project) => project != name);
    this.todos = this.todos.filter((todo) => todo.project != name);
    this.saveToStorage();
  };

  getProjects = () => {
    return this.projects;
  };

  saveToStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    localStorage.setItem("projects", JSON.stringify(this.projects));
    console.log(JSON.parse(localStorage.getItem("projects")));
  };

  getFromStorage = () => {
    for (const todo of JSON.parse(localStorage.getItem("todos"))) {
      // Can't use add todo function since it will saveToStorage
      this.todos.push(
        new Todo(
          todo.name,
          todo.text,
          todo.deadline,
          todo.project,
          todo.important,
          todo.completed,
        ),
      );
    }

    this.projects = JSON.parse(localStorage.getItem("projects"));
    if (!this.projects) {
      console.log(this.projects);
      this.projects = ["Default"];
    }
  };
}

export default TodoList;
