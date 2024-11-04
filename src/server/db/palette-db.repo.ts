import { AddPaletteDto } from "@/src/shared/api/dto";
import { Database } from "@/src/shared/types/db.types";
import { Palette } from "@/src/shared/types/palette.types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { GenericSchema } from "@supabase/supabase-js/dist/module/lib/types";
import { supabase } from "./supabase";

class PaletteDBRepo {
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

  public async updatePalette(palette: Palette) {
    const query = this._query()
      .update({ ...palette })
      .eq<Palette["id"]>("id", palette.id)
      .select()
      .returns<Palette[]>();

    const { data, error } = await query;

    if (error) {
      throw new Error("SupabaseError: 'addColorToPalette' finished with error");
    }

    return data[0];
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

  public async deletePalette(paletteId: Palette["id"]) {
    const { error } = await this._query()
      .delete()
      .eq<Palette["id"]>("id", paletteId);

    if (error) {
      throw new Error("SupabaseError: 'deletePalette' finished with error");
    }
  }
}

export const paletteDBRepo = new PaletteDBRepo(supabase);
