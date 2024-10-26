import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/modal";
import { ReactNode } from "react";

type ConfirmProps = Omit<ModalProps, "children"> & {
  headerContent?: ReactNode;
  bodyContent?: ReactNode;
  onConfirm?: (onClose: () => void) => void;
  onCancel?: (onClose: () => void) => void;
};

export const Confirm = ({
  headerContent,
  bodyContent,
  onConfirm,
  ...props
}: ConfirmProps) => {
  const handleConfirmClick = (onClose: () => void) => {
    return () => onConfirm?.(onClose);
  };

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader>{headerContent}</ModalHeader>
              <ModalBody>{bodyContent}</ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleConfirmClick(onClose)}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};
