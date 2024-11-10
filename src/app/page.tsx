import { signOut } from "@/actions/auth";
import { SignoutButton } from "@/components/SignoutButton";
import { AddListForm } from "@/components/AddListForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAlllists = async () => {
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
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};

export default async function Home() {
  const lists = await getAlllists();

  return (
    <div>
      <h1>Home</h1>
      {lists.map((list) => (
        <div key={list.Id}>{list.Name}</div>
      ))}
      <SignoutButton />
      <AddListForm />
    </div>
  );
}
