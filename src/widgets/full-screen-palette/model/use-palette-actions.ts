import { useDisclosure } from "@nextui-org/modal";
import { PaletteActions } from "../constants/actions";

export const usePaletteActions = () => {
  const addColorModalState = useDisclosure();
  const mixColorsModalState = useDisclosure();
  const deletePaletteConfirmState = useDisclosure();

  const addColorClick = () => {
    addColorModalState.onOpen();
  };

  const mixColorsClick = () => {
    mixColorsModalState.onOpen();
  };

  const deletePaletteClick = () => {
    deletePaletteConfirmState.onOpen();
  };

  const getActionHandler = (action: PaletteActions) => {
    switch (action) {
      case PaletteActions.add: {
        return addColorClick;
      }
      case PaletteActions.mix: {
        return mixColorsClick;
      }
      case PaletteActions.delete: {
        return deletePaletteClick;
      }
    }
  };

  return {
    addColorModalState,
    mixColorsModalState,
    deletePaletteConfirmState,
    getActionHandler,
  };
};
