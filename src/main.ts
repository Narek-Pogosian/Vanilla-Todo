import { Store } from "./modules/store";
import { Todo } from "./modules/todo";
import { UI } from "./modules/ui";
import {
  getThemeFromLocalStorage,
  saveThemeInLocalStorage,
} from "./utils/localStorage";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.documentElement;
  const localTheme = getThemeFromLocalStorage();

  if (localTheme) {
    rootElement.classList.add(localTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    saveThemeInLocalStorage("dark");
    rootElement.className = "dark";
  }

  UI.renderTodos();
});

document.querySelector(".toggle-theme")!.addEventListener("click", () => {
  const rootElement = document.documentElement;

  if (rootElement.className === "dark") {
    rootElement.className = "";
    saveThemeInLocalStorage("light");
  } else {
    rootElement.className = "dark";
    saveThemeInLocalStorage("dark");
  }
});

const todoForm: HTMLFormElement = document.querySelector("#todo-form")!;
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput: HTMLInputElement = document.querySelector("#title-input")!;

  if (titleInput.value.trim()) {
    const newTodo = new Todo(titleInput.value);

    Store.addTodo(newTodo);

    todoForm.reset();
  }
});
