import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type FullScreenColorsListProps = HTMLAttributes<HTMLElement> & {
  amountOfColors: number;
};

export const FullScreenColorsList = ({
  amountOfColors,
  className,
  ...props
}: FullScreenColorsListProps) => {
  return (
    <section
      {...props}
      className={cn("grid", "rounded-medium overflow-hidden", className)}
      style={{ gridTemplateRows: `repeat(${amountOfColors}, 1fr)` }}
    />
  );
};
