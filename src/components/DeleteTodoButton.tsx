import { deleteTodo } from "@/actions/todo";
import { redirect } from "next/navigation";
import { LuTrash } from "react-icons/lu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DeleteTodoButton = ({
  todoId,
  listId,
  todoName,
  listName,
}: {
  todoId: string;
  listId: string;
  todoName: string;
  listName: string;
}) => {
  const redirectToList = () => {
    deleteTodo(listId, todoId);
    redirect("/lists/" + listId);
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="border-solid p-2 flex flex-row items-center justify-end">
          <LuTrash />
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete the task: &quot;{todoName}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting this task will permanently
              remove it from the list: &quot;{listName}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={redirectToList}
              className="bg-red-500 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
