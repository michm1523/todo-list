let todos = [];
let displayTodos = [];
let projects = ["Default"];

const addTodo = (todo) => {
  todos.push(todo);
};

const delTodo = (id) => {
  todos = todos.filter((todo) => todo.id != id);
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

export { addTodo, delTodo, getDisplayTodos, addProject, getProjects };
