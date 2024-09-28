import { useState } from "react";

export const useColorViewControl = () => {
  const [isLocked, setIsLocked] = useState(false);

  const toggleLock = () => {
    setIsLocked((prev) => !prev);
  };

  return {
    isLocked,
    toggleLock,
  };
};
