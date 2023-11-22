import OpenAI from "openai";
import fs from "fs";
const secretKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: secretKey,
});

// Database for storing assistant ID.
const assistantIdFilePath = "assistantId.txt";

export const createAssistant = async () => {
  // Try to read the assistant ID from the file
  let assistantId;
  try {
    assistantId = fs.readFileSync(assistantIdFilePath, "utf8");
  } catch (error) {
    console.log("Assistant ID file not found, creating a new assistant");
  }

  if (!assistantId) {
    const assistantInstance = await openai.beta.assistants.create({
      instructions:
        "You are customer support agent trying to help the customer",
      name: "Customer Support Bot",
      tools: [{ type: "retrieval" }],
      model: "gpt-3.5-turbo-1106",
    });

    // Save the assistant ID to a file
    fs.writeFileSync(assistantIdFilePath, assistantInstance.id);

    return assistantInstance;
  } else {
    // If the assistant ID is already stored, return the ID
    return { id: assistantId };
  }
};

export const createThreadAndRun = async (
  threadId: string | undefined,
  question: string
) => {
  const myAssistant = await createAssistant();
  const thread = await createThread(threadId);
  await addMessageToThread(thread.id, question);
  const run = await createRun(myAssistant.id, thread.id);
  return { run, thread };
};

export const createThread = async (threadId: string | undefined) => {
  try {
    if (threadId) {
      return await openai.beta.threads.retrieve(threadId);
    }
    return await openai.beta.threads.create();
  } catch (error: any) {
    throw error;
  }
};

export const addMessageToThread = async (
  threadId: string,
  question: string
) => {
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: question,
  });
};

export const createRun = async (assistantId: string, threadId: string) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  return run;
};

export const statusOfRun = async (threadId: string, runId: string) => {
  let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  return runStatus.status;
};

export const getMessagesForThread = async (threadId: string) => {
  const messages = await openai.beta.threads.messages.list(threadId);
  return messages;
};

export const uploadFile = async () => {
  const file = await openai.files.create({
    file: fs.createReadStream("mydata.jsonl"),
    purpose: "fine-tune",
  });
};
