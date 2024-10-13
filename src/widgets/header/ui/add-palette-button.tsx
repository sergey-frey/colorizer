"use client";

import { useAddPaletteMutation } from "@/src/entities/palette";
import { SearchParams } from "@/src/shared/constants/navigation";
import { getPaletteLink } from "@/src/shared/lib/navigate";
import { Button, ButtonProps } from "@nextui-org/button";
import { nanoid } from "nanoid";
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

    const paletteId = nanoid();

    addPaletteMutation.mutateAsync({ id: paletteId, colors: [] }).then(() => {
      router.push(getPaletteLink(paletteId, { [SearchParams.from]: "/" }));
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
