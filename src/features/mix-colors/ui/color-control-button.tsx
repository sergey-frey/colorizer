import { Button, ButtonProps } from "@nextui-org/button";
import { useLongPress } from "use-long-press";

type ColorControlButtonProps = ButtonProps & {
  onLongPress: () => void;
};

export const ColorControlButton = ({
  onLongPress,
  ...props
}: ColorControlButtonProps) => {
  const bind = useLongPress(onLongPress);

  return <Button {...props} {...bind()} />;
};
