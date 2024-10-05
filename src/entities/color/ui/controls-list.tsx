import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type ControlsListProps = HTMLAttributes<HTMLDivElement>;

export const ControlsList = ({
  className,
  children,
  ...props
}: ControlsListProps) => {
  return (
    <div {...props} className={cn("flex gap-2", className)}>
      {children}
    </div>
  );
};
