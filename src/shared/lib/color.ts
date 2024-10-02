import { Color } from "@/src/entities/palette";

const blackColor: Color = {
  r: 0,
  g: 0,
  b: 0,
  a: 1,
};

const whiteColor: Color = {
  r: 255,
  g: 255,
  b: 255,
  a: 1,
};

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
  const contrastRatioWithBlack = getContrastRatio(bgColor, blackColor);
  const contrastRatioWithWhite = getContrastRatio(bgColor, whiteColor);

  return contrastRatioWithBlack >= contrastRatioWithWhite
    ? blackColor
    : whiteColor;
};
