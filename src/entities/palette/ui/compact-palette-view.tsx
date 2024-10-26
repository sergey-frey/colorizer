import { CompactColorView } from "@/src/entities/color";
import { Palette } from "@/src/shared/types/palette.types";
import { WithFallback } from "@/src/shared/ui/with-fallback";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

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
      className={cn(
        "grid gap-1",
        "p-2 rounded-medium",
        "transition-all bg-slate-100",
        "hover:shadow-md",
        className,
      )}
    >
      <p className="text-small">{palette.title}</p>
      <div
        className={cn("grid gap-1", className)}
        style={{ gridTemplateColumns: `repeat(${palette.colors.length}, 1fr)` }}
      >
        <WithFallback
          isShowFallback={palette.colors.length === 0}
          fallback={
            <CompactColorView
              color={{ r: 0, g: 0, b: 0, a: 0 }}
              className="w-auto grid place-items-center border"
            >
              No colors
            </CompactColorView>
          }
        >
          {palette.colors.map((color, i) => {
            return (
              <CompactColorView
                key={i}
                color={color}
                className="w-auto rounded-small"
              />
            );
          })}
        </WithFallback>
      </div>
    </article>
  );
};
