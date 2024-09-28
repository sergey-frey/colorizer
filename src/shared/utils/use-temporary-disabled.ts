import { useState } from "react";

export const useTemporaryDisabled = (delay: number) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const disable = () => {
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, delay);
  };

  return {
    isDisabled,
    disable,
  };
};
