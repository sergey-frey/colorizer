import { useDisclosure } from "@nextui-org/modal";

export const useHeaderActions = () => {
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
