export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      palettes: {
        Row: {
          // the data expected from .select()
          id: string;
          title: string;
          colors: Json;
        };
        Insert: {
          // the data to be passed to .insert()
          id: string;
          title: string;
          colors: Json;
        };
        Update: {
          // the data to be passed to .update()
          id?: string;
          title?: string;
          colors?: Json;
        };
      };
    };
  };
}
