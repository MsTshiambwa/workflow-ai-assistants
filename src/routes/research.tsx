import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/AppLayout";
import { research, DEMO } from "@/lib/mock-ai";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkFlow AI" },
      { name: "description", content: "Structured overviews, insights and recommendations on any work topic." },
      { property: "og:title", content: "AI Research Assistant — WorkFlow AI" },
      { property: "og:description", content: "Structured research summaries for the workplace." },
    ],
  }),
  component: ResearchPage,
});

const TYPES = ["Quick Summary", "Detailed Explanation", "Key Insights", "Recommendations", "Pros & Cons"];

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("Quick Summary");
  const [result, setResult] = useState("");
  const [demo, setDemo] = useState(false);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="AI Research Assistant" description="Mock AI research output for the prototype." />

      <div className="mb-6 flex items-start gap-3 rounded-md border border-border bg-accent p-3 text-sm text-accent-foreground">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        Always verify important information before relying on AI-generated content.
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Topic or question</Label>
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="What do you want to research?" />
            </div>
            <div className="space-y-2">
              <Label>Research type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setResult(research(topic, type))}>Research with AI</Button>
              <Button variant="outline" onClick={() => { setTopic(""); setResult(""); setDemo(false); }}>Clear</Button>
              <Button variant="secondary" onClick={() => { setTopic(DEMO.research.topic); setType(DEMO.research.type); setDemo(true); }}>Load Demo Data</Button>
            </div>
            {demo && <p className="text-xs text-muted-foreground">Demo data loaded — fictional example topic.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 pt-6">
            <Label>Results (editable)</Label>
            <Textarea rows={20} value={result} onChange={(e) => setResult(e.target.value)} placeholder="Overview, key insights, considerations, recommendations and sources appear here" />
            <Button variant="outline" disabled={!result} onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied to clipboard"); }}>Copy</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
