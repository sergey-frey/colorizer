"use client";

import { Color } from "@/src/entities/palette";
import { cn } from "@nextui-org/theme";
import { FormEvent, FormHTMLAttributes, ReactNode } from "react";
import { ColorPicker, useColor } from "react-color-palette";

import "react-color-palette/css";
import { roundColorChannels } from "../model/round-color-channels";

type SelectColorFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  submitButton: ReactNode;
  onSubmit?: (color: Color) => void;
};

export const SelectColorForm = ({
  submitButton,
  className,
  onSubmit,
  ...props
}: SelectColorFormProps) => {
  const [color, setColor] = useColor("#000");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(roundColorChannels(color.rgb));
  };

  return (
    <form {...props} className={cn("grid", className)} onSubmit={handleSubmit}>
      <ColorPicker hideInput={["hsv"]} color={color} onChange={setColor} />

      {submitButton}
    </form>
  );
};
