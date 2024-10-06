"use client";

import { CompactPaletteView, usePalettesQuery } from "@/src/entities/palette";
import { getMockPalette } from "@/src/shared/lib/color";
import { WithFallback } from "@/src/shared/ui/with-fallback";
import { Skeleton } from "@nextui-org/skeleton";
import { cn } from "@nextui-org/theme";
import Link from "next/link";
import { HTMLAttributes } from "react";

type PalettesListProps = HTMLAttributes<HTMLUListElement>;

export const PalettesList = ({ className, ...props }: PalettesListProps) => {
  const palettesQuery = usePalettesQuery();
  const palettes = palettesQuery.isLoading
    ? Array.from({ length: 5 }, getMockPalette)
    : palettesQuery.data!;

  return (
    <ul {...props} className={cn("grid gap-2", className)}>
      {palettes.map((palette) => {
        return (
          <li key={palette.id}>
            <WithFallback
              fallback={<Skeleton className="h-14 rounded-medium" />}
              isLoading={palettesQuery.isLoading}
            >
              <Link href={`/${palette.id}`}>
                <CompactPaletteView palette={palette} />
              </Link>
            </WithFallback>
          </li>
        );
      })}
    </ul>
  );
};
