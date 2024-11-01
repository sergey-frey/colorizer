import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

export const SettingsNavigation = () => {
  return (
    <>
      <DesktopNavigation className="w-full hidden md:block" />
      <MobileNavigation />
    </>
  );
};
