import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchData() {
  const { data, error } = await supabase
    .from("Transactions")
    .select("*")
    .order("date", { ascending: false })
    .limit(1);
  if (data) {
    return data[0];
  } else {
    return error;
  }
}
