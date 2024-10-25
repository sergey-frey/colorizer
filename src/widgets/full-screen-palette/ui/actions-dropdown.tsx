import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button, ButtonProps } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key } from "react";
import { PaletteActions } from "../constants/actions";

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
      </DropdownMenu>
    </Dropdown>
  );
};
