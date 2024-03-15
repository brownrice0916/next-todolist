"use client";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import { useTodos } from "../hooks/useTodos";

const ToDosCSR = () => {
  const { todos, isLoading, error, updateTodo, deleteTodo } = useTodos();

  console.log("todos", todos);
  const handleDeleteTodo = (todoId: string) => {
    deleteTodo(todoId);
  };

  const handleToggleTodo = (todoId: string) => {
    updateTodo(todoId);
  };

  if (isLoading) {
    <div>로딩중</div>;
  }
  if (!todos) {
    <div>값없음</div>;
  }
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (isError) {
  //     return <div>Error</div>;
  //   }

  //   console.log("todos", todos);

  return (
    <div>
      <h1 className=" text-2xl mb-5">To Do List</h1>
      <section className="border-solid border-2 border-gray-400 rounded-md p-5">
        <h2 className="text-xl mb-3">새로운 투두 추가하기</h2>
        <TodoForm />
        <TodoList
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
          todos={todos}
          isDone={true}
          isCSR={true}
        />
        <TodoList
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
          todos={todos}
          isDone={false}
          isCSR={true}
        />
      </section>
    </div>
  );
};

export default ToDosCSR;
