import { Store, Todo, UI } from "./classes";
// import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  if (
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    localStorage.getItem("theme") === "dark"
  ) {
    document.documentElement.classList.add("dark");
  }

  UI.renderTodos();
});

document.querySelector(".toggle-theme")!.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const theme = localStorage.getItem("theme");

  if (!theme || theme === "light") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const todoForm: HTMLFormElement = document.querySelector("#todo-form")!;
todoForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput: HTMLInputElement = document.querySelector("#title-input")!;

  if (titleInput.value.trim()) {
    const newTodo = new Todo(titleInput.value);

    Store.addTodo(newTodo);

    todoForm.reset();
  }
});
