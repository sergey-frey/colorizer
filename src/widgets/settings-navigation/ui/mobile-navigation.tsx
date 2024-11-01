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
import { usePathname } from "next/navigation";
import { navItems } from "../constants/nav-items";

type MobileNavigationProps = Omit<DrawerProps, "children">;

export const MobileNavigation = ({
  className,
  onClose,
  ...props
}: MobileNavigationProps) => {
  const pathname = usePathname();

  return (
    <>
      <Drawer {...props} className={cn("max-w-none", "sm:max-w-xs", className)}>
        <DrawerContent>
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <ul className="grid gap-2">
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
