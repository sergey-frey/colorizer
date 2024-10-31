import { ColorView } from "@/src/entities/color";
import { Color } from "@/src/shared/types/color.types";
import { useTemporaryDisabled } from "@/src/shared/utils/use-temporary-disabled";
import { Button } from "@nextui-org/button";
import { useColorViewDisplays } from "../model/use-color-view-displays";

const copyButtonTimeout = 1500;

type FullScreenPaletteColorViewProps = {
  color: Color;
  onCopy?: (color: Color) => void;
  onDelete?: (color: Color) => void;
};

export const FullScreenPaletteColorView = ({
  color,
  onCopy,
  onDelete,
}: FullScreenPaletteColorViewProps) => {
  const { isDisabled: isCopyButtonDisabled, disable: disableCopyButton } =
    useTemporaryDisabled(copyButtonTimeout);

  const { Icons, colors } = useColorViewDisplays({ isCopyButtonDisabled });

  const handleCopyClick = () => {
    onCopy?.(color);
    disableCopyButton();
  };

  const handleDeleteClick = () => {
    onDelete?.(color);
  };

  return (
    <ColorView
      color={color}
      className="grow"
      actions={
        <>
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            color={colors.copyColor}
            isDisabled={isCopyButtonDisabled}
            onClick={handleCopyClick}
          >
            <Icons.CopyIcon className="w-5" />
          </Button>

          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onClick={handleDeleteClick}
          >
            <Icons.DeleteIcon className="w-5" />
          </Button>
        </>
      }
    />
  );
};
