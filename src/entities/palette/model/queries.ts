import { GetAIPaletteDto } from "@/src/shared/api/dto";
import { aiApi, paletteApi } from "@/src/shared/api/instance";
import { queryClient } from "@/src/shared/query-client";
import { Color } from "@/src/shared/types/color.types";
import { Palette } from "@/src/shared/types/palette.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
          json: { colors },
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

export const useAIPaletteMutation = () => {
  return useMutation({
    mutationFn: ({
      amountOfColors,
    }: GetAIPaletteDto): Promise<{ palette: Palette }> => {
      return aiApi
        .post("palette", {
          json: {
            amountOfColors,
          },
        })
        .json();
    },
  });
};

export const useAddPaletteMutation = () => {
  const { isSuccess, ...otherMutationFields } = useMutation({
    mutationFn: (palette: Palette) => {
      return paletteApi
        .put("", {
          json: palette,
        })
        .json();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: [ALL_PALETTES_KEY],
      });
    }
  }, [isSuccess]);

  return {
    isSuccess,
    ...otherMutationFields,
  };
};
