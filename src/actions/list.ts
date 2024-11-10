"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addList = async (listName: string) => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth")?.value;

    if (!jwt) {
      return redirect("/auth");
    }

    const response = await fetch(
      // "https://flask-server-6y1b.onrender.com/lists",
      "http://127.0.0.1:5000/lists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify({ list_name: listName }),
      }
    );

    return "list created";
  } catch (error) {
    console.log(error);
    throw error;
  }
};
