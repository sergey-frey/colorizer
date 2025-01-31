import { Color, ColorFormat } from "@/src/shared/types/color.types";
import { HTMLAttributes, ReactNode } from "react";
import { ColorCodePreview } from "./color-code-preview";
import { ColorViewLayout } from "./color-view-layout";
import { ControlsList } from "./controls-list";
import { colorFormatter } from "@/src/shared/lib/color-formatter";

type ColorViewProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  color: Color;
  format: ColorFormat;
  actions?: ReactNode;
};

export const ColorView = ({
  color,
  format,
  actions,
  ...props
}: ColorViewProps) => {
  return (
    <ColorViewLayout
      {...props}
      style={{ backgroundColor: colorFormatter(color).style() }}
      colorCodePreview={<ColorCodePreview color={color} format={format} />}
      controlsList={<ControlsList>{actions}</ControlsList>}
    />
  );
};
