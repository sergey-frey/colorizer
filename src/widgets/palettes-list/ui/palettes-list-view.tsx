import { cn } from "@nextui-org/theme";
import { HTMLAttributes, ReactNode } from "react";

type PalettesListViewProps = HTMLAttributes<HTMLUListElement> & {
  palettes: ReactNode;
};

export const PalettesListView = ({
  className,
  palettes,
  ...props
}: PalettesListViewProps) => {
  return (
    <ul
      {...props}
      className={cn(
        "container",
        "grid gap-2",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        className,
      )}
    >
      {palettes}
    </ul>
  );
};
