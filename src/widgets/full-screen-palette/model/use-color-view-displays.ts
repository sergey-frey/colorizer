import {
  CheckCircleIcon,
  ClipboardIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ButtonProps } from "@nextui-org/button";

type UseColorViewDisplaysOptions = {
  isCopyButtonDisabled: boolean;
};

export const useColorViewDisplays = ({
  isCopyButtonDisabled,
}: UseColorViewDisplaysOptions) => {
  const CopyIcon = isCopyButtonDisabled ? CheckCircleIcon : ClipboardIcon;
  const copyColor: ButtonProps["color"] = isCopyButtonDisabled
    ? "success"
    : "default";

  const DeleteIcon = TrashIcon;

  return { Icons: { CopyIcon, DeleteIcon }, colors: { copyColor } };
};
