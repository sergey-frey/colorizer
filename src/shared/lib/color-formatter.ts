import { Color, ColorFormat } from "../types/color.types";
import { getTextColorByBg } from "./color";

class ColorFormatter {
  private _color: Color;

  constructor(color: Color) {
    this._color = color;
  }

  public toHEXString() {
    const { r, g, b, a } = this._color;

    const rHex = r.toString(16).padStart(2, "0");
    const gHex = g.toString(16).padStart(2, "0");
    const bHex = b.toString(16).padStart(2, "0");
    let aHex = Math.floor(a * 255)
      .toString(16)
      .padStart(2, "0");

    if (aHex === "ff") {
      aHex = "";
    }

    return `#${rHex}${gHex}${bHex}${aHex}`;
  }

  public toRGBAString() {
    const { r, g, b, a } = this._color;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  public style() {
    return this.toRGBAString();
  }

  public string(format: ColorFormat) {
    switch (format) {
      case "rgba": {
        return this.toRGBAString();
      }
      case "hex": {
        return this.toHEXString();
      }
    }
  }

  public contrastColor() {
    return new ColorFormatter(getTextColorByBg(this._color));
  }
}

export const colorFormatter = (color: Color) => {
  return new ColorFormatter(color);
};
