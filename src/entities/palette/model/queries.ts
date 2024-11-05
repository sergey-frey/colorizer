import { GenerateAIPaletteDto, GetAIPaletteDto } from "@/src/shared/api/dto";
import { aiApiRepo } from "@/src/shared/api/repos/ai-api.repo";
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
    queryFn: paletteApiRepo.getAllPalettes,
    queryKey: [ALL_PALETTES_KEY],
  });
};

export const usePalettesByIdQuery = (paletteId: Palette["id"]) => {
  return useQuery<Palette>({
    queryFn: () => paletteApiRepo.getPaletteById(paletteId),
    queryKey: [getPaletteWithIdKey(paletteId)],
  });
};

export const useUpdatePaletteMutation = (
  paletteId?: Palette["id"],
  options?: UseMutationOptions<Palette, Error, Palette, unknown>,
) => {
  return useMutation({
    mutationFn: paletteApiRepo.updatePalette,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [getPaletteWithIdKey(paletteId)],
      });
    },
    ...options,
  });
};

export const useAIPaletteMutation = () => {
  return useMutation({
    mutationFn: ({
      amountOfColors,
    }: GetAIPaletteDto): Promise<GenerateAIPaletteDto> => {
      return aiApiRepo.getPalette({ amountOfColors });
    },
  });
};

export const useAddPaletteMutation = () => {
  return useMutation({
    mutationFn: paletteApiRepo.addPalette,
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
