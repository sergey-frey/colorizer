import { paletteApi } from "@/src/shared/api/instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Color, Palette } from "../../../shared/types/palette.types";
import { useEffect } from "react";
import { queryClient } from "@/src/shared/query-client";

const ALL_PALETTES_KEY = "palettes";

const getPaletteWithIdKey = (id?: Palette["id"]) => {
  return `palette-${id}`;
};

export const usePalettesQuery = () => {
  return useQuery<Palette[]>({
    queryFn: () => {
      return paletteApi.get("").json();
    },
    queryKey: [ALL_PALETTES_KEY],
  });
};

export const usePalettesByIdQuery = (paletteId: Palette["id"]) => {
  return useQuery<Palette>({
    queryFn: () => {
      return paletteApi.get(`${paletteId}`).json();
    },
    queryKey: [getPaletteWithIdKey(paletteId)],
  });
};

export const useAddColorToPalette = (paletteId: Palette["id"]) => {
  const { isSuccess, ...otherMutationFields } = useMutation({
    mutationFn: (colors: Color[]) => {
      return paletteApi
        .patch(`${paletteId}`, {
          body: JSON.stringify({ colors }),
        })
        .json();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: [getPaletteWithIdKey(paletteId)],
      });
    }
  }, [isSuccess, paletteId]);

  return {
    isSuccess,
    ...otherMutationFields,
  };
};
