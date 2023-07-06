export class Todo {
  title: string;
  completed: boolean;
  id: string;

  constructor(title: string) {
    this.title = title;
    this.completed = false;
    this.id = crypto.randomUUID();
  }
}

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
    todoElement.className = `todo  ${todo.completed ? "completed" : ""}`;

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

export class Store {
  static getTodos() {
    let todos: Todo[];

    if (!localStorage.getItem("todos")) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos")!);
    }

    return todos;
  }

  static addTodo(todo: Todo) {
    const todos = this.getTodos();
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    UI.renderTodos();
  }

  static removeTodo(id: string) {
    const todos = this.getTodos();
    const filteredTodos = todos.filter((book) => book.id !== id);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));

    UI.renderTodos();
  }

  static updateTodo(id: string) {
    const todos = this.getTodos();
    const index = todos.findIndex((todo) => todo.id === id);

    todos[index].completed = !todos[index].completed;

    localStorage.setItem("todos", JSON.stringify(todos));

    UI.renderTodos();
  }
}
