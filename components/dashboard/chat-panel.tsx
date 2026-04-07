"use client";

import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatPanelProps = {
  defaultPrompt?: string;
};

export function ChatPanel({ defaultPrompt = "How much did I make this month?" }: ChatPanelProps) {
  const [value, setValue] = useState("");
  const conversationId = useMemo(() => crypto.randomUUID(), []);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
      body: { conversationId },
    }),
  });

  return (
    <div className="flex h-full min-h-[560px] flex-col rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-4">
        <p className="text-sm text-zinc-400">
          Ask SmartPulse things like: <span className="text-zinc-200">{defaultPrompt}</span>
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "ml-auto max-w-[85%]" : "mr-auto max-w-[85%]"}
          >
            <div
              className={
                message.role === "user"
                  ? "rounded-xl bg-indigo-500 px-4 py-3 text-sm text-white"
                  : "rounded-xl bg-zinc-900 px-4 py-3 text-sm text-zinc-200"
              }
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  <p key={`${message.id}-${index}`} className="whitespace-pre-wrap">
                    {part.text}
                  </p>
                ) : null
              )}
            </div>
          </div>
        ))}
        {error ? (
          <div className="rounded-md border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-300">
            {error.message || "AI failed to respond. Please try again."}
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!value.trim()) return;
          sendMessage({ text: value });
          setValue("");
        }}
        className="border-t border-zinc-800 p-4"
      >
        <div className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Ask about revenue, invoices, clients..."
          />
          <Button type="submit" disabled={status === "streaming"}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
