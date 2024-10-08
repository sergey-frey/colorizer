import { MixColorsForm } from "@/src/features/mix-colors";
import { Color } from "@/src/shared/types/color.types";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/modal";

type MixColorsModalProps = Omit<ModalProps, "children"> & {
  colors: Color[];
  onApplyMixColors: (color: Color) => void;
};

export const MixColorsModal = ({
  colors,
  onApplyMixColors,
  ...props
}: MixColorsModalProps) => {
  const onSubmit = (cb: () => void) => (color: Color) => {
    onApplyMixColors(color);
    cb();
  };

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Mix Colors</ModalHeader>
            <ModalBody>
              <MixColorsForm
                colors={colors}
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
