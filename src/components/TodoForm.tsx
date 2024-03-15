import { useTodos } from "@/app/hooks/useTodos";
import { NewTodo } from "@/types";
import React from "react";

const TodoForm = () => {
  const { addTodo } = useTodos();
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as HTMLFormElement).elements.namedItem(
      "title"
    ) as HTMLInputElement;
    const content = (e.target as HTMLFormElement).elements.namedItem(
      "content"
    ) as HTMLInputElement;

    if (!title.value || !content.value) return;

    const newTodo: NewTodo = {
      title: title.value,
      content: content.value,
      isDone: false,
    };
    addTodo(newTodo);
    title.value = "";
    content.value = "";
  };
  return (
    <form
      className="flex items-center"
      onSubmit={(e) => {
        handleAddTodo(e);
      }}
    >
      <div className="mr-5">
        <label htmlFor="title">Title : </label>
        <input
          name="title"
          className="border-solid border-2 border-gray-400 rounded-md"
          id="title"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="contents">Contents : </label>
        <input
          name="content"
          className="border-solid border-2 border-gray-400 rounded-md"
          id="contents"
          type="text"
        />
      </div>
      <button
        className="ml-5 bg-blue-400 text-white p-3 rounded-md"
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
