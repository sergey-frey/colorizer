"use client";

import { ColorView } from "@/src/entities/color";
import {
  FullScreenPaletteView,
  FullScreenPaletteViewFallback,
  useAddColorToPalette,
  usePalettesByIdQuery,
} from "@/src/entities/palette";
import { Color } from "@/src/shared/types/color.types";
import { Palette } from "@/src/shared/types/palette.types";
import { WithFallback } from "@/src/shared/ui/with-fallback";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { HTMLAttributes } from "react";
import { addColorButtonLoadingCalculate } from "../model/loading-states";
import { usePaletteActions } from "../model/use-palette-actions";
import { ActionsDropdown } from "./actions-dropdown";
import { AddColorModal } from "./add-color-modal";
import { MixColorsModal } from "./mix-colors-modal";
import { PaletteActions } from "../constants/actions";

type FullScreenPaletteProps = HTMLAttributes<HTMLElement> & {
  paletteId: Palette["id"];
};

export const FullScreenPalette = ({
  paletteId,
  ...props
}: FullScreenPaletteProps) => {
  const paletteQuery = usePalettesByIdQuery(paletteId);
  const addColorMutation = useAddColorToPalette(paletteId);

  const { addColorModalState, mixColorsModalState, getActionHandler } =
    usePaletteActions();

  const isLoadingAddColorButton = addColorButtonLoadingCalculate(
    paletteQuery,
    addColorMutation,
  );

  const handleAddedColorSelect = (color: Color) => {
    const currentColors = paletteQuery.data?.colors ?? [];
    addColorMutation.mutateAsync(currentColors.concat([color]));
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
            <>
              <ActionsDropdown
                isIconOnly
                onAction={getActionHandler(PaletteActions.mix)}
              >
                <EllipsisVerticalIcon className="w-5" />
              </ActionsDropdown>

              <Button
                color="primary"
                className="w-full"
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

      {/* Такой же обработчик т.к смешанный цвет тоже добавляется в палитру */}
      <MixColorsModal
        isOpen={mixColorsModalState.isOpen}
        onOpenChange={mixColorsModalState.onOpenChange}
        onApplyMixColors={handleAddedColorSelect}
        colors={paletteQuery.data?.colors ?? []}
      />
    </>
  );
};
