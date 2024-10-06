import { GLOBAL_BASE, SearchParams } from "@/src/shared/constants/navigation";
import { Palette } from "@/src/shared/types/palette.types";

export const getPaletteLink = (paletteId: Palette["id"]): URL => {
  const url = new globalThis.URL(`/${paletteId}`, GLOBAL_BASE);

  url.searchParams.set(SearchParams.from, "/");

  return url;
};
