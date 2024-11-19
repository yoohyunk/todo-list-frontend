"use server";
import { Todo } from "@/lib/apiTypes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { request } from "@/utils/request";

export const addTodo = async (
  listId: string,
  todoName: string,
  todoDescription: string
) => {
  try {
    const response = await request(`/lists/${listId}`, "POST", {
      todo_item: todoName,
      description: todoDescription,
    });
    revalidatePath(`/lists/${listId}`, "page");
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
    const response = await request(`/lists/${listId}/${todoId}`, "PATCH", {
      status: status,
    });
    revalidatePath(`/lists/${listId}`, "page");
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
//       `https://flask-server-6y1b.onrender.com/lists/${listId}?status=all`,
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
    const response = await request(`/lists/${listId}?status=open`, "GET");
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
export const getTodosCompleted = async (
  listId: string
): Promise<{
  "List name": string;
  Todos: Todo[];
}> => {
  try {
    const response = await request(`/lists/${listId}?status=completed`, "GET");
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

export const editTodoName = async (
  listId: string,
  todoId: string,
  todoName: string
) => {
  try {
    const response = await request(`/lists/${listId}/${todoId}/name`, "PATCH", {
      new_name: todoName,
    });
    revalidatePath(`/lists/${listId}`, "page");
    return "todo updated";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editTodoDescription = async (
  listId: string,
  todoId: string,
  todoDescription: string
) => {
  try {
    const response = await request(
      `/lists/${listId}/${todoId}/description`,
      "PATCH",
      {
        new_description: todoDescription,
      }
    );
    revalidatePath(`/lists/${listId}`, "page");
    return "todo updated";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTodo = async (listId: string, todoId: string) => {
  try {
    const response = await request(`/lists/${listId}/${todoId}`, "DELETE");
    return `/lists/${listId}`;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
