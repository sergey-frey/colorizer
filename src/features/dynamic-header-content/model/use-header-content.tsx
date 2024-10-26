import { ReactNode } from "react";
import { create } from "zustand";

export type UseHeaderContent = {
  content: ReactNode;
  setContent: (content: ReactNode) => void;
};

export const useHeaderContent = create<UseHeaderContent>((set) => ({
  content: <></>,
  setContent: (content: ReactNode) => set({ content }),
}));
