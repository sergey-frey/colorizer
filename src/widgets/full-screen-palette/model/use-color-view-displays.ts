import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
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

  return { Icons: { CopyIcon }, colors: { copyColor } };
};
