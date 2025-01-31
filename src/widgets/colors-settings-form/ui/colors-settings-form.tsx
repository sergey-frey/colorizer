"use client";

import { ColorBadge } from "@/src/entities/color";
import {
  colorFormatSelector,
  colorSetFormatSelector,
  useColorDisplaySettings,
} from "@/src/features/color-display-settings";
import {
  ALL_POSSIBLE_FORMATS,
  WHITE_COLOR,
} from "@/src/shared/constants/color";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import { cn } from "@nextui-org/theme";

const amountOfFormats = ALL_POSSIBLE_FORMATS.length;

export const ColorsSettingsForm = () => {
  const setColorFormat = useColorDisplaySettings(colorSetFormatSelector);
  const currentColorFormat = useColorDisplaySettings(colorFormatSelector);

  return (
    <section className="pt-6 md:pt-0">
      <div
        className={cn(
          "flex flex-col items-start",
          "sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <h2 className="text-sm text-slate-600">
          Color format:{" "}
          <ColorBadge color={WHITE_COLOR} format={currentColorFormat} />
        </h2>
        <ButtonGroup
          size="sm"
          className="grid w-full mt-2 sm:mt-0 sm:w-auto"
          style={{ gridTemplateColumns: `repeat(${amountOfFormats}, 1fr)` }}
        >
          {ALL_POSSIBLE_FORMATS.map((format, i) => {
            const isActive = format === currentColorFormat;
            const buttonColor = isActive ? "primary" : "default";

            return (
              <Button
                key={i}
                color={buttonColor}
                onClick={() => setColorFormat(format)}
              >
                {format}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>

      <Divider className="my-2" />
    </section>
  );
};
