"use client";

import { queryClient } from "@/src/shared/query-client";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider className="contents">{children}</NextUIProvider>
    </QueryClientProvider>
  );
};
