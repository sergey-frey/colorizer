import { Button, ButtonProps } from "@nextui-org/button";
import { Input, InputProps } from "@nextui-org/input";
import { FocusEvent, MouseEvent, useEffect, useRef, useState } from "react";

export type ToggledInputProps = {
  buttonProps?: ButtonProps;
  inputProps?: InputProps;
  value: string;
};

export const ToggledInput = ({
  value,
  buttonProps,
  inputProps,
}: ToggledInputProps) => {
  const [isInput, setIsInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    buttonProps?.onClick?.(e);
    setIsInput(true);
  };

  const handleInputBlur = (e: FocusEvent<Element, Element>) => {
    inputProps?.onBlur?.(e);
    setIsInput(false);
  };

  useEffect(() => {
    if (isInput) {
      inputRef.current?.focus();
    }
  }, [isInput]);

  if (isInput) {
    return (
      <Input
        {...inputProps}
        ref={inputRef}
        value={value}
        onBlur={handleInputBlur}
      />
    );
  }

  return (
    <Button {...buttonProps} onClick={handleClickButton}>
      {value}
    </Button>
  );
};
