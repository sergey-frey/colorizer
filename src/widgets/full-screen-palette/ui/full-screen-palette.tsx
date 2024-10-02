"use client";

import {
  Color,
  Palette,
  useAddColorToPalette,
  usePalettesByIdQuery,
} from "@/src/entities/palette";
import { ColorView } from "@/src/features/color-view";
import { SelectColorForm } from "@/src/features/select-color";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";
import { FullScreenColorsList } from "./colors-list";

type FullScreenPaletteProps = HTMLAttributes<HTMLElement> & {
  paletteId: Palette["id"];
};

export const FullScreenPalette = ({
  paletteId,
  className,
  ...props
}: FullScreenPaletteProps) => {
  const paletteQuery = usePalettesByIdQuery(paletteId);
  const addColorMutation = useAddColorToPalette(paletteId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isLoadingAddColorButton =
    paletteQuery.isPending ||
    paletteQuery.isRefetching ||
    addColorMutation.isPending;

  const handleAddColorClick = () => {
    onOpen();
  };

  const handleAddedColorSelect = (cb: () => void) => (color: Color) => {
    const currentColors = paletteQuery.data?.colors ?? [];
    addColorMutation.mutateAsync(currentColors.concat([color]));
    cb();
  };

  return (
    <section
      {...props}
      className={cn("h-full", "grid grid-rows-[1fr_auto]", className)}
    >
      <FullScreenColorsList
        amountOfColors={paletteQuery.data?.colors.length ?? 4}
      >
        {paletteQuery.data?.colors.map((color, i) => {
          return <ColorView key={i} color={color} />;
        })}
      </FullScreenColorsList>

      <div className="p-2">
        <Button
          color="primary"
          className="w-full"
          endContent={<PlusIcon className="w-5" />}
          isLoading={isLoadingAddColorButton}
          onClick={handleAddColorClick}
        >
          Add color
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Color</ModalHeader>
              <ModalBody>
                <SelectColorForm
                  onSubmit={handleAddedColorSelect(onClose)}
                  submitButton={
                    <Button type="submit" color="primary" className="mt-2">
                      Apply
                    </Button>
                  }
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};
