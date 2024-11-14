"use client";
import { updateTodo } from "@/actions/todo";
import { LuCheck } from "react-icons/lu";

interface UndoStatusBoxProps {
  listId: string;
  todoId: string;
}

export const UndoStatusBox = ({ listId, todoId }: UndoStatusBoxProps) => {
  return (
    <LuCheck onClick={async () => await updateTodo(listId, todoId, false)} />
  );
};
