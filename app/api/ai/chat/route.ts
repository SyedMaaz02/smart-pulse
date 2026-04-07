import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const maxDuration = 30;
const geminiApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export async function POST(req: Request) {
  if (!geminiApiKey) {
    return new Response("Missing Gemini API Key", { status: 500 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages, conversationId }: { messages: UIMessage[]; conversationId?: string } =
    await req.json();
  console.log("User Message:", messages);

  const [{ data: clients }, { data: invoices }] = await Promise.all([
    supabase
      .from("clients")
      .select("id, name, email, phone, total_billed")
      .eq("user_id", user.id),
    supabase
      .from("invoices")
      .select("id, client_id, amount, status, due_date")
      .eq("user_id", user.id),
  ]);

  const context = {
    clients: clients ?? [],
    invoices: invoices ?? [],
    now: new Date().toISOString(),
  };

  const systemPrompt = `You are SmartPulse AI, an assistant for freelancers.
You can answer questions based on the user's CRM and invoices.
Use this context when responding:
${JSON.stringify(context)}`;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    onFinish: async ({ text }) => {
      const latestUserMessage = [...messages].reverse().find((m) => m.role === "user");
      const userText =
        latestUserMessage?.parts
          ?.filter((part) => part.type === "text")
          .map((part) => ("text" in part ? part.text : ""))
          .join("\n") ?? "";

      if (!conversationId || !userText || !text) return;

      await supabase.from("ai_conversations").insert([
        {
          user_id: user.id,
          conversation_id: conversationId,
          role: "user",
          message: userText,
          metadata: {},
        },
        {
          user_id: user.id,
          conversation_id: conversationId,
          role: "assistant",
          message: text,
          metadata: {},
        },
      ]);
    },
  });

  return result.toUIMessageStreamResponse();
}
