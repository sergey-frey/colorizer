"use client";

import { getRGBAStyle } from "@/src/shared/lib/color";
import { Color } from "@/src/shared/types/color.types";
import { copyToClipboard } from "@/src/shared/utils/copy";
import { useTemporaryDisabled } from "@/src/shared/utils/use-temporary-disabled";
import {
  CheckCircleIcon,
  ClipboardIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";
import { useColorViewControl } from "../model/use-color-view-control";
import { ColorCodePreview } from "./color-code-preview";
import { ColorViewLayout } from "./color-view-layout";
import { ControlsList } from "./controls-list";

type ColorViewProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  color: Color;
};

export const ColorView = ({ color, ...props }: ColorViewProps) => {
  const { isLocked, toggleLock } = useColorViewControl();
  const { isDisabled: isCopyButtonDisabled, disable: disableCopyButton } =
    useTemporaryDisabled(1500);

  const LockIcon = isLocked ? LockClosedIcon : LockOpenIcon;
  const CopyIcon = isCopyButtonDisabled ? CheckCircleIcon : ClipboardIcon;

  const handleLockClick = () => {
    toggleLock();
  };

  const handleCopyClick = () => {
    copyToClipboard(getRGBAStyle(color));
    disableCopyButton();
  };

  return (
    <ColorViewLayout
      {...props}
      style={{ backgroundColor: getRGBAStyle(color) }}
      colorCodePreview={<ColorCodePreview color={color} />}
      controlsList={
        <ControlsList>
          <Button
            isIconOnly
            isDisabled={isCopyButtonDisabled}
            variant="flat"
            color={isCopyButtonDisabled ? "success" : "default"}
            size="sm"
            className={cn("disabled:opacity-100")}
            onClick={handleCopyClick}
          >
            <CopyIcon className="w-4" />
          </Button>

          <Button isIconOnly variant="flat" size="sm" onClick={handleLockClick}>
            <LockIcon className="w-4" />
          </Button>
        </ControlsList>
      }
    />
  );
};
