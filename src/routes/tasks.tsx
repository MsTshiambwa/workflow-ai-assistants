import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/AppLayout";
import { planTasks, DEMO, type Task } from "@/lib/mock-ai";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkFlow AI" },
      { name: "description", content: "Order tasks by priority and deadline into a clean daily timeline." },
      { property: "og:title", content: "AI Task Planner — WorkFlow AI" },
      { property: "og:description", content: "Turn a task list into a prioritised plan." },
    ],
  }),
  component: TasksPage,
});

const PRIORITIES: Task["priority"][] = ["Urgent", "High", "Medium", "Low"];
const EMPTY = { name: "", deadline: "", duration: "", priority: "Medium" as Task["priority"] };

function TasksPage() {
  const [draft, setDraft] = useState(EMPTY);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plan, setPlan] = useState<Task[] | null>(null);
  const [demo, setDemo] = useState(false);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="AI Task Planner" description="Add tasks, then generate a prioritised timeline." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Task name</Label>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input type="date" value={draft.deadline} onChange={(e) => setDraft({ ...draft, deadline: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: e.target.value })} placeholder="e.g. 2h" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={draft.priority} onValueChange={(v) => setDraft({ ...draft, priority: v as Task["priority"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  if (!draft.name.trim()) return;
                  setTasks((t) => [...t, { ...draft, id: crypto.randomUUID() }]);
                  setDraft(EMPTY);
                }}
              >
                Add Task
              </Button>
              <Button variant="outline" disabled={!tasks.length} onClick={() => setPlan(planTasks(tasks))}>Generate My Plan</Button>
              <Button variant="outline" onClick={() => { setTasks([]); setPlan(null); setDemo(false); }}>Clear</Button>
              <Button variant="secondary" onClick={() => { setTasks(DEMO.tasks); setPlan(null); setDemo(true); }}>Load Demo Data</Button>
            </div>
            {demo && <p className="text-xs text-muted-foreground">Demo data loaded — fictional example tasks.</p>}

            <div className="space-y-2 pt-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-md border border-border p-2 text-sm">
                  <span className="flex-1 truncate">{t.name}</span>
                  <Badge variant="secondary">{t.priority}</Badge>
                  <button aria-label="Remove task" onClick={() => setTasks((x) => x.filter((i) => i.id !== t.id))}>
                    <Trash2 className="size-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
              {!tasks.length && <p className="text-sm text-muted-foreground">No tasks added yet.</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Label>Your plan</Label>
            {plan ? (
              <ol className="mt-4 border-l border-border pl-5">
                {plan.map((t, i) => (
                  <li key={t.id} className="relative pb-6 last:pb-0">
                    <span className="absolute -left-[26px] top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {i + 1}
                    </span>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.priority}
                      {t.deadline && ` · due ${t.deadline}`}
                      {t.duration && ` · ${t.duration}`}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">Add tasks and generate a plan to see your timeline.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
