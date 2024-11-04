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
        className={cn("text-medium", "sm:text-medium", "md:hidden", className)}
        style={{ color: textColor }}
      >
        {colorFormatter(color).string(format)}
      </span>

      <DesktopPreview color={color} format={format} textColor={textColor} />
    </>
  );
};

const DesktopPreview = ({
  color,
  format,
  textColor,
}: {
  color: Color;
  format: ColorFormat;
  textColor: string;
}) => {
  switch (format) {
    case "rgba": {
      return (
        <ul className={cn("hidden", "md:grid")} style={{ color: textColor }}>
          <li>R: {color.r}</li>
          <li>G: {color.g}</li>
          <li>B: {color.b}</li>
          <li>A: {color.a}</li>
        </ul>
      );
    }
    case "hex": {
      return (
        <span className="hidden md:inline" style={{ color: textColor }}>
          {colorFormatter(color).string("hex")}
        </span>
      );
    }
  }
};
