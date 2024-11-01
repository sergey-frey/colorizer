import { DynamicHeaderContent } from "@/src/features/dynamic-header-content";
import { Screens } from "@/src/shared/constants/responsive";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@/src/shared/ui/drawer";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { navItems } from "../constants/nav-items";

export const MobileNavigation = () => {
  const isMd = useMediaQuery({ minWidth: Screens.md });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <DynamicHeaderContent isEmpty={isMd}>
        <div className="container mx-auto">
          <Button isIconOnly onClick={onOpen} className="md:hidden">
            <Bars2Icon className="w-5 h-5" />
          </Button>
        </div>
      </DynamicHeaderContent>

      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-w-none sm:max-w-xs"
      >
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
