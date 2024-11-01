import { DynamicHeaderContent } from "@/src/features/dynamic-header-content";
import { ArrowLeftIcon, Bars2Icon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { useBackNavigate } from "@/src/shared/utils/use-back-navigate";
import { ROUTES } from "@/src/shared/constants/navigation";

export const SettingsNavigation = () => {
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();
  const { fromUrl } = useBackNavigate();

  return (
    <>
      <DynamicHeaderContent>
        <Button
          as={Link}
          href={fromUrl ?? ROUTES.home}
          isIconOnly
          size="sm"
          variant="light"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Button>

        <Button
          isIconOnly
          size="sm"
          onClick={onOpen}
          className="ml-auto md:hidden"
        >
          <Bars2Icon className="w-5 h-5" />
        </Button>
      </DynamicHeaderContent>

      <DesktopNavigation className="w-full hidden md:grid" />

      <MobileNavigation
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};
