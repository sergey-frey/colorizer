import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

type UseQueryStatusHandlingOptions = {
  query: UseQueryResult;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useQueryStatusHandling = ({
  query,
  onSuccess,
  onError,
}: UseQueryStatusHandlingOptions) => {
  const { error, isSuccess } = query;

  useEffect(() => {
    if (!isSuccess) return;

    onSuccess?.();
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (error === null) return;

    onError?.(error);
  }, [error, onError]);
};
