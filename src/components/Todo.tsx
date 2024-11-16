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
import { DeleteTodoButton } from "./DeleteTodoButton";
import { EditTodoComponent } from "./EditTodoButton";
import { LuFileEdit } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";

export const TodoComponent = ({
  listId,
  todos,
}: {
  listId: string;
  todos: Todo[];
}) => {
  const [isTodoClicked, setIsTodoClicked] = useState(false);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  return (
    <div>
      <Accordion type="single" collapsible className="text-gray-500">
        {todos.map((todo) => (
          <AccordionItem value={todo.Id} key={todo.Id} className="">
            <div className="flex items-start gap-4 w-full">
              {editTodoId === todo.Id ? (
                <EditTodoComponent
                  listId={listId}
                  todoId={todo.Id}
                  initialName={todo.Todo}
                  initialDescription={todo.Description}
                  onSave={() => {
                    setEditTodoId(null);
                  }}
                />
              ) : (
                <div className=" w-full">
                  <AccordionTrigger className="flex ">
                    <div className="flex gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="">
                            <StatusCheckBox listId={listId} todoId={todo.Id} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mark it as completed</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {todo.Todo}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent
                    asChild
                    className="text-gray-500 text-xs flex flex-col w-full"
                  >
                    <div className="ml-8">{todo.Description}</div>
                    <div className="flex gap-1 items-center justify-end w-full ">
                      <button
                        onClick={() => setEditTodoId(todo.Id)}
                        className="border-solid p-2 rounded flex items-center"
                      >
                        <LuPenLine />
                        Edit
                      </button>
                      <DeleteTodoButton todoId={todo.Id} listId={listId} />
                    </div>
                  </AccordionContent>
                </div>
              )}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
