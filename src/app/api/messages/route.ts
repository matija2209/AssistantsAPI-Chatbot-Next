import { getMessagesForThread, createThreadAndRun } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

const getCorsHeaders = (request: NextRequest): NextResponse => {
  const nextResponse = NextResponse.json({ isLogged: true }, { status: 200 });
  const allowedOrigins = [
    "http://localhost:3000",
    "https://chatty-chat.vercel.app",
  ];
  const origin = request.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    nextResponse.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    // Optional: Handle disallowed origins or null origin
    return new NextResponse("CORS error", { status: 403 });
  }

  nextResponse.headers.set("Access-Control-Allow-Methods", "*");
  nextResponse.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie"
  );

  // Return the modified nextResponse
  return nextResponse;
};

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
