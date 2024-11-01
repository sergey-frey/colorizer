"use client";

import { DynamicHeaderContent } from "@/src/features/dynamic-header-content";
import { SettingsNavigation } from "@/src/widgets/settings-navigation";
import { cn } from "@nextui-org/theme";

export const SettingsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <DynamicHeaderContent isEmpty />

      <div className="container mx-auto grid p-2">
        <h1 className={cn("hidden text-xl mt-4", "md:block")}>Settings</h1>

        <div
          className={cn(
            "container mx-auto",
            "grid grid-cols-1",
            "md:grid-cols-4 md:mt-4",
            "lg:grid-cols-5",
          )}
        >
          <SettingsNavigation />
          {children}
        </div>
      </div>
    </>
  );
};
