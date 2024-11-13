"use server";
import { Todo } from "@/lib/apiTypes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addTodo = async (
  listId: string,
  todoName: string,
  todoDescription: string
) => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth")?.value;

    if (!jwt) {
      return redirect("/auth");
    }

    const response = await fetch(
      // "https://flask-server-6y1b.onrender.com/lists",
      `http://127.0.0.1:5000/lists/${listId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify({
          list_id: listId,
          todo_item: todoName,
          description: todoDescription,
        }),
      }
    );

    return "todo created";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTodo = async (
  listId: string,
  todoId: string,
  status: boolean
) => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth")?.value;

    if (!jwt) {
      return redirect("/auth");
    }

    const response = await fetch(
      // "https://flask-server-6y1b.onrender.com/lists",
      `http://127.0.0.1:5000/lists/${listId}/${todoId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );
    return "status updated";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getAlltodos = async (
//   listId: string
// ): Promise<{
//   "List name": string;
//   Todos: Todo[];
// }> => {
//   try {
//     const cookieStore = await cookies();
//     const jwt = cookieStore.get("auth")?.value;
//     console.log("jwt", jwt);
//     if (!jwt) {
//       return { Todos: [] };
//     }

//     const response = await fetch(
//       // "https://flask-server-6y1b.onrender.com/lists",
//       `http://127.0.0.1:5000/lists/${listId}?status=all`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: jwt,
//         },
//       }
//     );
//     const data = await response.json();
//     if (!response.ok) {
//       return { Todos: [] };
//     }
//     console.log("data", data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching lists:", error);
//     return { Todos: [] };
//   }
// };

export const getTodosNotCompleted = async (
  listId: string
): Promise<{
  "List name": string;
  Todos: Todo[];
}> => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth")!.value;

    const response = await fetch(
      // "https://flask-server-6y1b.onrender.com/lists",
      `http://127.0.0.1:5000/lists/${listId}?status=open`,
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
      return { Todos: [], "List name": "" };
    }

    return data;
  } catch (error) {
    console.log("Error fetching lists:", error);
    return { Todos: [], "List name": "" };
  }
};
