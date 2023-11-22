import { getMessagesForThread, createThreadAndRun } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { question, threadId } = data;
  const { run, thread } = await createThreadAndRun(threadId, question);
  const runId = run.id;
  const newThreadId = thread.id;
  return NextResponse.json({ runId, threadId: newThreadId });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");
  if (!threadId) {
    return NextResponse.json({ noMessages: true });
  }
  const messages = await getMessagesForThread(threadId);
  return NextResponse.json(messages);
}
