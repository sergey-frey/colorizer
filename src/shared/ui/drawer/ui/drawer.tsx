import React from "react";
import {
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";

export type DrawerProps = Omit<
  ModalProps,
  "fullScreen" | "closeButton" | "animated" | "blur"
>;

export const Drawer = ({ children, className, ...props }: DrawerProps) => {
  return (
    <Modal
      classNames={{
        wrapper: "w-full",
      }}
      className={cn("fixed top-0 left-0 bottom-0", className)}
      motionProps={{
        variants: {
          enter: {
            translateX: "0%",
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
          exit: {
            translateX: "-100%",
            transition: {
              duration: 0.5,
              ease: "easeIn",
            },
          },
        },
      }}
      placement="top"
      size="full"
      {...props}
    >
      {children}
    </Modal>
  );
};

export const DrawerContent = ModalContent;
export const DrawerHeader = ModalHeader;
export const DrawerBody = ModalBody;
export const DrawerFooter = ModalFooter;
