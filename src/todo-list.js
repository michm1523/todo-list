let todos = [];
let displayTodos = [];

const addTodo = (todo) => {
  todos.push(todo);
};

const getDisplayTodos = () => {
  return todos;
};

export { addTodo, getDisplayTodos };
