import { SelectColorForm } from "@/src/features/select-color";
import { Color } from "@/src/shared/types/color.types";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/modal";

type AddColorModalProps = Omit<ModalProps, "children"> & {
  onSelectColor: (color: Color) => void;
};

export const AddColorModal = ({
  onSelectColor,
  ...props
}: AddColorModalProps) => {
  const onSubmit = (cb: () => void) => (color: Color) => {
    onSelectColor(color);
    cb();
  };

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add Color</ModalHeader>
            <ModalBody>
              <SelectColorForm
                onSubmit={onSubmit(onClose)}
                submitButton={
                  <Button type="submit" color="primary" className="mt-2">
                    Apply
                  </Button>
                }
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
