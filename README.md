# WorkFlow AI — Workplace Productivity Assistant

An AI-powered, single-page productivity workspace that brings everyday workplace tools together in one clean, responsive interface: write emails, summarize meetings, plan tasks, and research topics — all in one place.

> ⚠️ **Prototype notice:** AI outputs in this build are **mock responses** generated locally (no external API keys required). They're meant for demonstration and should be reviewed and verified before real use.

---

## ✨ Features

| Tool | What it does |
| --- | --- |
| 📊 **Dashboard** | Overview with quick stats, tool cards, and one-click shortcuts. |
| 📧 **Email Generator** | Draft professional emails by audience, purpose, tone, and context. |
| 📄 **Meeting Summarizer** | Turn raw meeting notes into key points, decisions, action items, and deadlines. |
| ✅ **Task Planner** | Order tasks by priority and deadline into an actionable timeline. |
| 🔎 **Research Assistant** | Get structured overviews, insights, and recommendations on a topic. |
| 💬 **AI Chatbot** | Ask quick workplace questions and get context-aware starter answers. |
| 📚 **Prompt Library** | A curated set of reusable, copy-ready workplace prompts. |
| 🛡️ **Responsible AI** | Guidance on human oversight, accuracy, privacy, and safe use. |

Each tool includes a **"Load Demo Data"** button so you can see it in action instantly.

---

## 🎨 Design

- Clean, professional, **blue** color theme across light and dark modes.
- Fully **responsive** — desktop, tablet, and mobile.
- Accessible UI components built on **Radix UI** primitives and **shadcn/ui** patterns.
- Mock AI logic isolated in a single module (`src/lib/mock-ai.ts`) for easy replacement.

---

## 🛠️ Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) v1 (full-stack React)
- **UI:** React 19 + TypeScript
- **Routing:** TanStack Router
- **Styling:** Tailwind CSS v4
- **Components:** Radix UI + lucide-react icons
- **Charts:** Recharts
- **Build tool:** Vite

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Bun](https://bun.sh/) (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/WorkFlow-AI.git
cd WorkFlow-AI

# Install dependencies
bun install
# or: npm install
```

### Run the development server

```bash
bun run dev
# or: npm run dev
```

The app will be available at the local URL printed in your terminal (default `http://localhost:8080`).

### Other scripts

```bash
bun run build      # production build
bun run build:dev  # development-mode build
bun run preview    # preview the production build
bun run lint       # run ESLint
bun run format     # format with Prettier
```

---

## 📂 Project Structure

```
WorkFlow-AI/
├── src/
│   ├── components/        # Shared UI components (AppLayout, shadcn/ui)
│   ├── lib/
│   │   └── mock-ai.ts     # All mock AI logic — replace with real API calls
│   ├── routes/            # File-based routes (one file per page)
│   │   ├── __root.tsx     # Root layout (head, fonts)
│   │   ├── index.tsx      # Dashboard
│   │   ├── email.tsx
│   │   ├── meetings.tsx
│   │   ├── tasks.tsx
│   │   ├── research.tsx
│   │   ├── chat.tsx
│   │   ├── prompts.tsx
│   │   └── responsible-ai.tsx
│   ├── router.tsx
│   ├── start.ts
│   └── styles.css         # Tailwind theme tokens (blue palette)
├── public/
├── package.json
└── vite.config.ts
```

---

## 🔌 Connecting Real AI (Optional)

This prototype uses mock logic so it runs without any API keys. To connect a real AI backend:

1. Open `src/lib/mock-ai.ts`.
2. Replace the exported functions (`generateEmail`, `summarizeMeeting`, `planTasks`, `research`, `chatReply`) with calls to your AI provider.
3. Keep the same input/output types so the pages continue to work unchanged.

---

## 🔐 Responsible AI

WorkFlow AI is built with **human oversight** in mind:

- AI-generated content is a starting point, not a final answer.
- Users should review output for accuracy, tone, relevance, and appropriateness before sharing.
- See the in-app **Responsible AI** page for full guidance.

---

## 👤 Author

**Pfano Tshiambwa**

Developed as part of the AI Skills Acceleration (ASA 17) programme.

---

## 📄 License

This project is provided as-is for educational and prototype purposes. Add a license file if you intend to distribute or reuse the code.

---

⸻
