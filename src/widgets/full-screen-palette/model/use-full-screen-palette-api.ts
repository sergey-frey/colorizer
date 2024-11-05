import {
  useDeletePaletteMutation,
  usePalettesByIdQuery,
  useUpdatePaletteMutation,
} from "@/src/entities/palette";
import {
  colorFormatSelector,
  useColorDisplaySettings,
} from "@/src/features/color-display-settings";
import { Color } from "@/src/shared/types/color.types";
import { Palette } from "@/src/shared/types/palette.types";
import { useBackNavigate } from "@/src/shared/utils/use-back-navigate";
import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../constants/toast-messages";
import { getLoadingStates } from "./loading-states";

type UseFullScreenPaletteApiOptions = {
  paletteId: Palette["id"];
  workingColor: Color | null;
};

export const useFullScreenPaletteApi = ({
  paletteId,
  workingColor,
}: UseFullScreenPaletteApiOptions) => {
  const paletteQuery = usePalettesByIdQuery(paletteId);
  const updatePaletteMutation = useUpdatePaletteMutation(paletteId);
  const deletePaletteMutation = useDeletePaletteMutation();

  const { navigateBack } = useBackNavigate();

  const format = useColorDisplaySettings(colorFormatSelector);

  const loadingStates = getLoadingStates(
    paletteQuery,
    updatePaletteMutation,
    // deletePaletteMutation,
  );

  const addedColorSelect = (color: Color) => {
    if (!paletteQuery.isSuccess) return;

    const newPalette = {
      ...paletteQuery.data,
      colors: paletteQuery.data.colors.concat([color]),
    };

    updatePaletteMutation
      .mutateAsync(newPalette)
      .then(() => toast.success(TOAST_MESSAGES.success.addColor(color, format)))
      .catch(() => toast.error(TOAST_MESSAGES.error.addColor(color, format)));
  };

  const deletePaletteConfirm = (onClose: () => void) => {
    deletePaletteMutation
      .mutateAsync(paletteId)
      .then(() => {
        toast.success(
          TOAST_MESSAGES.success.deletePalette(paletteQuery.data?.title ?? ""),
        );
        navigateBack();
      })
      .catch(() =>
        toast.error(
          TOAST_MESSAGES.error.deletePalette(paletteQuery.data?.title ?? ""),
        ),
      )
      .finally(onClose);
  };

  const paletteTitleBlur = (updatedPaletteTitle: string) => () => {
    const titleHasBeenChanged =
      updatedPaletteTitle !== paletteQuery.data?.title;

    if (!paletteQuery.isSuccess || !titleHasBeenChanged) return;

    updatePaletteMutation
      .mutateAsync({
        ...paletteQuery.data,
        title: updatedPaletteTitle,
      })
      .then(() =>
        toast.success(TOAST_MESSAGES.success.titleUpdate(updatedPaletteTitle)),
      )
      .catch(() =>
        toast.error(TOAST_MESSAGES.error.titleUpdate(updatedPaletteTitle)),
      );
  };

  const deleteColorConfirm = (onClose: () => void) => {
    if (!paletteQuery.isSuccess || workingColor === null) return;

    const newPalette = {
      ...paletteQuery.data,
      colors: paletteQuery.data.colors.filter(
        (color) => color !== workingColor,
      ),
    };

    updatePaletteMutation
      .mutateAsync(newPalette)
      .then(() => {
        toast.success(TOAST_MESSAGES.success.deleteColor(workingColor, format));
      })
      .catch(() =>
        toast.error(TOAST_MESSAGES.error.deleteColor(workingColor, format)),
      )
      .finally(onClose);
  };

  return {
    paletteQuery,
    updatePaletteMutation,
    deletePaletteMutation,

    handlers: {
      addedColorSelect,
      deletePaletteConfirm,
      paletteTitleBlur,
      deleteColorConfirm,
    },

    loadingStates,
  };
};
