import { Color } from "@/src/shared/types/color.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type FullScreenColorsListProps = HTMLAttributes<HTMLElement> & {
  colors: Color[];
};

export const FullScreenColorsList = ({
  colors,
  className,
  ...props
}: FullScreenColorsListProps) => {
  return (
    <section
      {...props}
      className={cn("grid", "rounded-medium overflow-hidden", className)}
      style={{ gridTemplateRows: `repeat(${colors.length}, 1fr)` }}
    />
  );
};
