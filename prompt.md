# Aether Studio — Prompt History & Specifications

This document records the user prompts, master specifications, business model canvas data, and technical requirements for **Aether Studio**.

---

## 1. Initial Project & Architecture Prompt

### User Request:
> "Build me an app with screens that look like this. You can hotlink images from the html
>
> Before building, read the MASTER PROMPT Aether markdown and the Business Model Canvas.csv
>
> build me a web application using MCP endpoint `https://mcp.smithery.ai/abigail-seto`"

---

### Master Prompt — Full-Stack Vite + React Application (Aether Studio)

- **Application Name**: Aether Studio
- **Platform Reference**: Inspired by Higgsfield AI, Canva, and CapCut.
- **Design System**: Obsidian Kinetic
  - **Colors**: Canvas Base `#0B0B0F`, Surface 1 `#121118`, Surface 2 `#1A1824`, Surface 3 `#242233`, Primary Violet `#8B5CF6` / `#7C3AED`, Neon Cyan `#06B6D4`, Emerald Glow `#10B981`
  - **Typography**: Plus Jakarta Sans (Headlines/Body), JetBrains Mono (Technical readouts/metrics)
- **MCP Endpoint**: `https://mcp.smithery.ai/abigail-seto`
  - **Seedance 2.0 Video Generation (InfoseekAI)**:
    - MCP Tool: `https://server.smithery.ai/InfoseekAI/seedance2-video-gen`
    - Direct Endpoint: `https://prod.infoseek.ai/api/mcp/a7034de3-f7fe-4df7-bff7-215ec8027e34/seedance-video?client_ref=usrref_n-i8yhwlnIbKFm_B0w7LoQ`
  - **CaptionPipe (mobiletechmediallc)**:
    - MCP Tool: `https://server.smithery.ai/mobiletechmediallc/captionpipe`
  - **Nanobanana Synthesizer**:
    - MCP Tool: `https://server.smithery.ai/nanobanana`
- **Core 4-Step Guided Workflow**:
  1. **Describe Your Idea**: Prompt composer with Gemini AI magic enhancement, aspect ratio selection (`9:16`, `16:9`, `1:1`, `4:5`), camera motion controls, image-to-video reference uploads, and duration settings.
  2. **Generate Content**: Neural synthesis monitor with latent denoising/temporal interpolation progress, variation picker, loop player, and regeneration.
  3. **Customize Content**: CapCut-inspired multi-track timeline, CaptionPipe subtitle engine (Hormozi Kinetic, Neon Violet, Clean, Karaoke, Cinematic), trending music tracks, color grading LUTs, and aspect ratio resizing.
  4. **Publish or Schedule**: Multi-channel distribution to TikTok, Instagram Reels, and YouTube Shorts with calendar scheduling and hashtag generation.
- **Sidebar Navigation**:
  - AI Studio (4-Step guided workflow)
  - Timeline Editor (CapCut/Canva inspired multi-track ribbon)
  - Projects & Media Library
  - Publishing Calendar (weekly/monthly grid with peak-time analytics)
  - Social Accounts Hub (TikTok, Instagram, YouTube connection status)
  - MCP Toolbox Hub (`mcp.smithery.ai/abigail-seto` interactive console)
  - Plans & Business Model Canvas

---

### Strategyzer Business Model Canvas (CSV Data)

- **Customer Segments**:
  - Content creators, advertisers, marketers, casual users, small businesses, E-commerce, digital marketing agencies.
- **Customer Relationships**:
  - Monthly newsfeed & product updates, creator Discord & prompt-sharing community.
- **Key Partners**:
  - AI model providers (InfoseekAI Seedance, Nanobanana)
  - Social media platforms: TikTok, YouTube, Instagram
  - Creative agencies and production studios
  - Cloud and computing providers
  - Content creators and influencers
  - Creative software integrations
- **Key Activities**:
  - Acquire customers and manage subscriptions
  - Improve generation quality, speed, and user experience
  - Integrate social media publishing APIs
- **Key Value Propositions**:
  - Ease of use of video creation in 4 steps
  - Platform-optimized content
  - Create, customize, and publish in one place
  - Save time and production money
  - Professional content without technical skills
- **Channels**:
  - TikTok, Instagram, YouTube, influencer partnerships
- **Revenue Streams**:
  - Affiliate marketing (20% recurring creator commission)
  - Subscriptions (Creator Free $0, Pro Studio $29/mo, Agency Enterprise $99/mo)
  - Token top-up packs
  - Advertisements and sponsored creator templates
- **Cost Structure (S$60,000 Initial Budget - 6 Months)**:
  - AI APIs & infrastructure: S$11,000
  - Marketing: S$10,000
  - Social media integrations: S$5,000
  - Testing & miscellaneous: S$4,000

---

## 2. GitHub Version Control & Deployment Prompt

### User Request:
> "Git push https://[GITHUB_PAT_REDACTED]@github.com/abbieseto/AetherStudio.git"

- Initialized Git repository, configured branch `main`.
- Ensured sensitive tokens were redacted and extracted to environment variables (`NANOBANANA_TOKEN` in `.env.example`).
- Pushed complete application to GitHub: [https://github.com/abbieseto/AetherStudio](https://github.com/abbieseto/AetherStudio).

---

## 3. Serverless API Architecture & Monitoring Prompt

### User Request:
> "create a /api folder under the main project to store all the apis
> create a /api/health.js to monitor if the apis are working."

- Created `/api` root directory:
  - `/api/health.js`: Live health check and latency monitoring for:
    - Smithery MCP Hub (`https://mcp.smithery.ai/abigail-seto`)
    - Seedance 2.0 (InfoseekAI) video generator
    - CaptionPipe auto-subtitle pipeline
    - Nanobanana image synthesizer
    - Gemini AI API status
  - `/api/mcp.js`: Serverless handler for MCP discovery and generation relays.
  - `/api/captionpipe.js`: Serverless handler for automated subtitles and SRT/JSON parsing.
- Registered `/api/health` in `server.ts` for unified local Express preview and Vercel serverless deployment.
- Pushed updates to GitHub repository.

---

## 4. Prompt Documentation Prompt

### User Request:
> "create a prompt.md containing all my prompts located at project main"

- Generated `/prompt.md` documenting all user prompts, functional specifications, design criteria, and architectural requirements.
