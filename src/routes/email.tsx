import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/AppLayout";
import { generateEmail, DEMO } from "@/lib/mock-ai";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkFlow AI" },
      { name: "description", content: "Draft professional workplace emails by audience, purpose and tone." },
      { property: "og:title", content: "Smart Email Generator — WorkFlow AI" },
      { property: "og:description", content: "Draft professional workplace emails in seconds." },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Professional", "Formal", "Friendly", "Direct"];

function EmailPage() {
  const [form, setForm] = useState({ audience: "", purpose: "", tone: "Professional", context: "" });
  const [demo, setDemo] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const run = () => {
    const out = generateEmail(form);
    setSubject(out.subject);
    setBody(out.body);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Smart Email Generator" description="Mock AI drafting for workplace emails." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Audience</Label>
              <Input value={form.audience} onChange={(e) => set("audience")(e.target.value)} placeholder="e.g. Marketing team" />
            </div>
            <div className="space-y-2">
              <Label>Purpose</Label>
              <Input value={form.purpose} onChange={(e) => set("purpose")(e.target.value)} placeholder="e.g. Project status update" />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={form.tone} onValueChange={set("tone")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Context</Label>
              <Textarea rows={5} value={form.context} onChange={(e) => set("context")(e.target.value)} placeholder="Key details to include" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={run}>Generate Email</Button>
              <Button variant="outline" onClick={run} disabled={!body}>Regenerate</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setForm({ audience: "", purpose: "", tone: "Professional", context: "" });
                  setSubject(""); setBody(""); setDemo(false);
                }}
              >
                Clear
              </Button>
              <Button variant="secondary" onClick={() => { setForm(DEMO.email); setDemo(true); }}>
                Load Demo Data
              </Button>
            </div>
            {demo && <p className="text-xs text-muted-foreground">Demo data loaded — fictional example content.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Generated subject appears here" />
            </div>
            <div className="space-y-2">
              <Label>Email body</Label>
              <Textarea rows={16} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Generated email appears here" />
            </div>
            <Button
              variant="outline"
              disabled={!body}
              onClick={() => {
                navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
                toast.success("Copied to clipboard");
              }}
            >
              Copy
            </Button>
            <p className="text-xs text-muted-foreground">
              Mock AI output. Review and verify before sending.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
