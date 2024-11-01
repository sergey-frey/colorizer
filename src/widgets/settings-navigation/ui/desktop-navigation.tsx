import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";
import { navItems } from "../constants/nav-items";

export type DesktopNavigationProps = HTMLAttributes<HTMLUListElement>;

export const DesktopNavigation = ({
  className,
  ...props
}: DesktopNavigationProps) => {
  const pathname = usePathname();

  return (
    <>
      <ul {...props} className={cn("grid gap-2", className)}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const buttonColor = isActive ? "primary" : "default";

          return (
            <li key={item.href}>
              <Button
                as={Link}
                href={item.href}
                color={buttonColor}
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
