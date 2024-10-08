import { Palette } from "@/src/shared/types/palette.types";
import { UseQueryResult } from "@tanstack/react-query";

export const addColorButtonLoadingCalculate = (
  paletteQuery: UseQueryResult<Palette, Error>,
  addColorMutation: { isPending: boolean },
) => {
  return (
    paletteQuery.isPending ||
    paletteQuery.isRefetching ||
    addColorMutation.isPending
  );
};
