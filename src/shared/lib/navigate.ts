import { Palette } from "@/src/shared/types/palette.types";

export const getPaletteLink = (
  paletteId: Palette["id"],
  params: Record<string, string> = {},
): string => {
  const url = `/${paletteId}`;
  const searchParams = new URLSearchParams();

  for (const paramKey in params) {
    searchParams.set(paramKey, params[paramKey]);
  }

  return `${url}?${searchParams.toString()}`;
};
