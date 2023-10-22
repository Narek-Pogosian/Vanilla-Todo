import {
  getTodosFromLocalStorage,
  saveTodosInLocalStorage,
} from "../utils/localStorage";
import { Todo } from "./todo";
import { UI } from "./ui";

export class Store {
  static getTodos() {
    return getTodosFromLocalStorage();
  }

  static addTodo(todo: Todo) {
    const todos = this.getTodos();
    todos.push(todo);

    saveTodosInLocalStorage(todos);

    UI.renderTodos();
  }

  static removeTodo(id: string) {
    const todos = this.getTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    saveTodosInLocalStorage(filteredTodos);

    UI.renderTodos();
  }

  static updateTodo(id: string) {
    const todos = this.getTodos();
    const index = todos.findIndex((todo) => todo.id === id);

    todos[index].completed = !todos[index].completed;

    saveTodosInLocalStorage(todos);

    UI.renderTodos();
  }
}
