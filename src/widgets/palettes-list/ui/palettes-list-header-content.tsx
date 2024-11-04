"use client";

import {
  useAddPaletteMutation,
  useAIPaletteMutation,
} from "@/src/entities/palette";
import { ROUTES, SearchParams } from "@/src/shared/constants/navigation";
import { makeLink } from "@/src/shared/lib/navigate";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";
import { useHeaderContentActions } from "../model/use-header-content-actions";
import { AddAiPaletteModal } from "./add-ai-palette-modal";
import { AddPaletteButton } from "./add-palette-button";

type PalettesListHeaderContentProps = HTMLAttributes<HTMLUListElement>;

export const PalettesListHeaderContent = ({
  className,
  ...props
}: PalettesListHeaderContentProps) => {
  const addPaletteMutation = useAddPaletteMutation();
  const addAIPaletteMutation = useAIPaletteMutation();
  const { addAIPaletteModalState, actionsHandlers } = useHeaderContentActions();
  const router = useRouter();

  const handleSubmitAmountOfColors = async (amount: number) => {
    const { data } = await addAIPaletteMutation.mutateAsync({
      amountOfColors: amount,
    });

    addPaletteMutation
      .mutateAsync(data)
      .then((newPalette) => {
        router.push(
          makeLink(ROUTES.palette(newPalette.id), {
            [SearchParams.from]: ROUTES.home,
          }),
        );
      })
      .finally(() => {
        addAIPaletteModalState.onClose();
      });
  };

  return (
    <>
      <ul {...props} className={cn("flex gap-2", className)}>
        <li>
          <AddPaletteButton color="primary" size="sm">
            New
          </AddPaletteButton>
        </li>

        <li>
          <Button
            size="sm"
            isIconOnly
            onClick={actionsHandlers.addAIPaletteClick}
          >
            <SparklesIcon className="w-5" />
          </Button>
        </li>
      </ul>

      <AddAiPaletteModal
        isOpen={addAIPaletteModalState.isOpen}
        onOpenChange={addAIPaletteModalState.onOpenChange}
        onSubmit={handleSubmitAmountOfColors}
        submitButton={
          <Button
            type="submit"
            isDisabled={addAIPaletteMutation.isPending}
            isLoading={addAIPaletteMutation.isPending}
          >
            Enter
          </Button>
        }
      />
    </>
  );
};
