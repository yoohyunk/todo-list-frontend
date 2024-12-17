"use client";

import { Input } from "@/components/ui/input";
import { addTodo } from "@/actions/todo";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { getAllMembers } from "@/actions/list";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddTodoForm = () => {
  const params = useParams();
  const listId = Array.isArray(params.listId)
    ? params.listId[0]
    : params.listId || "";

  const [istodoNameClicked, setTodoNameClicked] = useState(false);
  const [members, setMembers] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Fetch all available members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers(listId); // Fetch all members for the list
        setMembers(data.Members || []);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, [listId]);

  const toggleMemberSelection = (member: string) => {
    setSelectedMembers(
      (prev) =>
        prev.includes(member)
          ? prev.filter((m) => m !== member) // Remove if already selected
          : [...prev, member] // Add if not selected
    );
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        try {
          await addTodo(
            listId,
            (target.elements.namedItem("todoName") as HTMLInputElement).value,
            (target.elements.namedItem("todoDescription") as HTMLInputElement)
              .value,
            selectedMembers // Pass selected members to the backend
          );
        } catch (error) {
          console.log("Error adding todo", error);
        }
      }}
      className="flex flex-col gap-1"
    >
      <div className="flex flex-row gap-1">
        <Input
          type="text"
          id="todoName"
          placeholder="Task name"
          onClick={() => setTodoNameClicked(true)}
          className=""
        />
        <Button type="submit" className="basis-4">
          +
        </Button>
      </div>
      {istodoNameClicked && (
        <>
          <Textarea
            id="todoDescription"
            placeholder="Description"
            className=""
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between mt-2"
              >
                {selectedMembers.length > 0
                  ? `${selectedMembers.length} members selected`
                  : "Select members..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search members..." />
                <CommandList>
                  <CommandEmpty>No members found.</CommandEmpty>
                  <CommandGroup>
                    {members.map((member) => (
                      <CommandItem
                        key={member}
                        value={member}
                        onSelect={() => toggleMemberSelection(member)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMembers.includes(member)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {member}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )}
    </form>
  );
};
