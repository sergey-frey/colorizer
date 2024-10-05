"use client";

import { CompactPaletteView, usePalettesQuery } from "@/src/entities/palette";
import { cn } from "@nextui-org/theme";
import Link from "next/link";
import { HTMLAttributes } from "react";

type PalettesListProps = HTMLAttributes<HTMLUListElement>;

export const PalettesList = ({ className, ...props }: PalettesListProps) => {
  const palettesQuery = usePalettesQuery();

  return (
    <ul {...props} className={cn("p-4", "grid gap-2", className)}>
      {palettesQuery.data?.map((palette) => {
        return (
          <li key={palette.id}>
            <Link href={`/${palette.id}`}>
              <CompactPaletteView palette={palette} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
