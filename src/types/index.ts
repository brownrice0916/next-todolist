export interface Todo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

export interface NewTodo {
  title: string;
  content: string;
  isDone: boolean;
}
