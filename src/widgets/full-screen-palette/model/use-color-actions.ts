import { getRGBAStyle } from "@/src/shared/lib/color";
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
  const deleteColorConfirmState = useDisclosure();

  const copyColorClick = (color: Color) => {
    copyToClipboard(getRGBAStyle(color));
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
