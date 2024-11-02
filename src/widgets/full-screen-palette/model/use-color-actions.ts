import {
  colorFormatSelector,
  useColorDisplaySettings,
} from "@/src/features/color-display-settings";
import { getColorStringView, getRGBAStyle } from "@/src/shared/lib/color";
import { Color } from "@/src/shared/types/color.types";
import { copyToClipboard } from "@/src/shared/utils/copy";
import { useDisclosure } from "@nextui-org/modal";
import { Dispatch, SetStateAction } from "react";

type UseColorActionsOptions = {
  setWorkingColor: Dispatch<SetStateAction<Color | null>>;
};

export const useColorActions = ({
  setWorkingColor,
}: UseColorActionsOptions) => {
  const colorFormat = useColorDisplaySettings(colorFormatSelector);
  const deleteColorConfirmState = useDisclosure();

  const copyColorClick = (color: Color) => {
    copyToClipboard(getColorStringView(color, colorFormat));
  };

  const deleteColorClick = (color: Color) => {
    setWorkingColor(color);
    deleteColorConfirmState.onOpen();
  };

  return {
    deleteColorConfirmState,

    actionsHandlers: {
      copyColorClick,
      deleteColorClick,
    },
  };
};
