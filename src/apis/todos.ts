import { NewTodo } from "@/types";
import axios from "axios";

export const todosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getTodos = async () => {
  const response = await todosAPI.get("/todos");
  return response.data;
};

export const addTodo = async (newTodo: NewTodo) => {
  await todosAPI.post("/todos", newTodo);
};

export const deleteTodo = async (id: string) => {
  const response = await todosAPI.delete(`/todos/${id}`);
  return response.data;
};

export const editTodo = async (
  id: number,
  updatedTodo: { title: string; content: string }
) => {
  const response = await todosAPI.put(`/todos/${id}`, updatedTodo);
  return response.data;
};

export const toggleTodo = async (todoId: string) => {
  // 서버로부터 해당 todo의 정보를 가져옵니다.
  const todoResponse = await todosAPI.get(`/todos/${todoId}`);
  const todo = todoResponse.data;

  // 현재 선택 상태의 반대로 설정하여 서버에 전달합니다.
  const response = await todosAPI.patch(`/todos/${todoId}`, {
    isDone: !todo.isDone,
  });

  return response.data;
};
