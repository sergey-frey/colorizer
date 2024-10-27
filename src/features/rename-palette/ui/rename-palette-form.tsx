"use client";

import { ToggledInput, ToggledInputProps } from "@/src/shared/ui/toggled-input";
import { FormEvent, FormHTMLAttributes, useState } from "react";

type RenamePaletteFormProps = ToggledInputProps &
  Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    onSubmit?: (title: string) => void;
  };

export const ToggledInputForm = ({
  value: initialValue,
  inputProps,
  buttonProps,
  onSubmit,
  ...props
}: RenamePaletteFormProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      <ToggledInput
        inputProps={{
          ...inputProps,
          onValueChange: handleChange,
        }}
        buttonProps={{
          ...buttonProps,
        }}
        value={value}
      />
    </form>
  );
};

export const RenamePaletteForm = { ToggledInput };
