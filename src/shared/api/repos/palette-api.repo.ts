import { ApiResponse } from "@/src/shared/types/api.types";
import { Palette } from "@/src/shared/types/palette.types";
import { KyInstance, KyResponse } from "ky";
import { AddPaletteDto } from "../dto";
import { paletteApi } from "../instance";

class PaletteApiRepo {
  private _instance: KyInstance;

  constructor(instance: KyInstance) {
    this._instance = instance;
  }

  private async _handle<T>(response: KyResponse<ApiResponse<T>>) {
    const parsedResponse = await response.json();

    if (!response.ok) {
      throw new Error(parsedResponse?.message ?? "Unexpected error");
    }

    return parsedResponse.data;
  }

  public getAllPalettes = async () => {
    return this._handle<Palette[]>(
      await this._instance.get<ApiResponse<Palette[]>>(""),
    );
  };

  public getPaletteById = async (paletteId: Palette["id"]) => {
    return this._handle(
      await this._instance.get<ApiResponse<Palette>>("", {
        searchParams: { paletteId },
      }),
    );
  };

  public addPalette = async (dto: AddPaletteDto) => {
    return this._handle<Palette>(
      await this._instance.post<ApiResponse<Palette>>("", {
        json: dto,
      }),
    );
  };

  public updatePalette = async (palette: Palette) => {
    return this._handle<Palette>(
      await this._instance.put<Palette>("", { json: palette }),
    );
  };

  public deletePalette(paletteId: Palette["id"]) {
    return this._instance
      .delete<Palette>("", { searchParams: { paletteId } })
      .json<void>();
  }
}

export const paletteApiRepo = new PaletteApiRepo(paletteApi);
