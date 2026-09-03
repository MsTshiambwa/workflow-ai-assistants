// Mock AI service. Replace these functions with real API calls later.

export type EmailInput = {
  audience: string;
  purpose: string;
  tone: string;
  context: string;
};

export function generateEmail({ audience, purpose, tone, context }: EmailInput) {
  const greeting =
    tone === "Formal" ? "Dear" : tone === "Friendly" ? "Hi" : "Hello";
  const audienceName = audience || "team";
  const subject = `${purpose || "Update"} — ${audienceName}`;
  const closing =
    tone === "Formal"
      ? "Kind regards,"
      : tone === "Friendly"
        ? "Thanks so much,"
        : "Best regards,";

  const body = [
    `${greeting} ${audienceName},`,
    "",
    `I'm writing regarding ${(purpose || "an update").toLowerCase()}.`,
    context
      ? `Some context: ${context}`
      : "Here is a short summary of where things currently stand.",
    "",
    tone === "Direct"
      ? "Please confirm next steps by end of day."
      : "Let me know if you would like me to expand on any part of this, or if a short call would be easier.",
    "",
    closing,
    "[Your name]",
  ].join("\n");

  return { subject, body };
}

export type MeetingInput = {
  title: string;
  participants: string;
  notes: string;
};

export function summarizeMeeting({ title, participants, notes }: MeetingInput) {
  const lines = notes
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const pick = (i: number, fallback: string) => lines[i] ?? fallback;

  return `MEETING SUMMARY
${title || "Untitled meeting"} — participants: ${participants || "not listed"}.
The group reviewed current progress and aligned on the next phase of work.

KEY DISCUSSION POINTS
- ${pick(0, "Current status and blockers were reviewed.")}
- ${pick(1, "Priorities for the coming week were confirmed.")}
- ${pick(2, "Resourcing and timelines were discussed.")}

DECISIONS
- Proceed with the agreed approach discussed in this meeting.
- Revisit open items at the next check-in.

ACTION ITEMS
- ${participants.split(",")[0]?.trim() || "Owner"}: prepare the follow-up summary.
- Team: review notes and add any missing detail.

DEADLINES
- Follow-up summary: within 2 working days.
- Next review: end of next week.

FOLLOW-UP
Circulate these notes to all participants and confirm owners for each action item.`;
}

export type Task = {
  id: string;
  name: string;
  deadline: string;
  duration: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
};

const PRIORITY_ORDER = { Urgent: 0, High: 1, Medium: 2, Low: 3 } as const;

export function planTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    const p = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (p !== 0) return p;
    return (a.deadline || "9999").localeCompare(b.deadline || "9999");
  });
}

export function research(topic: string, type: string) {
  const t = topic || "your topic";
  return `OVERVIEW
A ${type.toLowerCase()} of "${t}". This is mock content generated for prototype purposes and does not reflect verified sources.

KEY INSIGHTS
- ${t} is most useful when scoped to a clear business outcome.
- Early, small pilots reduce risk compared with large rollouts.
- Adoption depends more on process change than on tooling.

IMPORTANT CONSIDERATIONS
- Data quality and privacy constraints.
- Team capacity and change management.
- Cost versus measurable benefit.

RECOMMENDATIONS
- Define one success metric before starting.
- Run a short pilot with a single team.
- Review results after 4 weeks and decide whether to scale.

SOURCES / VERIFICATION
No live sources were queried. Verify all claims against internal data and reputable published research before use.`;
}

export function chatReply(message: string) {
  const m = message.toLowerCase();
  if (m.includes("email"))
    return "Happy to help. Tell me the audience, the purpose and the tone you want, and I'll draft it. You can also use the Email Generator tool for a structured version.";
  if (m.includes("day") || m.includes("plan"))
    return "Let's plan your day. List your tasks with deadlines and priorities, and I'll order them. The Task Planner tool does this as a timeline.";
  if (m.includes("summar"))
    return "Paste the information and I'll pull out the summary, decisions and action items. The Meeting Summarizer handles longer notes.";
  if (m.includes("meeting"))
    return "To prepare: set a clear objective, share an agenda in advance, note the decisions you need, and assign an owner to each action item.";
  return `Here's a starting point on "${message}". This is a mock response for the prototype — review and verify anything important before using it.`;
}

export const DEMO = {
  email: {
    audience: "Regional sales team",
    purpose: "Quarterly performance update",
    tone: "Professional",
    context: "Q3 revenue is up 12%. New CRM rollout starts on 14 October.",
  },
  meeting: {
    title: "Q4 Planning Sync (Demo)",
    participants: "Thabo M., Sarah L., Priya N.",
    notes:
      "Reviewed Q3 results, revenue up 12 percent.\nCRM rollout scheduled for 14 October, training needed.\nHeadcount request for one analyst approved pending budget.",
  },
  tasks: [
    { id: "d1", name: "Prepare Q4 budget draft", deadline: "2026-09-10", duration: "3h", priority: "Urgent" as const },
    { id: "d2", name: "CRM training session", deadline: "2026-09-15", duration: "2h", priority: "High" as const },
    { id: "d3", name: "Update team handbook", deadline: "2026-09-30", duration: "1h", priority: "Low" as const },
  ],
  research: { topic: "Adopting AI assistants in mid-size teams", type: "Key Insights" },
};
