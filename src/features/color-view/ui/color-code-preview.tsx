import { Color } from "@/src/entities/palette";
import { getRGBAStyle } from "@/src/shared/lib/color";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type ColorCodePreviewProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  color: Color;
};

export const ColorCodePreview = ({
  color,
  className,
  ...props
}: ColorCodePreviewProps) => {
  return (
    <span {...props} className={cn("text-xs", className)}>
      {getRGBAStyle(color)}
    </span>
  );
};
