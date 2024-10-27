import { cn } from "@nextui-org/theme";
import { HTMLAttributes, ReactNode } from "react";

type FullScreenPaletteHeaderContentViewProps =
  HTMLAttributes<HTMLUListElement> & {
    backButton?: ReactNode;
    paletteTitleForm?: ReactNode;
  };

export const FullScreenPaletteHeaderContentView = ({
  backButton,
  paletteTitleForm,
  className,
  ...props
}: FullScreenPaletteHeaderContentViewProps) => {
  return (
    <ul
      {...props}
      className={cn("grid grid-cols-3 items-center w-full", className)}
    >
      <li>{backButton}</li>
      <li className="justify-self-center">{paletteTitleForm}</li>
    </ul>
  );
};
