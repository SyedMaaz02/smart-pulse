import { ChatPanel } from "@/components/dashboard/chat-panel";

export default function ChatPage() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">AI Copilot</p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-50">SmartPulse Chat</h2>
      </div>
      <ChatPanel />
    </div>
  );
}
