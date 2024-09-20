import { Plus } from "lucide-react";
import { useToggle } from "react-use";
import { FaCaretDown } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface WorkspaceSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  children,
  label,
  hint,
  onNew,
}) => {
  const [on, toggle] = useToggle(true);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          onClick={toggle}
          variant="transparent"
          className="p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0"
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", on && "-rotate-90")}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group px-1.5 text-sm text-[#f9edffcc] h-7 justify-start items-center overflow-hidden"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              variant="transparent"
              size="iconSm"
              onClick={onNew}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5  text-sm text-[#f9edffcc] size-6 shrink-0"
            >
              <Plus className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};
