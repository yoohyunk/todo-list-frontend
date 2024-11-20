"use client";
import { DeleteList } from "@/actions/list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { LuUserPlus } from "react-icons/lu";
import { EditListNameCard } from "./EditListNameCard";
import { AddCollaborator } from "./AddCollaboratorForm";
import { useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { LuMoreVertical } from "react-icons/lu";

interface ListMenuProps {
  listId: string;
  listName: string;
}

export const ListMenu = ({ listId, listName }: ListMenuProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-2xl">
          <LuMoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-sm flex items-center  hover:bg-red-100">
            <AlertDialog>
              <AlertDialogTrigger
                onClick={(e) => e.stopPropagation()}
                className=" flex flex-row items-center gap-2"
              >
                <LuTrash />
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete the list: &quot;{listName}
                    &quot;?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Deleting this list will
                    permanently remove it along with all associated tasks and
                    data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => await DeleteList(listId)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsEditing(true)}
            className="focus:bg-accent focus:text-accent-foreground"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm flex items-center gap-2">
                <LuPenLine />
                Rename
              </DropdownMenuTrigger>

              {isEditing ? (
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <EditListNameCard
                    listId={listId}
                    onSubmitSuccess={() => setIsEditing(false)}
                  />
                </DropdownMenuContent>
              ) : null}
            </DropdownMenu>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsEditing(true)}
            className="focus:bg-accent focus:text-accent-foreground"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm flex items-center gap-2">
                <LuUserPlus /> Add New Collaborator
              </DropdownMenuTrigger>

              {isEditing ? (
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <AddCollaborator
                    listId={listId}
                    onSubmitSuccess={() => setIsEditing(false)}
                  />
                </DropdownMenuContent>
              ) : null}
            </DropdownMenu>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
