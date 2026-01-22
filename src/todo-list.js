import { differenceInDays } from "date-fns";

class TodoList {
  constructor() {
    this.todos = [];
    this.projects = ["Default"];
    this.projectFilter = null;
    this.timeFilter = "all time";
  }

  addTodo = (todo) => {
    this.todos.push(todo);
  };

  delTodo = (id) => {
    this.todos = this.todos.filter((todo) => todo.id != id);
  };

  toggleTodoComplete = (id) => {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completed = !todo.completed;
        return;
      }
    }
  };

  getDisplayTodos = () => {
    let displayTodos = this.todos;
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
        return differenceInDays(todoDeadlineDate, today) <= 7 && todo.deadline;
      });
    }

    return displayTodos;
  };

  resetFilters = () => {
    this.projectFilter = null;
    this.timeFilter = "all time";
  };

  filterByProject = (project) => {
    this.projectFilter = project;
  };

  filterByTime = (time) => {
    this.timeFilter = time.toLowerCase();
  };

  addProject = (name) => {
    this.projects.push(name);
  };

  delProject = (name) => {
    this.projects = this.projects.filter((project) => project != name);
    this.todos = this.todos.filter((todo) => todo.project != name);
  };

  getProjects = () => {
    return this.projects;
  };
}

export { TodoList };
