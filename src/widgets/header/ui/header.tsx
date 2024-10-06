import { cn } from "@nextui-org/theme";
import { HTMLAttributes, Suspense } from "react";
import { BackLink } from "./back-link";

type HeaderProps = HTMLAttributes<HTMLElement>;

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header {...props} className={cn("p-2 border-b-1", className)}>
      <Suspense>
        <BackLink />
      </Suspense>
    </header>
  );
};
