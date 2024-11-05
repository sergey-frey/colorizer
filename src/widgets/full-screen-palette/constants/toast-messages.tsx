import { ColorBadge } from "@/src/entities/color";
import { Color, ColorFormat } from "@/src/shared/types/color.types";
import { PossibleToastStatus } from "@/src/shared/types/toast.types";
import { FullScreenToastStatusMessages } from "../types/toast";

export const TOAST_MESSAGES: Record<
  Extract<PossibleToastStatus, "success" | "error">,
  FullScreenToastStatusMessages
> = {
  success: {
    addColor: (color: Color, format: ColorFormat) => (
      <>
        Color <ColorBadge color={color} format={format} /> added
      </>
    ),

    deletePalette: (title: string) => (
      <>
        Palette <b>{title}</b> deleted
      </>
    ),

    titleUpdate: (title: string) => (
      <>
        Palette title updated to <b>{title}</b>
      </>
    ),

    deleteColor: (color: Color, format: ColorFormat) => (
      <>
        Color <ColorBadge color={color} format={format} /> deleted
      </>
    ),
  },

  error: {
    addColor: (color: Color, format: ColorFormat) => (
      <>
        Failed to add <ColorBadge color={color} format={format} /> color
      </>
    ),

    deletePalette: (title: string) => (
      <>
        Failed to delete <b>{title}</b> palette
      </>
    ),

    titleUpdate: (title: string) => (
      <>
        Failed to update title to <b>{title}</b>
      </>
    ),

    deleteColor: (color: Color, format: ColorFormat) => (
      <>
        Failed to delete <ColorBadge color={color} format={format} /> color
      </>
    ),
  },
} as const;
