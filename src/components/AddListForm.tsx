"use client";
import { Input } from "@/components/ui/input";
import { addList } from "@/actions/list";
import { Button } from "./ui/button";

export const AddListForm = () => {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        try {
          await addList(
            (target.elements.namedItem("listName") as HTMLInputElement).value
          );
        } catch (error) {
          console.log("Error adding list", error);
        }
      }}
    >
      <Input type="text" id="listName" placeholder="List name" />
      <Button type="submit">Add List</Button>
    </form>
  );
};
