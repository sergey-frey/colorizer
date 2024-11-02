import { CompactColorView } from "@/src/entities/color";
import { Color } from "@/src/shared/types/color.types";
import { cn } from "@nextui-org/theme";
import { FormEvent, FormHTMLAttributes, ReactNode } from "react";
import { STUB_COLOR } from "../constants/mixed-color";
import { getColorsByMixCounts, mixColors } from "../model/mix-colors";
import { useMixCounts } from "../model/use-mix-counts";
import { ColorControlButton } from "./color-control-button";
import { colorFormatter } from "@/src/shared/lib/color-formatter";

type MixColorsFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  colors: Color[];
  submitButton: ReactNode;
  onSubmit?: (color: Color) => void;
};

export const MixColorsForm = ({
  colors,
  submitButton,
  onSubmit,
  className,
  ...props
}: MixColorsFormProps) => {
  const { mixCounts, mixCountsMethods } = useMixCounts();

  const mixedColor = mixColors(getColorsByMixCounts(mixCounts));

  const handleColorClick = (color: Color) => () => {
    mixCountsMethods.increment(color);
  };

  const handleColorLongPress = (color: Color) => () => {
    mixCountsMethods.decrement(color);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!mixedColor) return;

    onSubmit?.(mixedColor);
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={cn("grid gap-2", className)}
    >
      <ul
        className={cn("grid grid-cols-4 gap-1")}
        style={{ gridTemplateColumns: `repeat(4, 1fr)` }}
      >
        {colors.map((color, i) => {
          const colorCount = mixCounts.get(color) ?? 0;
          const formatter = colorFormatter(color);

          return (
            <li key={i}>
              <ColorControlButton
                variant="solid"
                className="block p-0 min-w-full"
                style={{
                  backgroundColor: formatter.style(),
                  color: formatter.contrastColor().style(),
                }}
                onClick={handleColorClick(color)}
                onLongPress={handleColorLongPress(color)}
              >
                {Boolean(colorCount) && colorCount}
              </ColorControlButton>
            </li>
          );
        })}
      </ul>

      <section className="grid">
        <header>Result</header>
        <CompactColorView
          color={mixedColor || STUB_COLOR}
          className="w-full h-10 border rounded-medium"
        />
      </section>

      {submitButton}
    </form>
  );
};
