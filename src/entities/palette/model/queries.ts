import {
  AddPaletteDto,
  GenerateAIPaletteDto,
  GetAIPaletteDto,
} from "@/src/shared/api/dto";
import { aiApi } from "@/src/shared/api/instance";
import { paletteRepo } from "@/src/shared/api/repos/palette.repo";
import { queryClient } from "@/src/shared/query-client";
import { Palette } from "@/src/shared/types/palette.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ALL_PALETTES_KEY = "palettes";

const getPaletteWithIdKey = (id?: Palette["id"]) => {
  return `palette-${id}`;
};

export const usePalettesQuery = () => {
  return useQuery<Palette[]>({
    queryFn: () => paletteRepo.getAllPalettes(),
    queryKey: [ALL_PALETTES_KEY],
  });
};

export const usePalettesByIdQuery = (paletteId: Palette["id"]) => {
  return useQuery<Palette>({
    queryFn: () => paletteRepo.getPaletteById(paletteId),
    queryKey: [getPaletteWithIdKey(paletteId)],
  });
};

export const useAddColorToPalette = (paletteId?: Palette["id"]) => {
  const { isSuccess, ...otherMutationFields } = useMutation({
    mutationFn: (palette: Palette) => {
      return paletteRepo.updatePalette(palette);
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
    }: GetAIPaletteDto): Promise<GenerateAIPaletteDto> => {
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
    mutationFn: (dto: AddPaletteDto) => paletteRepo.addPalette(dto),
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

export const useDeletePaletteMutation = () => {
  const { isSuccess, ...otherMutationFields } = useMutation({
    mutationFn: (id: Palette["id"]) => paletteRepo.deletePalette(id),
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

export const useUpdatePaletteMutation = () => {};
