import TodoList from "@/components/TodoList";
import { Todo } from "@/types";
import Link from "next/link";

const TodosSSR = async () => {
  const resp = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });

  const todos = await resp.json();
  console.log(todos);

  return (
    <>
      <Link className="bg-blue-400 text-white p-3 rounded-md" href="/report">
        할일 정보 통계 보러 가기
      </Link>
      <div className="mt-5">
        <TodoList isCSR={false} todos={todos} isDone={true} />
        <TodoList isCSR={false} todos={todos} isDone={false} />
      </div>
    </>
  );
};

export default TodosSSR;
