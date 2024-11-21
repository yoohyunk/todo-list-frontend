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
}: {
  listId: string;
  collaborator: string;
}) => {
  const deleteCollaborator = () => {
    removeCollaborator(listId, collaborator);
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
