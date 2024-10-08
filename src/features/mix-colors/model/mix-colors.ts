import { Color } from "@/src/shared/types/color.types";
import { STUB_COLOR } from "../constants/mixed-color";

export const mixColors = (colors: Color[]): Color => {
  if (colors.length === 0) return STUB_COLOR;

  const result = { ...STUB_COLOR };

  for (const color of colors) {
    result.r += color.r;
    result.g += color.g;
    result.b += color.b;
    result.a += color.a;
  }

  result.r = Math.round(result.r / colors.length);
  result.g = Math.round(result.g / colors.length);
  result.b = Math.round(result.b / colors.length);
  result.a = Number((result.a / colors.length).toFixed(2));

  return result;
};

export const getColorsByMixCounts = (counts: Map<Color, number>): Color[] => {
  const result: Color[] = [];

  for (const color of Array.from(counts.keys())) {
    for (let i = 0; i < (counts.get(color) ?? 0); i++) {
      result.push(color);
    }
  }

  return result;
};
