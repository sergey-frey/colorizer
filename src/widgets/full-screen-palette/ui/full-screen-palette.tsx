"use client";

import {
  FullScreenPaletteView,
  FullScreenPaletteViewFallback,
} from "@/src/entities/palette";
import { Confirm } from "@/src/features/confirm";
import { DynamicHeaderContent } from "@/src/features/dynamic-header-content";
import { Palette } from "@/src/shared/types/palette.types";
import { ToggledInput } from "@/src/shared/ui/toggled-input";
import { WithFallback } from "@/src/shared/ui/with-fallback";
import { useBackNavigate } from "@/src/shared/utils/use-back-navigate";
import { useObservableState } from "@/src/shared/utils/use-observable-state";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HTMLAttributes } from "react";
import { PaletteActions } from "../constants/actions";
import { useFullScreenPaletteApi } from "../model/use-full-screen-palette-api";
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
  const {
    paletteQuery,
    loadingStates,
    handlers: apiHandlers,
  } = useFullScreenPaletteApi({
    paletteId,
  });

  const { fromUrl } = useBackNavigate();

  const {
    addColorModalState,
    mixColorsModalState,
    getActionHandler,
    deletePaletteConfirmState,
  } = usePaletteActions();

  const [updatedPaletteTitle, setUpdatedPaletteTitle] = useObservableState(
    paletteQuery.data?.title ?? "",
  );

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
                isDisabled: loadingStates.renamePaletteInput.isDisabled,
              }}
              inputProps={{
                onValueChange: setUpdatedPaletteTitle,
                onBlur: apiHandlers.paletteTitleBlur(updatedPaletteTitle),
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
                isLoading={loadingStates.addColorButton.isLoading}
                isDisabled={loadingStates.addColorButton.isDisabled}
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
        onSelectColor={apiHandlers.addedColorSelect}
      />

      {/* Обработчик добавления цвета т.к смешанный цвет тоже добавляется в палитру */}
      <MixColorsModal
        isOpen={mixColorsModalState.isOpen}
        onOpenChange={mixColorsModalState.onOpenChange}
        onApplyMixColors={apiHandlers.addedColorSelect}
        colors={paletteQuery.data?.colors ?? []}
      />

      <Confirm
        headerContent={"Delete confirm"}
        bodyContent={"Are you sure you want to delete palette?"}
        isOpen={deletePaletteConfirmState.isOpen}
        onOpenChange={deletePaletteConfirmState.onOpenChange}
        onConfirm={apiHandlers.deletePaletteConfirm}
      />
    </>
  );
};
