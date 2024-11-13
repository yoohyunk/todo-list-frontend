"use client";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/actions/todo";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export const AddTodoForm = () => {
  const params = useParams();
  const listId = Array.isArray(params.listId)
    ? params.listId[0]
    : params.listId || "";
  const [istodoNameClicked, setTodoNameClicked] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        try {
          await addTodo(
            listId,
            (target.elements.namedItem("todoName") as HTMLInputElement).value,
            (target.elements.namedItem("todoDescription") as HTMLInputElement)
              .value
          );
        } catch (error) {
          console.log("Error adding list", error);
        }
      }}
      className="flex flex-col gap-1"
    >
      <div className="flex flex-row gap-1">
        <Input
          type="text"
          id="todoName"
          placeholder="Task name"
          onClick={() => setTodoNameClicked(true)}
          className=""
        />
        <Button type="submit" className="basis-4">
          +
        </Button>
      </div>
      {istodoNameClicked && (
        <Textarea id="todoDescription" placeholder="Description" className="" />
      )}
    </form>
  );
};
