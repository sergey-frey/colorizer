import { Color, ColorFormat } from "@/src/shared/types/color.types";
import { ReactNode } from "react";

export type FullScreenToastStatusMessages = {
  addColor: (color: Color, format: ColorFormat) => ReactNode;

  deleteColor: (color: Color, format: ColorFormat) => ReactNode;

  titleUpdate: (title: string) => ReactNode;

  deletePalette: (title: string) => ReactNode;
};
