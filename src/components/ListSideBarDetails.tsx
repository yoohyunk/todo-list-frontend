import { getTodosCompleted, getTodosNotCompleted } from "@/actions/todo";
import { Progress } from "@/components/ui/progress";
import { UndoStatusBox } from "./UndoStatusButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ListSideBarDetails = async ({ listID }: { listID: string }) => {
  const { Todos: completedTodos } = await getTodosCompleted(listID);
  const { Todos: notCompletedTodos } = await getTodosNotCompleted(listID);
  const totalTodos = completedTodos.length + notCompletedTodos.length;

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Progress</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Progress value={(completedTodos.length / totalTodos) * 100} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{((completedTodos.length / totalTodos) * 100).toFixed(2)}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="text-xs  ">
          <div className=" text-left text-gray-500">
            {completedTodos.length} out of {totalTodos} is completed!
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Completed Tasks</h2>
        <Accordion type="single" collapsible className="text-gray-500">
          {completedTodos.map((todo) => (
            <AccordionItem value={todo.Id} key={todo.Id}>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <UndoStatusBox listId={listID} todoId={todo.Id} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mark it as incompleted</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <AccordionTrigger className="text-sm">
                  {todo.Todo}{" "}
                </AccordionTrigger>
              </div>
              <AccordionContent className="text-gray-500 text-xs ml-6">
                {todo.Description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
