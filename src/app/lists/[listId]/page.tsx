import { getTodosNotCompleted, updateTodo } from "@/actions/todo";
import { AddTodoForm } from "@/components/AddTodoForm";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusCheckBox } from "@/components/StatusCheckBox";
import { TodoComponent } from "@/components/Todo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// updateTodo = async (
//     listId: string,
//     todoId: string,
//     status: string

export default async function page({ params }: { params: { listId: string } }) {
  const { listId } = await params;
  const todos = await getTodosNotCompleted(listId);
  const todoCount = todos.Todos.length;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-4">
          <h1 className="text-3xl font-semibold">{todos["List name"]}</h1>
          <div className="border-2 px-3 py-1 rounded-md">{todoCount}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-2xl">...</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AddTodoForm />
      <TodoComponent listId={listId} todos={todos.Todos} />
    </div>
  );
}
