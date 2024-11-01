import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerProps,
} from "@/src/shared/ui/drawer";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import Link from "next/link";
import { navItems } from "../constants/nav-items";

type MobileNavigationProps = Omit<DrawerProps, "children">;

export const MobileNavigation = ({
  className,
  onClose,
  ...props
}: MobileNavigationProps) => {
  return (
    <>
      <Drawer {...props} className={cn("max-w-none", "sm:max-w-xs")}>
        <DrawerContent>
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <ul>
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Button
                      as={Link}
                      href={item.href}
                      startContent={<Icon className="w-5 h-5" />}
                      className="w-full justify-start"
                      onClick={onClose}
                    >
                      {item.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
