import OpenAI from "openai";

const secretKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: secretKey,
});

let assistantInstance: any = null;

async function createAssistant() {
  if (!assistantInstance) {
    assistantInstance = await openai.beta.assistants.create({
      instructions:
        "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
      name: "Math Tutor",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4",
    });
  }
  return assistantInstance;
}

export const main = async (threadId: string | undefined, question: string) => {
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
