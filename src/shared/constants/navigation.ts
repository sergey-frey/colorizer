import { Palette } from "@/src/shared/types/palette.types";

export const ROUTES = {
  home: "/",
  palette: (paletteId: Palette["id"]) => `/${paletteId}`,
  settings: {
    user: "/settings/user",
    colors: "/settings/colors",
  },
};

export enum SearchParams {
  from = "from",
}
