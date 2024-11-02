import {
  getColorStringView,
  getRGBAStyle,
  getTextColorByBg,
} from "@/src/shared/lib/color";
import { Color, ColorFormat } from "@/src/shared/types/color.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type ColorBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  color: Color;
  format: ColorFormat;
};

export const ColorBadge = ({
  color,
  format,
  className,
  ...props
}: ColorBadgeProps) => {
  return (
    <span
      {...props}
      className={cn("p-1 rounded-md shadow", className)}
      style={{
        backgroundColor: getRGBAStyle(color),
        color: getRGBAStyle(getTextColorByBg(color)),
      }}
    >
      {getColorStringView(color, format)}
    </span>
  );
};
