import { getCollaborators, addCollaborator, getAdmin } from "@/actions/list";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEffect, useState } from "react";
import { AddToAdminButton } from "./AddToAdminButton";
import { LuUsers } from "react-icons/lu";
import { LuPlusCircle } from "react-icons/lu";

interface Collaborator {
  Collaborator: string[];
}

interface Admins {
  Admins: string[];
}

interface AddCollaboratorProps {
  listId: string;
  onSubmitSuccess: () => void;
}

export const AddCollaborator = ({
  listId,
  onSubmitSuccess,
}: AddCollaboratorProps) => {
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [admin, setAdmin] = useState<Admins | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getAdmin(listId);
        setAdmin(data);
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };

    fetchAdmin();
  }, [listId]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await getCollaborators(listId);
        setCollaborator(data);
      } catch (error) {
        console.error("Failed to fetch collaborators:", error);
      }
    };

    fetchCollaborators();
  }, [listId]);

  const collaboratorCount = collaborator?.Collaborator?.length || 0;
  const adminCount = admin?.Admins?.length || 0;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        try {
          await addCollaborator(
            listId,
            (target.elements.namedItem("collaborator") as HTMLInputElement)
              .value
          );

          onSubmitSuccess();
        } catch (error) {
          console.log("Error adding list", error);
        }
      }}
      className="p-0"
    >
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-center">Add collaborator</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex flex-col gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={() => setIsClicked(true)}
                className="flex items-center w-full justify-center gap-2 text-xs"
              >
                <LuUsers /> Members: {collaboratorCount + adminCount}
              </DropdownMenuTrigger>

              {isClicked && (
                <DropdownMenuContent>
                  <DropdownMenuLabel>Admins</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {adminCount > 0 ? (
                    admin?.Admins?.map((admin) => (
                      <DropdownMenuItem key={admin}>{admin}</DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem>No admins</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Collaborators</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {collaboratorCount > 0 ? (
                    collaborator?.Collaborator?.map((collaborator) => (
                      <div className="flex " key={collaborator}>
                        <DropdownMenuItem>{collaborator}</DropdownMenuItem>
                        <AddToAdminButton
                          listId={listId}
                          newAdminId={collaborator}
                        />
                      </div>
                    ))
                  ) : (
                    <DropdownMenuItem>No Collaborators</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
            <div className="border-2 rounded-md flex items-center  px-1 text-xs">
              <input
                type="text"
                id="collaborator"
                placeholder="User Email"
                className="text-center "
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className=" flex items-center">
                    <button type="submit">
                      <LuPlusCircle className="" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add collaborator</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardDescription>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </form>
  );
};
