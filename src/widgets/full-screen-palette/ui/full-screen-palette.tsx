"use client";

import {
  FullScreenPaletteView,
  FullScreenPaletteViewFallback,
  useAddColorToPalette,
  useDeletePaletteMutation,
  usePalettesByIdQuery,
} from "@/src/entities/palette";
import { Confirm } from "@/src/features/confirm";
import { DynamicHeaderContent } from "@/src/features/dynamic-header-content";
import { Color } from "@/src/shared/types/color.types";
import { Palette } from "@/src/shared/types/palette.types";
import { ToggledInput } from "@/src/shared/ui/toggled-input";
import { WithFallback } from "@/src/shared/ui/with-fallback";
import { useBackNavigate } from "@/src/shared/utils/use-back-navigate";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HTMLAttributes, useEffect, useState } from "react";
import { PaletteActions } from "../constants/actions";
import { addColorButtonLoadingCalculate } from "../model/loading-states";
import { usePaletteActions } from "../model/use-palette-actions";
import { ActionsDropdown } from "./actions-dropdown";
import { AddColorModal } from "./add-color-modal";
import { FullScreenPaletteColorView } from "./full-screen-palette-color-view";
import { FullScreenPaletteHeaderContentView } from "./full-screen-palette-header-content-view";
import { MixColorsModal } from "./mix-colors-modal";

type FullScreenPaletteProps = HTMLAttributes<HTMLElement> & {
  paletteId: Palette["id"];
};

export const FullScreenPalette = ({
  paletteId,
  ...props
}: FullScreenPaletteProps) => {
  const paletteQuery = usePalettesByIdQuery(paletteId);
  const updatePaletteMutation = useAddColorToPalette(paletteId);
  const deletePaletteMutation = useDeletePaletteMutation();

  const { fromUrl, navigateBack } = useBackNavigate();

  const {
    addColorModalState,
    mixColorsModalState,
    getActionHandler,
    deletePaletteConfirmState,
  } = usePaletteActions();

  const [updatedPaletteTitle, setUpdatedPaletteTitle] = useState<string>(
    paletteQuery.data?.title ?? "",
  );

  useEffect(() => {
    setUpdatedPaletteTitle(paletteQuery.data?.title ?? "");
  }, [paletteQuery.data?.title]);

  const isLoadingAddColorButton = addColorButtonLoadingCalculate(
    paletteQuery,
    updatePaletteMutation,
  );

  const handleAddedColorSelect = (color: Color) => {
    if (!paletteQuery.isSuccess) return;

    const newPalette = {
      ...paletteQuery.data,
      colors: paletteQuery.data.colors.concat([color]),
    };

    updatePaletteMutation.mutateAsync(newPalette);
  };

  const handleDeletePaletteConfirm = (onClose: () => void) => {
    deletePaletteMutation
      .mutateAsync(paletteId)
      .finally(onClose)
      .then(navigateBack);
  };

  const handlePaletteTitleBlur = () => {
    if (!paletteQuery.isSuccess) return;

    updatePaletteMutation.mutateAsync({
      ...paletteQuery.data,
      title: updatedPaletteTitle,
    });
  };

  if (paletteQuery.isError) {
    notFound();
  }

  return (
    <>
      <DynamicHeaderContent>
        <FullScreenPaletteHeaderContentView
          backButton={
            <Button
              as={Link}
              href={fromUrl ?? "/"}
              size="sm"
              variant="light"
              isIconOnly
            >
              <ArrowLeftIcon className="w-5" />
            </Button>
          }
          paletteTitleForm={
            <ToggledInput
              value={updatedPaletteTitle}
              buttonProps={{
                variant: "light",
              }}
              inputProps={{
                onValueChange: setUpdatedPaletteTitle,
                onBlur: handlePaletteTitleBlur,
              }}
            />
          }
        />
      </DynamicHeaderContent>

      <WithFallback
        fallback={<FullScreenPaletteViewFallback className={props.className} />}
        isShowFallback={paletteQuery.isLoading}
      >
        <FullScreenPaletteView
          {...props}
          palette={paletteQuery.data!}
          colorsRender={(color, i) => {
            return <FullScreenPaletteColorView key={i} color={color} />;
          }}
          actions={
            <>
              <ActionsDropdown
                isIconOnly
                onAction={(actionKey) => getActionHandler(actionKey)()}
              >
                <EllipsisVerticalIcon className="w-5" />
              </ActionsDropdown>

              <Button
                color="primary"
                className="w-full sm:w-fit"
                endContent={<PlusIcon className="w-5" />}
                isLoading={isLoadingAddColorButton}
                onClick={getActionHandler(PaletteActions.add)}
              >
                Add color
              </Button>
            </>
          }
        />
      </WithFallback>

      <AddColorModal
        isOpen={addColorModalState.isOpen}
        onOpenChange={addColorModalState.onOpenChange}
        onSelectColor={handleAddedColorSelect}
      />

      {/* Обработчик добавления цвета т.к смешанный цвет тоже добавляется в палитру */}
      <MixColorsModal
        isOpen={mixColorsModalState.isOpen}
        onOpenChange={mixColorsModalState.onOpenChange}
        onApplyMixColors={handleAddedColorSelect}
        colors={paletteQuery.data?.colors ?? []}
      />

      <Confirm
        headerContent={"Delete confirm"}
        bodyContent={"Are you sure you want to delete palette?"}
        isOpen={deletePaletteConfirmState.isOpen}
        onOpenChange={deletePaletteConfirmState.onOpenChange}
        onConfirm={handleDeletePaletteConfirm}
      />
    </>
  );
};
