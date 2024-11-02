import { ROUTES } from "@/src/shared/constants/navigation";
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button, ButtonProps } from "@nextui-org/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { PaletteActions } from "../constants/actions";

type ActionsDropdownProps = ButtonProps & {
  onAction: (actionKey: PaletteActions) => void;
};

export const ActionsDropdown = ({
  onAction,
  ...props
}: ActionsDropdownProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOptionClick = (key: PaletteActions) => () => {
    onClose();
    onAction(key);
  };

  return (
    <Popover backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger onClick={onOpen}>
        <Button {...props} />
      </PopoverTrigger>

      <PopoverContent className="p-1">
        <Button
          className="w-full justify-start"
          variant="light"
          startContent={<AdjustmentsHorizontalIcon className="w-5" />}
          onClick={handleOptionClick(PaletteActions.mix)}
        >
          Mix colors
        </Button>
        <Button
          as={Link}
          href={ROUTES.settings.colors}
          className="w-full justify-start"
          variant="light"
          startContent={<Cog6ToothIcon className="w-5" />}
        >
          Settings
        </Button>
        <Button
          className="w-full justify-start"
          variant="light"
          startContent={<TrashIcon className="w-5" />}
          color="danger"
          onClick={handleOptionClick(PaletteActions.delete)}
        >
          Delete palette
        </Button>
      </PopoverContent>
    </Popover>
  );
};
