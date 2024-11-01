import { Color, ColorFormat } from "../types/color.types";

export const BLACK_COLOR: Color = {
  r: 0,
  g: 0,
  b: 0,
  a: 1,
};

export const WHITE_COLOR: Color = {
  r: 255,
  g: 255,
  b: 255,
  a: 1,
};

export const ALL_POSSIBLE_FORMATS: Array<ColorFormat> = ["rgba", "hex"];
