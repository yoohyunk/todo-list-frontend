import { deleteTodo } from "@/actions/todo";
import { redirect } from "next/navigation";
import { LuTrash } from "react-icons/lu";

export const DeleteTodoButton = ({
  todoId,
  listId,
}: {
  todoId: string;
  listId: string;
}) => {
  const redirectToList = () => {
    deleteTodo(listId, todoId);
    redirect("/lists/" + listId);
  };
  return (
    <button
      onClick={redirectToList}
      className="border-solid p-2 flex flex-row items-center justify-end"
    >
      <LuTrash />
      Delete
    </button>
  );
};
