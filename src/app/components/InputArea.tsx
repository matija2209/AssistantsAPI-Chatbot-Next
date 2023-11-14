import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";

function InputArea() {
  const [threadId, setThreadId] = useLocalStorage<string | undefined>(
    "threadId",
    undefined
  );
  const [runId, setRunId] = useLocalStorage<string | undefined>(
    "runId",
    undefined
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ question: string }>();
  const onSubmit = async (data) => {
    const config = {
      method: "POST",
      url: "http://localhost:3000/api/messages",
      data: { ...data, threadId },
    };
    const response = await axios<{ runId: string; threadId: string }>(config);
    setThreadId(response.data.threadId);
    setRunId(response.data.runId);
  };

  return (
    <div className="sticky bottom-0 bg-white p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center border rounded"
      >
        <input
          className="flex-grow p-2 border-0"
          {...register("question", { required: true })}
          placeholder="Type your message"
        />
        {errors.question && (
          <span className="text-red-500">This field is required</span>
        )}
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Send
        </button>
      </form>
      <p className="text-center text-xs py-2 text-gray-700">
        Powered By{" "}
        <a target="_blank" className="font-semibold" href="/">
          ChattyBird AI
        </a>
      </p>
    </div>
  );
}

export default InputArea;
