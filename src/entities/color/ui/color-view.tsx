"use client";

import { getRGBAStyle } from "@/src/shared/lib/color";
import { Color } from "@/src/shared/types/color.types";
import { HTMLAttributes, ReactNode } from "react";
import { ColorCodePreview } from "./color-code-preview";
import { ColorViewLayout } from "./color-view-layout";
import { ControlsList } from "./controls-list";

type ColorViewProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  color: Color;
  actions?: ReactNode;
};

export const ColorView = ({ color, actions, ...props }: ColorViewProps) => {
  return (
    <ColorViewLayout
      {...props}
      style={{ backgroundColor: getRGBAStyle(color) }}
      colorCodePreview={<ColorCodePreview color={color} />}
      controlsList={<ControlsList>{actions}</ControlsList>}
    />
  );
};
