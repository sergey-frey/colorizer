import { KyInstance } from "ky";
import { GenerateAIPaletteDto, GetAIPaletteDto } from "../dto";
import { aiApi } from "../instance";

class AiApiRepo {
  private _instance: KyInstance;

  constructor(instance: KyInstance) {
    this._instance = instance;
  }

  public async getPalette({
    amountOfColors,
  }: GetAIPaletteDto): Promise<GenerateAIPaletteDto> {
    return this._instance
      .post<GenerateAIPaletteDto>("palette", {
        json: {
          amountOfColors,
        },
      })
      .json();
  }
}

export const aiApiRepo = new AiApiRepo(aiApi);
