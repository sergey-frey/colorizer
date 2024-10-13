"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ComponentProps, createElement, FC } from "react";
import { SearchParams } from "../constants/navigation";

type DependOnPathProps<T extends FC> = {
  as: T;
  deps: {
    params?: SearchParams[];
    path?: string;
  };
} & ComponentProps<T>;

export function DependOnPath<T extends FC>({
  as,
  deps,
  ...props
}: DependOnPathProps<T>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const requiredDeps = {
    params: deps.params ?? [],
    path: deps.path ?? undefined,
  };

  const isParamsMatched = requiredDeps.params.every((param) =>
    searchParams.has(param),
  );

  const isPathMatched =
    requiredDeps.path === undefined || pathname === requiredDeps.path;

  if ((isParamsMatched && isPathMatched) === false) return null;

  return createElement(as, { ...(props as unknown as ComponentProps<T>) });
}
