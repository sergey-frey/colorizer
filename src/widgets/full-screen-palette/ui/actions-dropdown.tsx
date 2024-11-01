import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button, ButtonProps } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key } from "react";
import { PaletteActions } from "../constants/actions";
import Link from "next/link";
import { ROUTES } from "@/src/shared/constants/navigation";

type ActionsDropdownProps = ButtonProps & {
  onAction: (actionKey: PaletteActions) => void;
};

export const ActionsDropdown = ({
  onAction,
  ...props
}: ActionsDropdownProps) => {
  return (
    <Dropdown backdrop="opaque">
      <DropdownTrigger>
        <Button {...props} />
      </DropdownTrigger>

      <DropdownMenu onAction={onAction as (key: Key) => void}>
        <DropdownItem
          startContent={<AdjustmentsHorizontalIcon className="w-5" />}
          key={PaletteActions.mix}
        >
          Mix colors
        </DropdownItem>
        <DropdownItem
          as={Link}
          href={ROUTES.settings.colors}
          startContent={<Cog6ToothIcon className="w-5" />}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          startContent={<TrashIcon className="w-5" />}
          key={PaletteActions.delete}
          color="danger"
        >
          Delete palette
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
