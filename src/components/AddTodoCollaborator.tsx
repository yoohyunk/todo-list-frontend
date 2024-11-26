"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllMembers } from "@/actions/list";
import { addCollaborator, removeCollaborator } from "@/actions/todo";

interface AddCollaboratorProps {
  listId: string;
  todoId: string;
  collaborators: string[];
  owner: string;
  onSubmitSuccess: () => void;
}

export const AddTodoCollaborator = ({
  listId,
  todoId,
  collaborators = [],
  owner,
  onSubmitSuccess,
}: AddCollaboratorProps) => {
  const [members, setMembers] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>();

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, open]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers(listId);
        setMembers(data.Members || []);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, [listId]);

  const toggleCollaborator = async (member: string) => {
    try {
      if (collaborators.includes(member)) {
        await removeCollaborator(listId, todoId, member);
      } else {
        await addCollaborator(listId, todoId, [member]);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error("Failed to toggle collaborator:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Edit Collaborators</h2>
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="grow">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                ref={triggerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                Manage Collaborators
                <ChevronsUpDown className="ml-2 h-4 w-full shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
              align="start"
              style={{
                width: popoverWidth || "auto",
              }}
            >
              <Command>
                <CommandInput placeholder="Search members..." />
                <CommandList>
                  <CommandEmpty>No member found.</CommandEmpty>
                  <CommandGroup>
                    {members.map((member) => {
                      const isCollaborator =
                        collaborators.includes(member) || member === owner;
                      return (
                        <CommandItem
                          key={member}
                          value={member}
                          onSelect={() => {
                            if (member !== owner) {
                              toggleCollaborator(member);
                            }
                          }}
                          className={cn("flex items-center justify-between", {
                            "opacity-50": member === owner,
                          })}
                        >
                          <span className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                collaborators.includes(member)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {member}
                            {collaborators.includes(member) && (
                              <span className="ml-2 text-sm text-gray-500">
                                (Collaborator)
                              </span>
                            )}
                            {member === owner && (
                              <span className="ml-2 text-sm text-gray-500">
                                (Owner)
                              </span>
                            )}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
