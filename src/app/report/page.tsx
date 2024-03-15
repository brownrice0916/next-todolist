import { Todo } from "@/types";

const Report = async () => {
  const resp = await fetch("http://localhost:4000/todos", {
    next: { revalidate: 5 },
  });

  const todos = await resp.json();
  console.log(todos);

  return (
    <div>
      <div>총 할일 개수 : {todos.length}</div>
      <div>
        완료한 할 일 :{todos.filter((todo: Todo) => todo.isDone).length}{" "}
      </div>
      <div>
        헤야 할 일 : {todos.filter((todo: Todo) => !todo.isDone).length}
      </div>
      {/* {todos.map((todo: Todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))} */}
    </div>
  );
};

export default Report;
