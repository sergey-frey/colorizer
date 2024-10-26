import { ReactNode } from "react";
import { useHeaderContent } from "../model/use-header-content";
import { headerSetContentSelector } from "../model/header-content.selectors";

type DynamicHeaderContentProps = {
  children: ReactNode;
};

export const DynamicHeaderContent = ({
  children,
}: DynamicHeaderContentProps) => {
  const setContent = useHeaderContent(headerSetContentSelector);

  setContent(children);

  return null;
};
