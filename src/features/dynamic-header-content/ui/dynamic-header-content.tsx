import { ReactNode, useEffect } from "react";
import { useHeaderContent } from "../model/use-header-content";
import { headerSetContentSelector } from "../model/header-content.selectors";

type DynamicHeaderContentProps = {
  children: ReactNode;
};

export const DynamicHeaderContent = ({
  children,
}: DynamicHeaderContentProps) => {
  const setContent = useHeaderContent(headerSetContentSelector);

  /* 
    Контент в HEADER будет меняться на каждый рендер children
    Так же, как если бы это был прямой наследник компонента 
  */
  useEffect(() => {
    setContent(children);
  }, [children, setContent]);

  return null;
};
