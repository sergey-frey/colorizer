import { useEffect, useState } from "react";

export const useObservableState = <T>(observableValue: T) => {
  const [result, setResult] = useState<T>(observableValue);

  useEffect(() => {
    setResult(observableValue);
  }, [observableValue]);

  return [result, setResult] as const;
};
