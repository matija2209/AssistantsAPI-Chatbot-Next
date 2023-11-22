import { createAssistant, openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const assistant = await createAssistant();
  const assistantFiles = await openai.beta.assistants.files.list(assistant.id);
  return NextResponse.json({
    files: assistantFiles.data,
  });
}
