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
import { EditListNameCard } from "./EditListNameCard";
import { useState } from "react";

interface ListMenuProps {
  listId: string;
}

export const ListMenu = ({ listId }: ListMenuProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-2xl">...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => await DeleteList(listId)}>
            Delete list
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm">
                rename
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
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
