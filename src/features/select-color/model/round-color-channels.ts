import { Color } from "@/src/entities/palette";

export const roundColorChannels = (color: Color): Color => {
  return {
    r: Math.round(color.r),
    g: Math.round(color.g),
    b: Math.round(color.b),
    a: Number(color.a.toFixed(2)),
  };
};
