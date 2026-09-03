import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/AppLayout";
import { summarizeMeeting, DEMO } from "@/lib/mock-ai";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkFlow AI" },
      { name: "description", content: "Turn raw meeting notes into decisions, action items and deadlines." },
      { property: "og:title", content: "Meeting Notes Summarizer — WorkFlow AI" },
      { property: "og:description", content: "Structured meeting summaries from messy notes." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [form, setForm] = useState({ title: "", participants: "", notes: "" });
  const [demo, setDemo] = useState(false);
  const [result, setResult] = useState("");

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Meeting Notes Summarizer" description="Mock AI summaries of your meeting notes." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Meeting title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Participants</Label>
              <Input value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} placeholder="Comma separated" />
            </div>
            <div className="space-y-2">
              <Label>Meeting notes</Label>
              <Textarea rows={10} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setResult(summarizeMeeting(form))}>Summarize Meeting</Button>
              <Button variant="outline" onClick={() => { setForm({ title: "", participants: "", notes: "" }); setResult(""); setDemo(false); }}>Clear</Button>
              <Button variant="secondary" onClick={() => { setForm(DEMO.meeting); setDemo(true); }}>Load Demo Data</Button>
            </div>
            {demo && <p className="text-xs text-muted-foreground">Demo data loaded — fictional example content.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 pt-6">
            <Label>Summary (editable)</Label>
            <Textarea rows={22} value={result} onChange={(e) => setResult(e.target.value)} placeholder="Summary, key points, decisions, action items, deadlines and follow-up appear here" />
            <Button variant="outline" disabled={!result} onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied to clipboard"); }}>Copy</Button>
            <p className="text-xs text-muted-foreground">Mock AI output. Verify before circulating.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
