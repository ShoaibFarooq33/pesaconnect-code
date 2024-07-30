import { fetchData } from "@/lib/fetchData";
import { insertData } from "@/lib/insertData";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const axios = require("axios");
interface Headers {
  "Ocp-Apim-Subscription-Key": string;
  "X-Reference-Id": string;
  Authorization: string | null;
  "X-Target-Environment": string;
  "Content-Type": string;
  "X-Callback-Url"?: string;
}
const momoHost = process.env.MONOHOST!;
const SubscriptionKey = process.env.SUBSCRIPTIONKEY!;
const Environment = process.env.ENVIROMENT!;
export async function POST(req: Request) {
  try {
    const reqData = await req.json();
    const { amount, operatorId, orgId, phoneNumber } = reqData;
    await insertData(amount, operatorId, orgId, phoneNumber);
    const dataFetch = await fetchData();
    if (dataFetch) {
      const xReferenceId = uuidv4();
      const config: { headers: Headers } = {
        headers: {
          "Ocp-Apim-Subscription-Key": SubscriptionKey,
          "X-Reference-Id": xReferenceId,
          Authorization: req?.headers?.get("authorization"),
          "X-Target-Environment": Environment,
          "Content-Type": "application/json",
        },
      };
      const requestBody = {
        amount: amount.toString(),
        currency: "EUR",
        externalId: dataFetch?.id,
        payer: {
          partyIdType: "MSISDN",
          partyId: dataFetch?.organizationId.toString(),
        },
        payerMessage: "Test payment",
        payeeNote: "Payment for testing purposes",
        payee: {
          partyIdType: "MSISDN",
          partyId: dataFetch?.OpeartorId.toString(),
        },
        callbackUrl: req?.headers?.get("X-Callback-Url")!,
      };
      const response = await axios.post(
        `https://${momoHost}/collection/v1_0/requesttopay`,
        requestBody,
        config
      );
      return NextResponse.json(response.data);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
