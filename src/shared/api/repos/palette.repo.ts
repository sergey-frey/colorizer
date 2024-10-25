import { supabase } from "@/src/shared/api/supabase";
import { Color } from "@/src/shared/types/color.types";
import { Database } from "@/src/shared/types/db.types";
import { Palette } from "@/src/shared/types/palette.types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AddPaletteDto } from "../dto";
import { GenericSchema } from "@supabase/supabase-js/dist/module/lib/types";

class PaletteRepo {
  private _instance: SupabaseClient<Database, "public", GenericSchema>;

  constructor(instance: SupabaseClient<Database, "public", GenericSchema>) {
    this._instance = instance;
  }

  private _query() {
    return this._instance.from("palettes");
  }

  public async getAllPalettes() {
    const query = this._query().select<"*", Palette>();

    const { data, error } = await query;

    if (error || data === null) {
      return [];
    } else {
      return data;
    }
  }

  public async getPaletteById(paletteId: Palette["id"]) {
    const query = this._query()
      .select<"*", Palette>("*")
      .eq<Palette["id"]>("id", paletteId);

    const { data, error } = await query;

    if (error || data.length === 0) {
      throw new Error("SupabaseError: 'getPaletteById' finished with error");
    } else {
      return data[0];
    }
  }

  public async addColorToPalette(paletteId: Palette["id"], colors: Color[]) {
    const query = this._query()
      .update({ colors })
      .eq<Palette["id"]>("id", paletteId);

    const { error } = await query;

    if (error) {
      throw new Error("SupabaseError: 'addColorToPalette' finished with error");
    }
  }

  public async addPalette(dto: AddPaletteDto) {
    const query = this._query()
      .insert({
        colors: dto.colors,
      })
      .select()
      .returns<Palette[]>();

    const { data, error } = await query;

    if (error || data.length === 0) {
      throw new Error("SupabaseError: 'addPalette' finished with error");
    }

    return data[0];
  }
}

export const paletteRepo = new PaletteRepo(supabase);
