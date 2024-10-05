import { getRGBAStyle, getTextColorByBg } from "@/src/shared/lib/color";
import { Color } from "@/src/shared/types/color.types";
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
    <span
      {...props}
      className={cn("text-xs", className)}
      style={{ color: getRGBAStyle(getTextColorByBg(color)) }}
    >
      {getRGBAStyle(color)}
    </span>
  );
};
