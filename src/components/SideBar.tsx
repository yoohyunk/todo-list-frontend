import { signOut } from "@/actions/auth";
import { SignoutButton } from "@/components/SignoutButton";
import { AddListForm } from "@/components/AddListForm";
import { getAlllists } from "@/actions/list";
import { List } from "@/lib/apiTypes";
import { useState } from "react";
import { SearchLists } from "@/components/SearchList";
import Link from "next/link";
import { SidebarContent } from "./SidBarContent";

export default async function SideBar() {
  const lists = await getAlllists();

  return (
    <div className="">
      <SidebarContent lists={lists} />
    </div>
  );
}
