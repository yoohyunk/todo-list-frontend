"use client";
import { getTodosNotCompleted } from "@/actions/todo";
import { useState } from "react";
import { StatusCheckBox } from "./StatusCheckBox";
import { Todo } from "@/lib/apiTypes";
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

export const TodoComponent = ({
  listId,
  todos,
}: {
  listId: string;
  todos: Todo[];
}) => {
  const [isTodoClicked, setIsTodoClicked] = useState(false);
  return (
    <div>
      <Accordion type="single" collapsible>
        {todos.map((todo) => (
          <AccordionItem value={todo.Id} key={todo.Id}>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <StatusCheckBox listId={listId} todoId={todo.Id} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark it as completed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <AccordionTrigger>{todo.Todo} </AccordionTrigger>
            </div>
            <AccordionContent className="text-gray-500 text-xs ml-8">
              {todo.Description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
