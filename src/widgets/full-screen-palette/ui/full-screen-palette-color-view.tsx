import { ColorView } from "@/src/entities/color";
import { getRGBAStyle } from "@/src/shared/lib/color";
import { Color } from "@/src/shared/types/color.types";
import { copyToClipboard } from "@/src/shared/utils/copy";
import { useTemporaryDisabled } from "@/src/shared/utils/use-temporary-disabled";
import { Button } from "@nextui-org/button";
import { useColorViewDisplays } from "../model/use-color-view-displays";

const copyButtonTimeout = 1500;

type FullScreenPaletteColorViewProps = {
  color: Color;
};

export const FullScreenPaletteColorView = ({
  color,
}: FullScreenPaletteColorViewProps) => {
  const { isDisabled: isCopyButtonDisabled, disable: disableCopyButton } =
    useTemporaryDisabled(copyButtonTimeout);

  const { Icons, colors } = useColorViewDisplays({ isCopyButtonDisabled });

  const handleCopyClick = () => {
    copyToClipboard(getRGBAStyle(color));
    disableCopyButton();
  };

  return (
    <ColorView
      color={color}
      className="h-full"
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
        </>
      }
    />
  );
};
