import { NewTodo, Todo } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: { revalidate: 5 },
  });
  const todos = await response.json();

  if (!todos) {
    return new Response("todos not found", { status: 404 });
  }

  return Response.json({ todos });
}

export async function POST(request: Request) {
  const { title, contents } = await request.json();

  const response = await fetch(`http://localhost:4000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents, isDone: false }),
  });
  const todo = await response.json();

  return Response.json({ todo });
}

export async function PATCH(todo: Todo) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "todos/" + todo.id,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDone: !todo.isDone,
      }),
    }
  );
  const data = await res.json();

  return data;
}

export async function DELETE(todo: Todo) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "todos/" + todo.id,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();

  return data;
}
