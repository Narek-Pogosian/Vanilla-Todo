import { Todo } from "../modules/todo";

const TODOS_KEY = "todos";
const THEME_KEY = "todos-theme";

type StorageKey = typeof TODOS_KEY | typeof THEME_KEY;

function getFromLocalStorage(key: StorageKey) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : null;
}

function saveToLocalStorage(key: StorageKey, data: any) {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(key, stringifiedData);
}

/**
 * * TODOS
 */
export function getTodosFromLocalStorage(): Todo[] {
  return getFromLocalStorage("todos") ?? [];
}

export function saveTodosInLocalStorage(todo: Todo[]) {
  saveToLocalStorage("todos", todo);
}

/**
 * * THEME
 */
export type Theme = "light" | "dark";

export function getThemeFromLocalStorage(): Theme | null {
  return getFromLocalStorage("todos-theme");
}

export function saveThemeInLocalStorage(theme: Theme) {
  return saveToLocalStorage("todos-theme", theme);
}
