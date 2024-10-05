"use client";

import { ColorView } from "@/src/entities/color";
import { Palette } from "@/src/shared/types/palette.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes, ReactNode } from "react";
import { FullScreenColorsList } from "./full-screen-colors-list";

type FullScreenPaletteProps = HTMLAttributes<HTMLElement> & {
  palette: Palette;
  actions: ReactNode;
};

export const FullScreenPaletteView = ({
  palette,
  actions = <></>,
  className,
  ...props
}: FullScreenPaletteProps) => {
  return (
    <section
      {...props}
      className={cn("h-full", "grid grid-rows-[1fr_auto]", className)}
    >
      <FullScreenColorsList amountOfColors={palette.colors.length}>
        {palette.colors.map((color, i) => {
          return <ColorView key={i} color={color} />;
        })}
      </FullScreenColorsList>

      <div className="p-2">{actions}</div>
    </section>
  );
};
