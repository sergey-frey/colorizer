import { Database } from "@/src/shared/types/db.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is not defined");
}

if (!supabaseKey) {
  throw new Error("SUPABASE_API_KEY is not defined");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
