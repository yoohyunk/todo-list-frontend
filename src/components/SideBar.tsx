import { signOut } from "@/actions/auth";
import { SignoutButton } from "@/components/SignoutButton";
import { AddListForm } from "@/components/AddListForm";
import { getAlllists } from "@/actions/list";
import { List } from "@/lib/apiTypes";
import { useState } from "react";
import { SearchLists } from "@/components/SearchList";

export default async function SideBar() {
  const lists = await getAlllists();

  return (
    <div className="flex flex-col items-start gap-4 p-4 border-2 h-full">
      <h1 className="text-2xl font-semibold">Lists</h1>
      <SearchLists initialLists={lists} />
      {lists.map((list) => (
        <div key={list.Id}>{list.Name}</div>
      ))}

      <AddListForm />
      <div className="mt-auto w-full">
        <SignoutButton />
      </div>
    </div>
  );
}
