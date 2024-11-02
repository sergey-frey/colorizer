import { colorFormatter } from "@/src/shared/lib/color-formatter";
import { Color, ColorFormat } from "@/src/shared/types/color.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type ColorCodePreviewProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  color: Color;
  format: ColorFormat;
};

export const ColorCodePreview = ({
  color,
  format,
  className,
  ...props
}: ColorCodePreviewProps) => {
  const textColor = colorFormatter(color).contrastColor().style();

  return (
    <>
      <span
        {...props}
        className={cn("text-xs", "md:hidden", className)}
        style={{ color: textColor }}
      >
        {colorFormatter(color).string(format)}
      </span>

      <ul className={cn("hidden", "md:grid")} style={{ color: textColor }}>
        <li>R: {color.r}</li>
        <li>G: {color.g}</li>
        <li>B: {color.b}</li>
        <li>A: {color.a}</li>
      </ul>
    </>
  );
};
