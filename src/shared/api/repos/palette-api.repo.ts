import { KyInstance } from "ky";
import { paletteApi } from "../instance";
import { Palette } from "../../types/palette.types";
import { AddPaletteDto } from "../dto";

class PaletteApiRepo {
  private _instance: KyInstance;

  constructor(instance: KyInstance) {
    this._instance = instance;
  }

  public getAllPalettes() {
    return this._instance.get<Palette[]>("").json();
  }

  public getPaletteById(paletteId: Palette["id"]) {
    return this._instance
      .get<Palette>("", { searchParams: { paletteId } })
      .json();
  }

  public addPalette(dto: AddPaletteDto) {
    return this._instance.post<Palette>("", { json: dto }).json();
  }

  public updatePalette(palette: Palette) {
    return this._instance.put<Palette>("", { json: palette }).json<Palette>();
  }

  public deletePalette(paletteId: Palette["id"]) {
    return this._instance
      .delete<Palette>("", { searchParams: { paletteId } })
      .json<void>();
  }
}

export const paletteApiRepo = new PaletteApiRepo(paletteApi);
