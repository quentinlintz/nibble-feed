import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";
import * as actions from "@/actions";

async function handler(request: NextRequest) {
  const body = await request.json();

  console.log(body);
  const decoded = Buffer.from(body.sourceBody, "base64");
  const payload = JSON.parse(decoded.toString());

  if (payload.stepNumber === 4) {
    await actions.updateNibbleStatus(payload.nibbleId, "complete");
  }

  return NextResponse.json({ success: true });
}

export const POST = verifySignatureAppRouter(handler);
