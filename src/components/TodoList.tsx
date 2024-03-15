import { useTodos } from "@/app/hooks/useTodos";
import { Todo } from "@/types";
import React, { PropsWithChildren } from "react";
interface TodoItemProps {
  isDone: boolean;
  todos: Todo[] | undefined;
  handleToggleTodo?: (todoId: string) => void;
  handleDeleteTodo?: (todoId: string) => void;
  isCSR: boolean;
}
const TodoList = ({
  todos,
  isDone,
  isCSR,
  handleDeleteTodo,
  handleToggleTodo,
}: PropsWithChildren<TodoItemProps>) => {
  return (
    <>
      <h1 className="text-lg font-bold mb-4">
        {isDone ? "완료된 일정" : "진행중인 일정"}
      </h1>
      {todos &&
        todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo: Todo) => {
            return (
              <div
                key={todo.id}
                className="bg-blue-100 border border-blue-400  p-8 m-2 rounded"
              >
                <h2 className="text-xl font-bold">{todo.title}</h2>
                <p>{todo.content}</p>
                {isCSR && (
                  <button
                    className="btn btn-outline btn-primary border-solid border-2 bg-gray-500 text-white rounded-md py-1 px-2"
                    onClick={() => handleToggleTodo!(todo.id)}
                  >
                    {todo.isDone ? "취소" : "완료"}
                  </button>
                )}
                {isCSR && (
                  <button
                    className="btn btn-outline border-solid border-2 bg-gray-500  text-white rounded-md py-1 px-2 ml-2"
                    onClick={() => handleDeleteTodo!(todo.id)}
                  >
                    삭제
                  </button>
                )}
              </div>
            );
          })}
    </>
  );
};

export default TodoList;
