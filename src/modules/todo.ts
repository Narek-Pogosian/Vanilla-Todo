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
