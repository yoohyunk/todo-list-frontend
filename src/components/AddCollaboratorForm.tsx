import { getCollaborators, addCollaborator, getAdmin } from "@/actions/list";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import { useEffect, useState } from "react";
import { SearchUsers } from "./SearchUser";

interface Collaborator {
  Collaborator: string[];
}

interface AddCollaboratorProps {
  listId: string;
  onSubmitSuccess: () => void;
}

export const AddCollaborator = ({
  listId,
  onSubmitSuccess,
}: AddCollaboratorProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [admin, setAdmin] = useState<string | null>(null);
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
          setIsSubmitted(true);
          onSubmitSuccess();
        } catch (error) {
          console.log("Error adding list", error);
        }
      }}
    >
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-center">Add collaborator</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex flex-col">
            <div>Admin: {admin}</div>
            <DropdownMenu>
              <DropdownMenuTrigger onClick={() => setIsClicked(true)}>
                Collaborators: {collaboratorCount}
              </DropdownMenuTrigger>

              {isClicked && (
                <DropdownMenuContent>
                  <DropdownMenuLabel>Collaborators</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {collaboratorCount > 0 ? (
                    collaborator?.Collaborator?.map((collaborator) => (
                      <DropdownMenuItem>{collaborator}</DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem>No Collaborators</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
            <input
              type="text"
              id="collaborator"
              placeholder="User Id"
              className="text-center"
            />
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row justify-end">
          <button type="submit">Add</button>
        </CardFooter>
      </Card>
    </form>
  );
};
