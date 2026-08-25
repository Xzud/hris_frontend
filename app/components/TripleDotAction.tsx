import { EllipsisVertical } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type TripleDotActionProps = {
  editAction?: () => void;
  deleteAction?: () => void;
};

const TripleDotAction = ({
  editAction,
  deleteAction,
}: TripleDotActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={editAction}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteAction} className={"text-red-500"}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TripleDotAction;
