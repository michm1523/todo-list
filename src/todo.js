export default class Todo {
  #id;

  constructor(todoName, todoText, deadline, project, important) {
    this.todoName = todoName;
    this.todoText = todoText;
    this.deadline = deadline;
    this.project = project;
    this.important = important;

    this.#id = crypto.randomUUID();
    this.completed = false;
  }
}
