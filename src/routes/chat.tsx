import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/AppLayout";
import { chatReply } from "@/lib/mock-ai";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot — WorkFlow AI" },
      { name: "description", content: "Ask quick workplace questions and get practical, review-ready answers." },
      { property: "og:title", content: "AI Workplace Chatbot — WorkFlow AI" },
      { property: "og:description", content: "A lightweight workplace assistant chat." },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Help me write an email",
  "Help me plan my day",
  "Summarize this information",
  "Help me prepare for a meeting",
];

type Msg = { role: "user" | "ai"; text: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }, { role: "ai", text: chatReply(t) }]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="AI Workplace Chatbot" description="Mock responses, kept only for this session." />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="min-h-[320px] space-y-3">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">Start a conversation or pick a suggested prompt.</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.role === "ai" && (
                    <button
                      className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"
                      onClick={() => { navigator.clipboard.writeText(m.text); toast.success("Copied"); }}
                    >
                      <Copy className="size-3" /> Copy response
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <Button key={s} variant="outline" size="sm" onClick={() => send(s)}>{s}</Button>
            ))}
          </div>

          <form
            className="flex gap-2"
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
            <Button type="submit">Send</Button>
            <Button type="button" variant="outline" onClick={() => setMessages([])}>Clear</Button>
          </form>
          <p className="text-xs text-muted-foreground">Mock AI. Verify anything important before acting on it.</p>
        </CardContent>
      </Card>
    </div>
  );
}
