"use client";
import Link from "next/link";
import { List } from "../lib/apiTypes";
import { AddListForm } from "./AddListForm";
import { SearchLists } from "./SearchList";
import { SignoutButton } from "./SignoutButton";
import { useState } from "react";
import { LuList } from "react-icons/lu";
import { LuPanelLeftClose } from "react-icons/lu";

interface SidebarContentProps {
  lists: List[];
}

export const SidebarContent = ({ lists }: SidebarContentProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div
        className={`h-full bg-white transform fixed transition-transform duration-400  ${
          isSidebarOpen ? "" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 w-56 z-40`}
      >
        <div className={`flex flex-col items-start gap-4 p-4 border-2 h-full`}>
          <div className="flex flex-row justify-between items-center w-full ">
            <h1 className="text-2xl font-semibold">Lists</h1>
            <LuPanelLeftClose
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl md:hidden"
            />
          </div>
          <SearchLists initialLists={lists} />

          {lists &&
            lists.map((list) => (
              <div
                key={list.Id}
                onClick={() => setIsSidebarOpen(false)}
                className="flex flex-row justify-between items-center w-full gap-4"
              >
                <Link href={`/lists/${list.Id}`} className="text-s">
                  {list.Name}
                </Link>
                <div className="border-2 px-2 py-1 rounded-md text-xs">
                  {list.TodoCount}
                </div>
              </div>
            ))}
          <div className="w-full">
            <AddListForm />
          </div>
          <div className="mt-auto w-full">
            <SignoutButton />
          </div>
        </div>
      </div>

      <div
        onClick={() => setIsSidebarOpen(true)}
        className="h-full bg-black flex items-center md:hidden"
      >
        <LuList className="text-white" />
      </div>
    </>
  );
};
