import { colorFormatter } from "@/src/shared/lib/color-formatter";
import { Color } from "@/src/shared/types/color.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type CompactColorViewProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  color: Color;
};

export const CompactColorView = ({
  color,
  className,
  ...props
}: CompactColorViewProps) => {
  return (
    <span
      {...props}
      className={cn("w-10 h-10 rounded-md", className)}
      style={{ backgroundColor: colorFormatter(color).style() }}
    />
  );
};
