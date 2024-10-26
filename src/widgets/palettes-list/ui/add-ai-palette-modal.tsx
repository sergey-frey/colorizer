"use client";

import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/modal";
import { FormEvent, ReactNode, useState } from "react";

type AddAiPaletteModalProps = Omit<ModalProps, "children" | "onSubmit"> & {
  onSubmit?: (amount: number) => void | Promise<void>;
  submitButton: ReactNode;
};

export const AddAiPaletteModal = ({
  onSubmit,
  submitButton,
  ...props
}: AddAiPaletteModalProps) => {
  const [amountOfColors, setAmountOfColors] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(amountOfColors);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setAmountOfColors(Number(e.currentTarget.value));
  };

  return (
    <Modal as={"dialog"} {...props}>
      <ModalContent>
        <>
          <ModalHeader>Add AI Palette</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Input
                type="number"
                placeholder="Amount of colors"
                onChange={handleInputChange}
              />

              {submitButton}
            </form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};
