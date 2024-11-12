import { cookies } from "next/headers";
import { Todo } from "@/lib/apiTypes";

export const getAlltodos = async (
  listId: string
): Promise<{
  Todos: Todo[];
}> => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth")?.value;
    console.log("jwt", jwt);
    if (!jwt) {
      return { Todos: [] };
    }

    const response = await fetch(
      // "https://flask-server-6y1b.onrender.com/lists",
      `http://127.0.0.1:5000/lists/${listId}?status=all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { Todos: [] };
    }
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    return { Todos: [] };
  }
};

export default async function page({ params }: { params: { listId: string } }) {
  const { listId } = await params;
  const todos = await getAlltodos(listId);
  console.log("todos", todos);
  return (
    <div>
      page
      {todos.Todos.map((todo) => (
        <div key={todo.Id}>{todo.Name}</div>
      ))}
    </div>
  );
}
