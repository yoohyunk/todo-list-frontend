"use client";

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

import { LuPenLine } from "react-icons/lu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TodoComponent = ({
  listId,
  todos,
  listName,
}: {
  listId: string;
  todos: Todo[];
  listName: string;
}) => {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  return (
    <div>
      <Accordion type="single" collapsible className="text-black">
        {todos.map((todo) => (
          <AccordionItem value={todo.Id} key={todo.Id} className="">
            <div className="flex items-start gap-4 w-full">
              {editTodoId === todo.Id ? (
                <EditTodoComponent
                  listId={listId}
                  todoId={todo.Id}
                  todoCollaborator={todo.Collaborators}
                  todoOwner={todo.Owner}
                  initialName={todo.Todo}
                  initialDescription={todo.Description}
                  onSave={() => {
                    setEditTodoId(null);
                  }}
                  onCancel={() => {
                    setEditTodoId(null);
                  }}
                />
              ) : (
                <div className=" w-full">
                  <AccordionTrigger className="w-full flex justify-between">
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
                    <div className="flex gap-2 ml-auto">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="border-2">
                          {todo.Owner.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex -space-x-4">
                        {todo.Collaborators?.map((collaborator, index) => (
                          <Avatar
                            key={index}
                            className="relative z-[1] border-2 border-white w-7 h-7"
                            style={{
                              zIndex: todo.Collaborators.length - index,
                            }}
                          >
                            <AvatarFallback className="border-2">
                              {collaborator.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent
                    key={todo.Id}
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
                      <DeleteTodoButton
                        todoId={todo.Id}
                        listId={listId}
                        todoName={todo.Todo}
                        listName={listName}
                      />
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
