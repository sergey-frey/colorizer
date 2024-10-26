import { useDisclosure } from "@nextui-org/modal";

export const useHeaderContentActions = () => {
  const addAIPaletteModalState = useDisclosure();

  const addAIPaletteClick = () => {
    addAIPaletteModalState.onOpen();
  };

  return {
    addAIPaletteModalState,
    actionsHandlers: {
      addAIPaletteClick,
    },
  };
};
