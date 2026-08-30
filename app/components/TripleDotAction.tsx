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
  actions: ActionProps[];
};

type ActionProps = {
  label: string;
  action: () => void;
  className?: string;
};

const TripleDotAction = ({ actions }: TripleDotActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {actions.map((action, idx) => (
            <DropdownMenuItem
              key={`action-${action.label}-${idx}`}
              onClick={action.action}
              className={action.className}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TripleDotAction;
