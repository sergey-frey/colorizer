import { useState } from "react";

type UseArrayStateResponse<T> = [
  T[],
  {
    push: (item: T) => void;
    filter: (
      filterCb: (value: T, index: number, array: T[]) => boolean,
    ) => void;
  },
];

export const useArrayState = <T>(
  initialState: T[],
): UseArrayStateResponse<T> => {
  const [state, setState] = useState<T[]>(initialState);

  const push = (item: T) => {
    setState((prev) => [...prev, item]);
  };

  const filter = (
    filterCb: (value: T, index: number, array: T[]) => boolean,
  ) => {
    setState((prev) => prev.filter(filterCb));
  };

  return [state, { push, filter }];
};
