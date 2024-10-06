import { SearchParams } from "@/src/shared/constants/navigation";
import { Palette } from "@/src/shared/types/palette.types";

export const getPaletteLink = (paletteId: Palette["id"]): string => {
  const url = `/${paletteId}`;
  const searchParams = new URLSearchParams();

  searchParams.set(SearchParams.from, "/");

  return `${url}?${searchParams.toString()}`;
};
