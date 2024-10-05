import { Palette } from "@/src/shared/types/palette.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type CompactPaletteProps = HTMLAttributes<HTMLElement> & {
  palette?: Palette;
};

export const CompactPalette = ({
  className,
  ...props
}: CompactPaletteProps) => {
  return <section {...props} className={cn("flex gap-1", className)}></section>;
};
