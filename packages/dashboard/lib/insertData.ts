import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertData(
  amount: any,
  operatorId: any,
  orgId: any,
  phoneNumber: any
) {
  const { data, error } = await supabase.from("Transactions").insert([
    {
      amount,
      OpeartorId: operatorId,
      organizationId: orgId,
      type: phoneNumber,
    },
  ]);
  console.log("data", data);
  if (data) {
    return data;
  } else {
    return error;
  }
}
