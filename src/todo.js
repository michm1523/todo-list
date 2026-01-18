export default class Todo {
  constructor(name, text, deadline, project, important) {
    this.name = name;
    this.text = text;
    this.deadline = deadline;
    this.project = project;
    this.important = important;

    this.id = crypto.randomUUID();
    this.completed = false;
  }
}
