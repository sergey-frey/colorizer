import {
  useDeletePaletteMutation,
  usePalettesByIdQuery,
  useUpdatePaletteMutation,
} from "@/src/entities/palette";
import { Color } from "@/src/shared/types/color.types";
import { Palette } from "@/src/shared/types/palette.types";
import { useBackNavigate } from "@/src/shared/utils/use-back-navigate";
import { getLoadingStates } from "./loading-states";

type UseFullScreenPaletteApiOptions = {
  paletteId: Palette["id"];
};

export const useFullScreenPaletteApi = ({
  paletteId,
}: UseFullScreenPaletteApiOptions) => {
  const paletteQuery = usePalettesByIdQuery(paletteId);
  const updatePaletteMutation = useUpdatePaletteMutation(paletteId);
  const deletePaletteMutation = useDeletePaletteMutation();

  const { navigateBack } = useBackNavigate();

  const loadingStates = getLoadingStates(
    paletteQuery,
    updatePaletteMutation,
    deletePaletteMutation,
  );

  const addedColorSelect = (color: Color) => {
    if (!paletteQuery.isSuccess) return;

    const newPalette = {
      ...paletteQuery.data,
      colors: paletteQuery.data.colors.concat([color]),
    };

    updatePaletteMutation.mutateAsync(newPalette);
  };

  const deletePaletteConfirm = (onClose: () => void) => {
    deletePaletteMutation
      .mutateAsync(paletteId)
      .then(navigateBack)
      .finally(onClose);
  };

  const paletteTitleBlur = (updatedPaletteTitle: string) => () => {
    const titleHasBeenChanged =
      updatedPaletteTitle !== paletteQuery.data?.title;

    if (!paletteQuery.isSuccess || !titleHasBeenChanged) return;

    updatePaletteMutation.mutateAsync({
      ...paletteQuery.data,
      title: updatedPaletteTitle,
    });
  };

  return {
    paletteQuery,
    updatePaletteMutation,
    deletePaletteMutation,

    handlers: {
      addedColorSelect,
      deletePaletteConfirm,
      paletteTitleBlur,
    },

    loadingStates,
  };
};
