import { getLocationOrigin } from "next/dist/shared/lib/utils";

export enum SearchParams {
  from = "from",
}

export const GLOBAL_BASE =
  typeof window === undefined ? "/" : getLocationOrigin();
