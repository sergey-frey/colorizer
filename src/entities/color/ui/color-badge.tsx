import { colorFormatter } from "@/src/shared/lib/color-formatter";
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
  const formatter = colorFormatter(color);

  return (
    <span
      {...props}
      className={cn("p-1 rounded-md shadow", className)}
      style={{
        backgroundColor: formatter.style(),
        color: formatter.contrastColor().style(),
      }}
    >
      {formatter.string(format)}
    </span>
  );
};
