import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListTodo,
  Search,
  MessageSquare,
  BookOpen,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Summarizer", icon: FileText },
  { to: "/tasks", label: "Task Planner", icon: ListTodo },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
  { to: "/prompts", label: "Prompt Library", icon: BookOpen },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-4">
        <button
          className="rounded-md p-2 hover:bg-accent lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <span className="font-semibold tracking-tight">WorkFlow AI</span>
        <span className="ml-auto hidden text-sm text-muted-foreground sm:inline">
          Workplace Productivity Assistant
        </span>
      </header>

      <div className="flex">
        <aside
          className={`${open ? "block" : "hidden"} fixed inset-x-0 top-14 z-20 border-b border-border bg-card p-3 lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0`}
        >
          <nav className="flex flex-col gap-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: to === "/" }}
                activeProps={{ className: "bg-accent text-accent-foreground font-medium" }}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
