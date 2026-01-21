import { differenceInDays } from "date-fns";

let todos = [];
let projects = ["Default"];
let projectFilter = null;
let timeFilter = "all time";

const addTodo = (todo) => {
  todos.push(todo);
};

const delTodo = (id) => {
  todos = todos.filter((todo) => todo.id != id);
};

const getTodos = () => {
  return todos;
};

const getDisplayTodos = () => {
  let displayTodos = todos;
  if (projectFilter != null) {
    displayTodos = displayTodos.filter((todo) => todo.project == projectFilter);
  }

  const date = new Date();
  const today = new Date(date.toISOString().slice(0, 10));
  if (timeFilter == "today") {
    displayTodos = displayTodos.filter(
      (todo) => todo.deadline == date.toISOString().slice(0, 10),
    );
  } else if (timeFilter == "next 7 days") {
    displayTodos.filter((todo) => {
      const todoDeadlineDate = new Date(todo.deadline);
      return differenceInDays(todoDeadlineDate, today) <= 7;
    });
  }

  return displayTodos;
};

const resetFilters = () => {
  projectFilter = null;
  timeFilter = "all time";
};

const filterByProject = (project) => {
  projectFilter = project;
};

const filterByTime = (time) => {
  timeFilter = time.toLowerCase();
};

const addProject = (name) => {
  projects.push(name);
};

const getProjects = () => {
  return projects;
};

export {
  addTodo,
  delTodo,
  getDisplayTodos,
  addProject,
  getProjects,
  resetFilters,
  filterByProject,
  filterByTime,
};
