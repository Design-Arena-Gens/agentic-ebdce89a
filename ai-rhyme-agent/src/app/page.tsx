import Link from "next/link";

const highlightPoints = [
  {
    title: "Rhyme ideation AI",
    description:
      "Prompt-tuned OpenAI Chat Completions craft rhyme-ready concepts, hooks, and lyrical palettes tailored to your micro-niche.",
  },
  {
    title: "Autonomous asset pipeline",
    description:
      "Orchestrated HTTP calls trigger Musicful.ai for polished audio, Flow AI for video renders, and YouTube Data API for publishing.",
  },
  {
    title: "Audit-ready logging",
    description:
      "Every run is captured in Google Sheets alongside asset URLs, making it easy to review progress and iterate on winning ideas.",
  },
];

const phases = [
  {
    label: "01 · Ideation",
    name: "Creative Brief Generation",
    summary:
      "Schedule-triggered OpenAI prompts output rhyme concepts, lyrical direction, and campaign metadata.",
    bullets: [
      "Schedule Trigger → Set node to inject theme, tone, channel goals.",
      "OpenAI Chat node produces 3–5 rhyme angles plus SEO keywords.",
      "Guardrails: temperature 0.7, JSON output enforced via system prompt.",
    ],
  },
  {
    label: "02 · Audio",
    name: "Music + Voice Synthesis",
    summary:
      "Musicful.ai (or an alternative text-to-music service) renders a 30–60s instrumental paired with AI vocals.",
    bullets: [
      "HTTP Request node hits Musicful.ai’s `/api/generate` endpoint with prompt, BPM, and vocal style.",
      "Polling loop waits on job status and retrieves the downloadable audio URL.",
      "Binary data saved temporarily in n8n and associated with the active workflow context.",
    ],
  },
  {
    label: "03 · Video",
    name: "Flow AI Visual Assembly",
    summary:
      "Flow AI stitches lyric overlays, motion backgrounds, and brand elements into a short-form ready video.",
    bullets: [
      "Flow AI Scene Template triggered with HTTP node; lyric captions injected automatically.",
      "Follow-up request requests render export in MP4 (1080x1920) for Shorts/Reels.",
      "Binary video stored for downstream upload alongside metadata.",
    ],
  },
  {
    label: "04 · Publish",
    name: "YouTube Delivery + Logging",
    summary:
      "Uploads land in your channel with captions, hashtags, and a Sheets log for analytics review.",
    bullets: [
      "YouTube Data API `videos.insert` called via OAuth2 credential in n8n.",
      "Google Sheets Append updates the log with campaign identifiers, asset links, and performance checklist.",
      "Optional Discord/Slack webhook summarises run results for quick validation.",
    ],
  },
];

const integrations = [
  {
    name: "Google Sheets",
    description:
      "Acts as the central project ledger storing ideation outputs, asset URLs, and publishing metadata.",
    setup:
      "Create a Service Account credential, share the spreadsheet with it, and add the Sheets node using OAuth2 with offline access.",
  },
  {
    name: "OpenAI",
    description:
      "Chat Completions (gpt-4o-mini or gpt-4.1-mini) create structured rhyme blueprints and lyrical snippets.",
    setup:
      "Store the API key in n8n credentials; enforce JSON mode and guardrail prompts to guarantee predictable schema.",
  },
  {
    name: "Musicful.ai",
    description:
      "Generates instrumentals and vocal tracks from descriptive prompts. HTTP node handles job submission and polling.",
    setup:
      "Use the free Musicful.ai key, submit POST `/api/v1/tracks` with prompt + style, then GET `/api/v1/tracks/{id}` until status=`ready`.",
  },
  {
    name: "Flow AI",
    description:
      "Builds short-form video templates; accepts lyric + brand overlays and returns MP4 exports for YouTube Shorts.",
    setup:
      "Configure template ID in the Set node, call `/api/v1/templates/{id}/render`, poll `/render/{jobId}` for completion, then download the file.",
  },
  {
    name: "YouTube Data API",
    description:
      "Publishes shorts/videos automatically with generated titles, descriptions, and scheduled visibility.",
    setup:
      "Create a Google Cloud project, enable YouTube Data API v3, and supply OAuth credentials to n8n’s YouTube node.",
  },
];

const environments = [
  { name: "GOOGLE_SHEET_ID", description: "Spreadsheet ID for the campaign log (e.g., 1Abc...)" },
  { name: "OPENAI_API_KEY", description: "Private OpenAI key used by the Chat node." },
  { name: "MUSICFUL_API_KEY", description: "Token issued by Musicful.ai free tier." },
  { name: "FLOWAI_API_KEY", description: "Personal token for Flow AI renders." },
  {
    name: "YOUTUBE_OAUTH",
    description: "Stored as n8n credential; authorises uploads and metadata updates.",
  },
  {
    name: "BRAND_BUCKET",
    description:
      "Optional S3-compatible bucket for reusable brand assets referenced by Flow AI template.",
  },
];

const automationChecklist = [
  "Import the provided workflow into n8n (Settings → Import from file).",
  "Create the required credentials and environment variables before activating the workflow.",
  "Adjust the cron schedule to match your publishing cadence.",
  "Tweak prompt engineering in the Set node to match genre, persona, and campaign goals.",
  "Replace placeholder template IDs and track styles with your Flow AI & Musicful.ai selections.",
  "Test each integration individually using n8n’s Execute Node feature before enabling the full workflow.",
];

const sheetSchema = [
  "run_date",
  "theme",
  "rhyme_title",
  "hook",
  "keywords",
  "audio_url",
  "video_url",
  "youtube_video_id",
  "status",
  "notes",
];

export default function Home() {
  return (
    <div className="relative overflow-hidden pb-32">
      <div className="pointer-events-none absolute -top-56 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-24 px-6 py-24 lg:px-16">
        <section className="space-y-10">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
            Agentic Automation Stack
          </p>
          <div className="grid gap-10 lg:grid-cols-[1.35fr,1fr] lg:items-start">
            <div className="space-y-8">
              <h1 className="text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                Build an autonomous rhyme lab that ideates, produces, and ships
                to YouTube – powered entirely by n8n and free AI tooling.
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                This blueprint combines n8n orchestrations with OpenAI, Google
                Sheets, Musicful.ai, Flow AI, and the YouTube API. Import the
                workflow, drop in your credentials, and watch an AI creative
                pipeline deliver rhymed hooks, finished audio, on-brand video,
                and public uploads with full observability.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/workflows/rhyme-agent.json"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Download n8n workflow
                  <span className="text-xs font-medium opacity-80">
                    (JSON · ready to import)
                  </span>
                </Link>
                <a
                  href="#implementation"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white hover:text-white"
                >
                  View implementation steps
                </a>
              </div>
            </div>
            <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
              {highlightPoints.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h2 className="text-lg font-semibold text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
              Workflow Phases
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
              A four-phase agent designed for ideation, multimodal asset
              creation, and distribution.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {phases.map((phase) => (
              <div
                key={phase.name}
                className="group flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-purple-400/60 hover:bg-purple-500/10"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-purple-300">
                  {phase.label}
                </span>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-white">
                    {phase.name}
                  </h3>
                  <p className="text-sm text-slate-300">{phase.summary}</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  {phase.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-purple-300">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="implementation" className="space-y-10">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
              Implementation Checklist
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
              Configure n8n, external APIs, and observability before enabling
              the agent.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.5fr,1fr]">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">
                Bring it online
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                {automationChecklist.map((step) => (
                  <li key={step} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-300" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">
                Required secrets
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                {environments.map((env) => (
                  <li key={env.name} className="space-y-1">
                    <p className="font-mono text-xs uppercase tracking-wide text-purple-200">
                      {env.name}
                    </p>
                    <p>{env.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
              Integrations
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
              Free (or free-tier) tools powering the agentic pipeline.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {integration.name}
                </h3>
                <p className="text-sm text-slate-300">
                  {integration.description}
                </p>
                <div className="rounded-2xl bg-black/40 p-4 text-xs text-slate-300">
                  <p className="font-semibold uppercase tracking-wide text-purple-200">
                    Setup
                  </p>
                  <p className="mt-2 leading-6">{integration.setup}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-10 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
              Google Sheets Schema
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Structured log for review, QA, and future analytics.
            </h2>
            <p className="text-sm text-slate-300">
              Create a tab named <span className="font-semibold">Ideas</span>{" "}
              and add the following column headers in row 1. The Sheets Append
              node streams new entries each time the workflow runs.
            </p>
            <div className="rounded-2xl bg-black/40 p-4">
              <pre className="whitespace-pre-wrap break-all font-mono text-xs text-slate-200">
                {sheetSchema.join(" · ")}
              </pre>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
              n8n Nodes Included
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• Cron schedule trigger</li>
              <li>• Set (context + prompts)</li>
              <li>• OpenAI Chat (JSON response)</li>
              <li>• Google Sheets Append (log)</li>
              <li>• HTTP Request (Musicful.ai submit + status)</li>
              <li>• HTTP Request (Flow AI render + download)</li>
              <li>• Merge & Function nodes to pair assets</li>
              <li>• YouTube Upload</li>
              <li>• Slack/Discord webhook (optional)</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-3xl border border-purple-400/40 bg-purple-500/10 p-10">
          <h2 className="text-3xl font-semibold text-white">
            Deployment flow
          </h2>
          <ol className="list-decimal space-y-3 pl-6 text-sm text-slate-200">
            <li>
              Self-host n8n (Railway, Fly.io, Render free tier) or use the n8n
              Community Cloud. Import the JSON workflow and configure
              credentials.
            </li>
            <li>
              Use Google Cloud console to generate OAuth client for Sheets
              (Service Account) and YouTube (Desktop app). Store in n8n.
            </li>
            <li>
              Create Musicful.ai and Flow AI accounts. Generate API keys and add
              them as HTTP Request headers within n8n credentials.
            </li>
            <li>
              In YouTube Studio, enable monetisation metadata and set the
              default upload privacy to Unlisted. The workflow updates status to
              Public once QA is complete.
            </li>
            <li>
              Activate the workflow and monitor the execution list. Iterate on
              prompts/visual templates until conversion metrics meet your goals.
            </li>
          </ol>
          <p className="text-xs text-purple-200">
            Tip: duplicate the workflow for A/B experiments (e.g., different
            rhyme tones or verticals) and track results with separate Sheets
            tabs.
          </p>
        </section>
      </main>
    </div>
  );
}
