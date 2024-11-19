"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { List } from "@/lib/apiTypes";
import { Collaborator } from "@/lib/apiTypes";
import { revalidatePath } from "next/cache";
import { request } from "@/utils/request";

// export const addList = async (listName: string) => {
//   try {
//     const cookieStore = await cookies();
//     const jwt = cookieStore.get("auth")?.value;

//     if (!jwt) {
//       return redirect("/auth");
//     }

//     const response = await fetch(
//       // "https://flask-server-6y1b.onrender.com/lists",
//       "http://127.0.0.1:5000/lists",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: jwt,
//         },
//         body: JSON.stringify({ list_name: listName }),
//       }
//     );
//     const data = await response.json();
//     console.log("this is", data);
//     return redirect(`/lists/${data}`);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const addList = async (listName: string) => {
  try {
    if (!listName) {
      throw new Error("List name is required");
    }

    const response = await request("/lists", "POST", { list_name: listName });

    if (!response.ok) {
      throw new Error(`Failed to add list: ${response.statusText}`);
    }

    const data = await response.json();
    return redirect(`/lists/${data}`);
  } catch (error) {
    console.log("Error adding list:", error);
    throw error;
  }
};

export const getAlllists = async (): Promise<List[]> => {
  try {
    const response = await request("/lists", "GET");
    const data = await response.json();
    if (!response.ok) {
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};

export const DeleteList = async (listId: string) => {
  try {
    const response = await request(`/lists/${listId}`, "DELETE");

    return redirect("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changeListName = async (listId: string, listName: string) => {
  try {
    const response = await request(`/lists/${listId}`, "PATCH", {
      new_name: listName,
    });
    revalidatePath(`/lists/${listId}`, "page");
    return "list name updated";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface CollaboratorResponse {
  Collaborator: string[];
}

export const getCollaborators = async (
  listId: string
): Promise<CollaboratorResponse> => {
  try {
    const response = await request(`/lists/${listId}/collaborator`, "GET");
    const data = await response.json();
    if (!response.ok) {
      return { Collaborator: [] };
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface AdminsResponse {
  Admins: string[];
}

export const getAdmin = async (listId: string): Promise<AdminsResponse> => {
  try {
    const response = await request(`/lists/${listId}/admin`, "GET");
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addCollaborator = async (listId: string, collaborator: string) => {
  try {
    const response = await request(`/lists/${listId}/collaborator`, "POST", {
      collaborator_id: collaborator,
    });
    console.log(collaborator);
    return redirect(`/lists/${listId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addAdmin = async (listId: string, newAdmin: string) => {
  try {
    const response = await request(`/lists/${listId}/admin`, "POST", {
      new_admin_id: newAdmin,
    });
    return redirect(`/lists/${listId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
