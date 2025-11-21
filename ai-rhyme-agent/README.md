## Rhyme Agent · Automation Blueprint

This project documents an end-to-end n8n automation that:

- Generates rhyme-driven content ideas with OpenAI
- Logs results in Google Sheets
- Calls Musicful.ai (or a compatible text-to-music API) for audio renders
- Calls Flow AI (or equivalent) for short-form video exports
- Uploads final assets directly to YouTube
- Persists an execution log for audits and iteration

The web experience is built with Next.js 14 (App Router + Tailwind) and ships a ready-to-import n8n workflow at `public/workflows/rhyme-agent.json`.

## Local development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and review the blueprint, environment variable requirements, and integration notes.

## n8n workflow setup

1. Deploy n8n (self-host or managed) and import `public/workflows/rhyme-agent.json`.
2. Create the required credentials:
   - OpenAI API (Chat Completions)
   - Google Sheets OAuth (service account or OAuth client)
   - Musicful.ai HTTP header auth
   - Flow AI HTTP header auth
   - YouTube OAuth (Data API v3)  
   Optional: Discord/Slack webhook for notifications.
3. Define environment variables in n8n:
   - `GOOGLE_SHEET_ID`
   - `MUSICFUL_API_KEY`
   - `FLOWAI_API_KEY`
   - `YOUTUBE_CHANNEL_ID`
   - `ANNOUNCEMENT_WEBHOOK` (optional)
4. Edit the Set node to customise prompts, genre, and campaign metadata. Update template IDs for Flow AI and any brand assets.
5. Test each integration node individually (Execute Node) before activating the full workflow.

## Google Sheets log

Create a sheet named **Ideas** with the following headers in row 1:

```
run_date | theme | rhyme_title | hook | keywords | audio_url | video_url | youtube_video_id | status | notes
```

The automation appends a new row on each execution and updates it after upload.

## Free-tier tooling

| Tool          | Purpose                       | Free plan notes                                           |
| ------------- | ----------------------------- | --------------------------------------------------------- |
| n8n           | Workflow orchestration        | Self-host or Community Cloud (fair-use limits).           |
| OpenAI        | Rhyme ideation                | Use gpt-4o-mini / gpt-4.1-mini (paid, minimal cost).      |
| Google Sheets | Central log                   | Included with Google Workspace/Drive.                     |
| Musicful.ai   | Audio generation              | Free API tier with limited renders per day.               |
| Flow AI       | Video automation              | Free tier with watermark — suitable for prototyping.      |
| YouTube API   | Publishing                    | Free quota; ensure compliance with YouTube policies.      |

## Deploy to Vercel

Use the provided command once the project builds locally without errors:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-ebdce89a
```

After deployment completes, verify the production site:

```bash
curl https://agentic-ebdce89a.vercel.app
```
