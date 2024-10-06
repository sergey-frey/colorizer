import { BLACK_COLOR } from "@/src/shared/constants/color";
import { FullScreenPaletteView } from "./full-screen-palette-view";
import { Skeleton } from "@nextui-org/skeleton";

const mockPalette = {
  id: "mock_palette",
  colors: Array.from({ length: 4 }, () => BLACK_COLOR),
};

export const FullScreenPaletteViewFallback = () => {
  return (
    <FullScreenPaletteView
      palette={mockPalette}
      colorsRender={(_, i) => {
        return <Skeleton key={i} className="w-full" />;
      }}
      actions={<Skeleton className="w-full h-10 rounded-medium" />}
    />
  );
};
