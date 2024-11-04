"use client";

import { useAddPaletteMutation } from "@/src/entities/palette";
import { ROUTES, SearchParams } from "@/src/shared/constants/navigation";
import { makeLink } from "@/src/shared/lib/navigate";
import { Button, ButtonProps } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type AddPaletteButtonProps = ButtonProps & {};

export const AddPaletteButton = ({
  onClick,
  ...props
}: AddPaletteButtonProps) => {
  const addPaletteMutation = useAddPaletteMutation();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    addPaletteMutation.mutateAsync({ colors: [] }).then((newPalette) => {
      router.push(
        makeLink(ROUTES.palette(newPalette.id), {
          [SearchParams.from]: ROUTES.home,
        }),
      );
    });
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      isDisabled={addPaletteMutation.isPending}
      isLoading={addPaletteMutation.isPending}
    />
  );
};
