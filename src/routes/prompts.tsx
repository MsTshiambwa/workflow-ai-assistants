import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: "Prompt Library — WorkFlow AI" },
      { name: "description", content: "Structured ROLE, CONTEXT, TASK, CONSTRAINTS, OUTPUT prompts for work tasks." },
      { property: "og:title", content: "Prompt Library — WorkFlow AI" },
      { property: "og:description", content: "Reusable structured prompts for email, meetings, planning and research." },
    ],
  }),
  component: PromptsPage,
});

const PROMPTS = [
  {
    category: "Email",
    role: "You are a professional workplace communication assistant.",
    context: "I need to email [audience] about [topic]. Relevant details: [context].",
    task: "Draft a clear email with a subject line and body.",
    constraints: "Do not invent facts, figures or names. Keep a professional tone. Flag anything I must confirm.",
    output: "Subject line, then email body, under 200 words.",
  },
  {
    category: "Meetings",
    role: "You are a meeting notes analyst.",
    context: "Here are raw notes from [meeting] with [participants]: [notes].",
    task: "Summarize the meeting and extract decisions and action items.",
    constraints: "Use only what appears in the notes. Mark anything unclear as 'needs confirmation'. No fabrication.",
    output: "Sections: Summary, Key Points, Decisions, Action Items (owner + date), Follow-Up.",
  },
  {
    category: "Planning",
    role: "You are a productivity planning assistant.",
    context: "My tasks with deadlines, durations and priorities: [tasks]. Available time: [hours].",
    task: "Order the tasks into a realistic plan.",
    constraints: "Do not add tasks I did not list. Be explicit where the schedule is unrealistic. Professional tone.",
    output: "A numbered timeline with time blocks and a short note on trade-offs.",
  },
  {
    category: "Research",
    role: "You are a careful research assistant.",
    context: "Topic: [topic]. Purpose: [why I need it]. Audience: [audience].",
    task: "Provide a structured briefing on the topic.",
    constraints: "Separate established facts from uncertainty. Do not invent sources or statistics. State limitations.",
    output: "Overview, Key Insights, Considerations, Recommendations, Verification steps for a human reviewer.",
  },
];

function PromptsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Prompt Library"
        description="Structured prompts: ROLE → CONTEXT → TASK → CONSTRAINTS → OUTPUT. Every prompt requires human review."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {PROMPTS.map((p) => (
          <Card key={p.category}>
            <CardHeader><CardTitle className="text-base">{p.category}</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {([["ROLE", p.role], ["CONTEXT", p.context], ["TASK", p.task], ["CONSTRAINTS", p.constraints], ["OUTPUT", p.output]] as const).map(
                ([label, value]) => (
                  <div key={label}>
                    <div className="text-xs font-semibold tracking-wide text-primary">{label}</div>
                    <p className="text-muted-foreground">{value}</p>
                  </div>
                ),
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
