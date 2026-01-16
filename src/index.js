import "./styles.css";
import Todo from "./todo.js";

const addTodoBtn = document.querySelector(".add-todo");
const rightSideBar = document.querySelector(".right-sidebar");
const formCancelBtn = document.querySelector(".form-cancel");

addTodoBtn.addEventListener("click", (e) => {
  rightSideBar.classList.add("open");
  addTodoBtn.classList.add("hidden");
});

formCancelBtn.addEventListener("click", (e) => {
  rightSideBar.classList.remove("open");
  addTodoBtn.classList.remove("hidden");
});
