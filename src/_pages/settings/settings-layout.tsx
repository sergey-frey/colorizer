"use client";

import { DynamicHeaderContent } from "@/src/features/dynamic-header-content";
import { SettingsNavigation } from "@/src/widgets/settings-navigation";
import { cn } from "@nextui-org/theme";
import { Suspense } from "react";

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
            "md:mt-4 md:grid-cols-4",
            "lg:grid-cols-5",
          )}
        >
          <Suspense>
            <SettingsNavigation />
          </Suspense>

          <div className="md:[grid-column:2/5] lg:[grid-column:2/6]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
