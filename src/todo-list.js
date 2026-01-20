let todos = [];
let projects = ["Default"];
let projectFilter = null;

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

  return displayTodos;
};

const resetFilters = () => {
  projectFilter = null;
};

const filterByProject = (project) => {
  projectFilter = project;
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
};
