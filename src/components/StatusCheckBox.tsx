"use client";
import { updateTodo } from "@/actions/todo";
import { Checkbox } from "@/components/ui/checkbox";

interface StatusCheckBoxProps {
  listId: string;
  todoId: string;
}

export const StatusCheckBox = ({ listId, todoId }: StatusCheckBoxProps) => {
  return (
    <Checkbox
      onClick={async () => await updateTodo(listId, todoId, true)}
      // asChild
    />
  );
};
