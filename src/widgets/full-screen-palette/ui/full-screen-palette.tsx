"use client";

import { ColorView } from "@/src/entities/color";
import {
  FullScreenPaletteView,
  FullScreenPaletteViewFallback,
  useAddColorToPalette,
  usePalettesByIdQuery,
} from "@/src/entities/palette";
import { SelectColorForm } from "@/src/features/select-color";
import { Color } from "@/src/shared/types/color.types";
import { Palette } from "@/src/shared/types/palette.types";
import { WithFallback } from "@/src/shared/ui/with-fallback";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { HTMLAttributes } from "react";

type FullScreenPaletteProps = HTMLAttributes<HTMLElement> & {
  paletteId: Palette["id"];
};

export const FullScreenPalette = ({
  paletteId,
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
    <>
      <WithFallback
        fallback={<FullScreenPaletteViewFallback className={props.className} />}
        isLoading={paletteQuery.isLoading}
      >
        <FullScreenPaletteView
          {...props}
          palette={paletteQuery.data!}
          colorsRender={(color, i) => {
            return <ColorView key={i} color={color} />;
          }}
          actions={
            <Button
              color="primary"
              className="w-full"
              endContent={<PlusIcon className="w-5" />}
              isLoading={isLoadingAddColorButton}
              onClick={handleAddColorClick}
            >
              Add color
            </Button>
          }
        />
      </WithFallback>

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
    </>
  );
};
