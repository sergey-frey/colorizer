"use client";

import {
  useAddPaletteMutation,
  useAIPaletteMutation,
} from "@/src/entities/palette";
import { SearchParams } from "@/src/shared/constants/navigation";
import { getPaletteLink } from "@/src/shared/lib/navigate";
import { DependOnPath } from "@/src/shared/ui/depend-on-search-params";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { useRouter } from "next/navigation";
import { HTMLAttributes, Suspense } from "react";
import { useHeaderActions } from "../model/use-header-actions";
import { AddAiPaletteModal } from "./add-ai-palette-modal";
import { AddPaletteButton } from "./add-palette-button";
import { BackLink } from "./back-link";

type HeaderProps = HTMLAttributes<HTMLElement>;

export const Header = ({ className, ...props }: HeaderProps) => {
  const router = useRouter();
  const { addAIPaletteModalState, actionsHandlers } = useHeaderActions();

  const addAIPaletteMutation = useAIPaletteMutation();
  const addPaletteMutation = useAddPaletteMutation();

  const isAddPaletteButtonLoading =
    addPaletteMutation.isPending || addAIPaletteMutation.isPending;

  const handleSubmitAmountOfColors = async (amount: number) => {
    console.log(amount);

    const { data } = await addAIPaletteMutation.mutateAsync({
      amountOfColors: amount,
    });

    console.log(data);

    addPaletteMutation
      .mutateAsync(data)
      .then((newPalette) => {
        router.push(
          getPaletteLink(newPalette.id, { [SearchParams.from]: "/" }),
        );
      })
      .finally(() => {
        addAIPaletteModalState.onClose();
      });
  };

  return (
    <>
      <header {...props} className={cn("p-2 border-b-1", className)}>
        <div className="flex items-center">
          <Suspense>
            <DependOnPath
              as={BackLink}
              deps={{ params: [SearchParams.from] }}
            />
          </Suspense>

          <div className="ml-auto flex items-center gap-2">
            <Suspense>
              <DependOnPath
                as={AddPaletteButton}
                deps={{
                  path: "/",
                }}
                size="sm"
                color="primary"
                isLoading={isAddPaletteButtonLoading}
                isDisabled={isAddPaletteButtonLoading}
              >
                New
              </DependOnPath>
            </Suspense>

            <Suspense>
              <DependOnPath
                as={Button}
                deps={{
                  path: "/",
                }}
                size="sm"
                isIconOnly
                onClick={actionsHandlers.addAIPaletteClick}
                isLoading={isAddPaletteButtonLoading}
                isDisabled={isAddPaletteButtonLoading}
              >
                <SparklesIcon className="w-5" />
              </DependOnPath>
            </Suspense>
          </div>
        </div>
      </header>

      <Suspense>
        <DependOnPath
          as={AddAiPaletteModal}
          deps={{ path: "/" }}
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
      </Suspense>
    </>
  );
};
