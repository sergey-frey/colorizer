import { ROUTES } from "@/src/shared/constants/navigation";
import { SwatchIcon, UserIcon } from "@heroicons/react/24/outline";

export const navItems = [
  {
    href: ROUTES.settings.user,
    label: "User",
    icon: UserIcon,
  },
  {
    href: ROUTES.settings.colors,
    label: "Colors",
    icon: SwatchIcon,
  },
];
