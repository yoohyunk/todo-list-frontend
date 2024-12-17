import { removeCollaborator } from "../actions/list";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const RemoveCollaboratorButton = ({
  listId,
  collaborator,
  onRemoveSuccess,
}: {
  listId: string;
  collaborator: string;
  onRemoveSuccess: () => void;
}) => {
  const deleteCollaborator = async () => {
    try {
      await removeCollaborator(listId, collaborator);
      onRemoveSuccess(); // Trigger the callback to refresh collaborators
    } catch (error) {
      console.log("Failed to remove collaborator:", error);
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="">
          <button
            onClick={deleteCollaborator}
            className="border-solid p-2 flex flex-row items-center justify-end text-xs"
          >
            -
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Remove Collaborator</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
