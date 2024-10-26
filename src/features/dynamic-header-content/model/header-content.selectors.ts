import { UseHeaderContent } from "./use-header-content";

export const headerContentSelector = (state: UseHeaderContent) => {
  return state.content;
};

export const headerSetContentSelector = (state: UseHeaderContent) => {
  return state.setContent;
};
