import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListTodo, Search, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkFlow AI — Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "AI-powered workplace assistant for writing emails, summarizing meetings, planning tasks and research.",
      },
      { property: "og:title", content: "WorkFlow AI — Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Writing, meetings, planning and research in one lightweight workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const FEATURES = [
  { to: "/email", icon: Mail, title: "Smart Email Generator", desc: "Draft professional emails by audience, purpose and tone." },
  { to: "/meetings", icon: FileText, title: "Meeting Notes Summarizer", desc: "Turn raw notes into decisions, actions and deadlines." },
  { to: "/tasks", icon: ListTodo, title: "AI Task Planner", desc: "Order your tasks by priority and deadline into a timeline." },
  { to: "/research", icon: Search, title: "AI Research Assistant", desc: "Get structured overviews, insights and recommendations." },
  { to: "/chat", icon: MessageSquare, title: "AI Workplace Chatbot", desc: "Ask quick questions and get workplace-ready answers." },
] as const;

const STATS = [
  { label: "Emails Generated", value: "128" },
  { label: "Meetings Summarized", value: "42" },
  { label: "Tasks Planned", value: "310" },
  { label: "Research Requests", value: "76" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="WorkFlow AI"
        description="Your AI-powered workplace assistant for writing, meetings, planning and research."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className="text-2xl font-semibold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Tools</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ to, icon: Icon, title, desc }) => (
          <Card key={to} className="flex flex-col">
            <CardHeader>
              <Icon className="size-5 text-primary" />
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-4">
              <p className="text-sm text-muted-foreground">{desc}</p>
              <Button asChild size="sm" className="w-fit">
                <Link to={to}>Open Tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Quick Actions</h2>
      <Card>
        <CardContent className="flex flex-wrap gap-2 pt-6">
          <Button variant="outline" size="sm" asChild><Link to="/email">Write an email</Link></Button>
          <Button variant="outline" size="sm" asChild><Link to="/meetings">Summarize notes</Link></Button>
          <Button variant="outline" size="sm" asChild><Link to="/tasks">Plan my day</Link></Button>
          <Button variant="outline" size="sm" asChild><Link to="/research">Research a topic</Link></Button>
          <Button variant="outline" size="sm" asChild><Link to="/prompts">Browse prompts</Link></Button>
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Statistics shown are static demo values. AI outputs in this prototype are mock responses —
        always review and verify before use.
      </p>
    </div>
  );
}
