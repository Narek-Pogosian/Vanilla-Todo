import { Store } from "./store";
import { Todo } from "./todo";

export class UI {
  constructor() {}

  static renderTodos() {
    const storedTodos = Store.getTodos();
    const list = document.querySelector("#todos-list");

    list!.innerHTML = "";

    storedTodos.forEach((todo) => {
      list?.appendChild(this.createTodo(todo));
    });
  }

  static createTodo(todo: Todo) {
    const todoElement: HTMLDivElement = document.createElement("div");
    todoElement.className = `todo ${todo.completed ? "completed" : ""}`;

    const div = document.createElement("div");
    div.innerHTML = `<h3 class="todo-title">${todo.title}</h3>`;

    const tag = document.createElement("span");
    tag.className = `tag ${todo.completed ? "completed-tag" : "todo-tag"}`;
    tag.textContent = todo.completed ? "Completed" : "Todo";

    tag.addEventListener("click", () => {
      Store.updateTodo(todo.id);
    });

    div.appendChild(tag);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-delete";
    deleteButton.innerHTML = '<img src="trash.svg"/>';

    deleteButton.addEventListener("click", () => {
      Store.removeTodo(todo.id);
    });

    todoElement.appendChild(div);
    todoElement.appendChild(deleteButton);

    return todoElement;
  }
}
