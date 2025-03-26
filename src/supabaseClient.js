import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://TU_PROYECTO.supabase.co"; // reemplaza esto
const supabaseAnonKey = "TU_ANON_KEY"; // reemplaza esto

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
