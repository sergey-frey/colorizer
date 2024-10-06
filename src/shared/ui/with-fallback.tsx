import { ReactNode } from "react";

type WithFallBackProps = {
  fallback: ReactNode;
  isLoading: boolean;
  children: ReactNode;
};

export const WithFallback = ({
  fallback,
  isLoading,
  children,
}: WithFallBackProps) => {
  if (isLoading) return fallback;

  return children;
};
