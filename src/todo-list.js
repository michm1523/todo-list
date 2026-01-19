let todos = [];
let displayTodos = [];
let projects = ["Default"];

const addTodo = (todo) => {
  todos.push(todo);
};

const getDisplayTodos = () => {
  return todos;
};

const addProject = (name) => {
  projects.push(name);
};

const getProjects = () => {
  return projects;
};

export { addTodo, getDisplayTodos, addProject, getProjects };
