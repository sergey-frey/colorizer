import { Palette } from "@/src/shared/types/palette.types";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";
import { CompactColorView } from "../../color/ui/compact-color-view";

type CompactPaletteProps = HTMLAttributes<HTMLElement> & {
  palette: Palette;
};

export const CompactPaletteView = ({
  palette,
  className,
  ...props
}: CompactPaletteProps) => {
  return (
    <article
      {...props}
      className={cn("grid gap-1", "p-2 rounded-lg", "bg-slate-200", className)}
      style={{ gridTemplateColumns: `repeat(${palette.colors.length}, 1fr)` }}
    >
      {palette.colors.map((color, i) => {
        return <CompactColorView key={i} color={color} className="w-auto" />;
      })}
    </article>
  );
};
