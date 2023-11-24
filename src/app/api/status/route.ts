import { statusOfRun } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");
  const runId = searchParams.get("runId");
  if (!threadId || !runId) throw Error("No threadId or runId");
  const status = await statusOfRun(threadId, runId);
  return NextResponse.json({ status });
}
