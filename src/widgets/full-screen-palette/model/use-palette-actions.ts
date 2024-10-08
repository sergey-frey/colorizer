import { useDisclosure } from "@nextui-org/modal";
import { PaletteActions } from "../constants/actions";

export const usePaletteActions = () => {
  const addColorModalState = useDisclosure();
  const mixColorsModalState = useDisclosure();

  const addColorClick = () => {
    addColorModalState.onOpen();
  };

  const mixColorsClick = () => {
    mixColorsModalState.onOpen();
  };

  const getActionHandler = (action: PaletteActions) => {
    switch (action) {
      case PaletteActions.add: {
        return addColorClick;
      }
      case PaletteActions.mix: {
        return mixColorsClick;
      }
    }
  };

  return {
    addColorModalState,
    mixColorsModalState,
    getActionHandler,
    actionsHandlers: {
      addColorClick,
    },
  };
};
