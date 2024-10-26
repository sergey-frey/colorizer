import { Palette } from "../types/palette.types";

export type GetAIPaletteDto = {
  amountOfColors: number;
};

export type AddPaletteDto = Omit<Palette, "id" | "title"> & {
  title?: string;
};
export type GenerateAIPaletteDto = { data: Omit<Palette, "id"> };
