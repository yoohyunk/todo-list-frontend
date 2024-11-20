import { getTodosNotCompleted } from "@/actions/todo";
import { AddTodoForm } from "@/components/AddTodoForm";

import { TodoComponent } from "@/components/Todo";

import { ListSideBarDetails } from "@/components/ListSideBarDetails";
import { ListMenu } from "@/components/ListMenu";

export default async function page({
  params,
}: {
  params: Promise<{ listId: string }>;
}) {
  const { listId } = await params;
  const todos = await getTodosNotCompleted(listId);
  const todoCount = todos.Todos.length;

  return (
    <div className="w-full flex flex-col gap-4 p-2 justify-start sm:justify-between sm:flex-row">
      <div className="sm:basis-3/4 flex flex-col gap-4 p-4 w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-4">
            <h1 className="text-3xl font-semibold">{todos["List name"]}</h1>
            <div className="border-2 px-3 py-1 rounded-md">{todoCount}</div>
          </div>
          <ListMenu listId={listId} listName={todos["List name"]} />
        </div>
        <AddTodoForm />
        <TodoComponent
          listId={listId}
          todos={todos.Todos}
          listName={todos["List name"]}
        />
      </div>
      <div className="inline-block h-[1em] sm:h-full min-h-[1em] w-full sm:w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
      <div className="sm:basis-1/4">
        <ListSideBarDetails listID={listId} />
      </div>
    </div>
  );
}
