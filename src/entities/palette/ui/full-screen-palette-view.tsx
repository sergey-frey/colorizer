"use client";

import { Color } from "@/src/shared/types/color.types";
import { Palette } from "@/src/shared/types/palette.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes, ReactNode } from "react";
import { FullScreenColorsList } from "./full-screen-colors-list";

type FullScreenPaletteProps = HTMLAttributes<HTMLElement> & {
  palette: Palette;
  actions: ReactNode;
  colorsRender: (color: Color, i: number) => ReactNode;
};

export const FullScreenPaletteView = ({
  palette,
  actions = <></>,
  colorsRender,
  className,
  ...props
}: FullScreenPaletteProps) => {
  return (
    <section
      {...props}
      className={cn("h-full", "grid grid-rows-[1fr_auto]", className)}
    >
      <FullScreenColorsList colors={palette.colors}>
        {palette.colors.map(colorsRender)}
      </FullScreenColorsList>

      <div className="pt-2 flex gap-2">{actions}</div>
    </section>
  );
};
