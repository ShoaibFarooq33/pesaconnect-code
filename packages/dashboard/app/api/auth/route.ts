import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
const axios = require("axios");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SubscriptionKey = process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY!;
const Environment = process.env.ENVIROMENT!;
const supabase = createClient(supabaseUrl, supabaseKey);
const apiKey = process.env.APIKEY!;
export async function POST() {
  try {
    const xReferenceId = uuidv4();
    const config = {
      headers: {
        "Ocp-Apim-Subscription-Key": "ef9a843c2ba346f5931894de551c5412",
        Authorization: `Basic ${Buffer.from(
          `b09c8894-f88e-5a23-b297-f2305561cbac:${apiKey}`
        ).toString("base64")}`,
      },
    };
    const response = await axios.post(
      `https://sandbox.momodeveloper.mtn.com/collection/token/`,
      null,
      config
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
