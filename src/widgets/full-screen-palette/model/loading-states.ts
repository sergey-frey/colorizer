import {
  useDeletePaletteMutation,
  usePalettesByIdQuery,
  useUpdatePaletteMutation,
} from "@/src/entities/palette";

type UIComponentLoadingState = Partial<{
  isLoading: boolean;
  isDisabled: boolean;
}>;

export const getLoadingStates = (
  paletteQuery: ReturnType<typeof usePalettesByIdQuery>,
  updatePaletteMutation: ReturnType<typeof useUpdatePaletteMutation>,
  deletePaletteMutation: ReturnType<typeof useDeletePaletteMutation>,
) => {
  const addColorButton: UIComponentLoadingState = {
    isLoading: updatePaletteMutation.isPending,
    isDisabled: paletteQuery.isRefetching || updatePaletteMutation.isPending,
  };

  const renamePaletteInput: UIComponentLoadingState = {
    isDisabled: paletteQuery.isRefetching || updatePaletteMutation.isPending,
  };

  return {
    addColorButton,
    renamePaletteInput,
  };
};
