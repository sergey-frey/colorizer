import { Database } from "@/src/shared/types/db.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://byscqyjpqifbuwwoazbk.supabase.co";
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseKey) {
  throw new Error("SUPABASE_API_KEY is not defined");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
