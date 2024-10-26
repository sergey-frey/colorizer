import { Screens } from "@/src/shared/constants/responsive";
import { Color } from "@/src/shared/types/color.types";
import { cn } from "@nextui-org/theme";
import { CSSProperties, HTMLAttributes } from "react";
import { useMediaQuery } from "react-responsive";

type FullScreenColorsListProps = HTMLAttributes<HTMLElement> & {
  colors: Color[];
};

export const FullScreenColorsList = ({
  colors,
  className,
  ...props
}: FullScreenColorsListProps) => {
  const isMd = useMediaQuery({ minWidth: Screens.md });

  const gridTemplateStyleKey: keyof CSSProperties = isMd
    ? "gridTemplateColumns"
    : "gridTemplateRows";

  return (
    <section
      {...props}
      className={cn("grid", "rounded-medium overflow-hidden", className)}
      style={{
        [gridTemplateStyleKey]: `repeat(${colors.length}, 1fr)`,
      }}
    />
  );
};
