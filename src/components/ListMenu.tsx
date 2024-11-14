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

interface ListMenuProps {
  listId: string;
}

export const ListMenu = ({ listId }: ListMenuProps) => {
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
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm">
                rename
              </DropdownMenuTrigger>
              <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                <EditListNameCard listId={listId} />
              </DropdownMenuContent>
            </DropdownMenu>
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
