import { Color } from "@/src/entities/palette";

export const getRGBAStyle = ({ r, g, b, a }: Color) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
