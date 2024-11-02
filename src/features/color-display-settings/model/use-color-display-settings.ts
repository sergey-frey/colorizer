import type { ColorFormat } from "@/src/shared/types/color.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UseColorDisplaySettings = {
  format: ColorFormat;
  setFormat: (format: ColorFormat) => void;
};

export const useColorDisplaySettings = create<UseColorDisplaySettings>()(
  persist(
    (set) => ({
      format: "rgba",
      setFormat: (format) => set({ format }),
    }),
    { name: "color-display-settings" },
  ),
);
