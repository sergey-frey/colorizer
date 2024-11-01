"use client";

import {
  headerContentSelector,
  useHeaderContent,
} from "@/src/features/dynamic-header-content";
import { cn } from "@nextui-org/theme";
import { HTMLAttributes } from "react";

type HeaderProps = HTMLAttributes<HTMLElement>;

export const Header = ({ className, ...props }: HeaderProps) => {
  const content = useHeaderContent(headerContentSelector);

  if (content === null) {
    return null;
  }

  return (
    <>
      <header {...props} className={cn("p-2 border-b-1", className)}>
        <div className="flex items-center">{content}</div>
      </header>
    </>
  );
};
