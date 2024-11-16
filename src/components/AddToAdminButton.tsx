import { addAdmin } from "@/actions/list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AddToAdminButton = ({
  listId,
  newAdminId,
}: {
  listId: string;
  newAdminId: string;
}) => {
  const addAdminToList = () => {
    addAdmin(listId, newAdminId);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="">
          <button
            onClick={addAdminToList}
            className="border-solid p-2 flex flex-row items-center justify-end text-xs"
          >
            +
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to Admin</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
