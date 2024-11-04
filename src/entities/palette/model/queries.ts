import {
  AddPaletteDto,
  GenerateAIPaletteDto,
  GetAIPaletteDto,
} from "@/src/shared/api/dto";
import { aiApi } from "@/src/shared/api/instance";
import { paletteApiRepo } from "@/src/shared/api/repos/palette-api.repo";
import { queryClient } from "@/src/shared/query-client";
import { Palette } from "@/src/shared/types/palette.types";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

const ALL_PALETTES_KEY = "palettes";

const getPaletteWithIdKey = (id?: Palette["id"]) => {
  return `palette-${id}`;
};

export const usePalettesQuery = () => {
  return useQuery<Palette[]>({
    queryFn: () => paletteApiRepo.getAllPalettes(),
    queryKey: [ALL_PALETTES_KEY],
  });
};

export const usePalettesByIdQuery = (paletteId: Palette["id"]) => {
  return useQuery<Palette>({
    queryFn: () => paletteApiRepo.getPaletteById(paletteId),
    queryKey: [getPaletteWithIdKey(paletteId)],
  });
};

export const useUpdatePaletteMutation = (paletteId?: Palette["id"]) => {
  return useMutation({
    mutationFn: (palette: Palette) => {
      return paletteApiRepo.updatePalette(palette);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [getPaletteWithIdKey(paletteId)],
      });
    },
  });
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
  return useMutation({
    mutationFn: (dto: AddPaletteDto) => paletteApiRepo.addPalette(dto),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_PALETTES_KEY],
      });
    },
  });
};

export const useDeletePaletteMutation = (
  options?: UseMutationOptions<void, Error, Palette["id"], unknown>,
) => {
  return useMutation({
    mutationFn: (id: Palette["id"]) => paletteApiRepo.deletePalette(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_PALETTES_KEY],
      });
    },
    ...options,
  });
};
