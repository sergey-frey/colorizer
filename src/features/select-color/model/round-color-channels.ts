import { Color } from "@/src/shared/types/color.types";

export const roundColorChannels = (color: Color): Color => {
  return {
    r: Math.round(color.r),
    g: Math.round(color.g),
    b: Math.round(color.b),
    a: Number(color.a.toFixed(2)),
  };
};
