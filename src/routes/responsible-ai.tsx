import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — WorkFlow AI" },
      { name: "description", content: "How WorkFlow AI keeps humans in control of AI-generated workplace content." },
      { property: "og:title", content: "Responsible AI — WorkFlow AI" },
      { property: "og:description", content: "Human review, user control and clear AI limitations." },
    ],
  }),
  component: ResponsibleAI,
});

const PRINCIPLES = [
  "Human review required",
  "User controls final output",
  "No intentional fabrication",
  "AI limitations communicated",
  "Sensitive information should not be entered",
  "AI supports human judgment",
];

function ResponsibleAI() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Responsible AI" />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <p className="text-sm">
            AI-generated content may contain errors or incomplete information. Always review and verify
            AI-generated outputs before using them for important workplace decisions or communication.
          </p>
          <ul className="space-y-2 text-sm">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-primary">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
