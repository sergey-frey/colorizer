import { Button } from "@nextui-org/button";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { navItems } from "../constants/nav-items";

export type DesktopNavigationProps = HTMLAttributes<HTMLUListElement>;

export const DesktopNavigation = ({ ...props }: DesktopNavigationProps) => {
  return (
    <>
      <ul {...props}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Button
                as={Link}
                href={item.href}
                startContent={<Icon className="w-5 h-5" />}
                className="w-full justify-start"
              >
                {item.label}
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
