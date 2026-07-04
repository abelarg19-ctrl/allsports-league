import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xzmzyxiivtcqvpcbixvj.supabase.co";
const supabaseAnonKey = "sb_publishable_6HL68m_z5fY-qaS40UDZdg_VllgFZm5";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);