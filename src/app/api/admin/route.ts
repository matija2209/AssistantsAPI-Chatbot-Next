import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { createAssistant, openai } from "@/lib/openai";

// TODO:! Hide behind middleware so it's protected.
export async function POST(req: NextRequest) {
  const { fileData } = await req.json();
  const binaryData = Buffer.from(fileData[0].base64Data, "base64");
  const assistant = await createAssistant();

  // Write the binary data to a file
  const filePath = "mydata.jsonl";
  fs.writeFileSync(filePath, binaryData);
  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: "assistants",
  });
  const myAssistantFile = await openai.beta.assistants.files.create(
    assistant.id,
    {
      file_id: file.id,
    }
  );
  return NextResponse.json({
    isDone: true,
    fileId: file.id,
    createdAt: myAssistantFile.created_at,
  });
}

export async function GET(req: NextRequest) {
  const assistant = await createAssistant();
  const assistantFiles = await openai.beta.assistants.files.list(assistant.id);
  return NextResponse.json({
    assistantId: assistant.id,
    files: assistantFiles.data,
  });
}
