import { ReactNode } from "react";

export type WithFallBackProps = {
  fallback: ReactNode;
  isShowFallback: boolean;
  children: ReactNode;
};

export const WithFallback = ({
  fallback,
  isShowFallback,
  children,
}: WithFallBackProps) => {
  if (isShowFallback) return fallback;

  return children;
};
