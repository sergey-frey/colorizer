import { BLACK_COLOR, WHITE_COLOR } from "../constants/color";
import { Color } from "../types/color.types";

export const getRGBAStyle = ({ r, g, b, a }: Color) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

function getLuminance({ r, g, b }: Color) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });

  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function getContrastRatio(rgb1: Color, rgb2: Color) {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

export const getTextColorByBg = (bgColor: Color) => {
  const contrastRatioWithBlack = getContrastRatio(bgColor, BLACK_COLOR);
  const contrastRatioWithWhite = getContrastRatio(bgColor, WHITE_COLOR);

  return contrastRatioWithBlack >= contrastRatioWithWhite
    ? BLACK_COLOR
    : WHITE_COLOR;
};
