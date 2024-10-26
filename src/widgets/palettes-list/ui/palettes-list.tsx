"use client";

import { CompactPaletteView, usePalettesQuery } from "@/src/entities/palette";
import { SearchParams } from "@/src/shared/constants/navigation";
import { getMockPalette } from "@/src/shared/lib/color";
import { getPaletteLink } from "@/src/shared/lib/navigate";
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
    <ul
      {...props}
      className={cn(
        "container mx-auto",
        "grid gap-2",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        className,
      )}
    >
      {palettes.map((palette) => {
        return (
          <li key={palette.id}>
            <WithFallback
              fallback={<Skeleton className="h-14 rounded-medium" />}
              isLoading={palettesQuery.isLoading}
            >
              <Link
                href={getPaletteLink(palette.id, {
                  [SearchParams.from]: "/",
                })}
              >
                <CompactPaletteView palette={palette} />
              </Link>
            </WithFallback>
          </li>
        );
      })}
    </ul>
  );
};
