import { FullScreenPalette } from "@/src/widgets/full-screen-palette";

type PalettePageProps = {
  params: {
    paletteId: string;
  };
};

export const PalettePage = ({ params }: PalettePageProps) => {
  return (
    <FullScreenPalette paletteId={params.paletteId as string} className="p-2" />
  );
};
