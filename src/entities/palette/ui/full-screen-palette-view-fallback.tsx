import { BLACK_COLOR } from "@/src/shared/constants/color";
import { FullScreenPaletteView } from "./full-screen-palette-view";
import { Skeleton } from "@nextui-org/skeleton";
import { HTMLAttributes } from "react";
import { Palette } from "@/src/shared/types/palette.types";

const mockPalette: Palette = {
  id: "mock_palette",
  title: "Mock palette",
  colors: Array.from({ length: 4 }, () => BLACK_COLOR),
};

export const FullScreenPaletteViewFallback = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <FullScreenPaletteView
      {...props}
      className={className}
      palette={mockPalette}
      colorsRender={(_, i) => {
        return <Skeleton key={i} className="w-full" />;
      }}
      actions={
        <>
          <Skeleton className="min-w-10 h-10 rounded-medium" />
          <Skeleton className="w-full h-10 rounded-medium sm:w-[127px]" />
        </>
      }
    />
  );
};
