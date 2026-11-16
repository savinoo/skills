---
name: research
description: Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to a background agent.
---

Spin up a **background agent** to do the research, so you keep working while it reads. Start it with a fresh context window (in Antigravity/Gemini, use `invoke_subagent` with `TypeName: "self"` so the subagent has web search and file-writing tools).

Its job:

1. Create the findings Markdown file first: pick where the repo already keeps research notes (or `docs/research/<topic-slug>.md` if there is no existing convention) so the destination path is fixed before reading starts.
2. Investigate the question against **primary sources** (official docs, source code, specs, first-party APIs), not a secondary write-up of them. Follow every claim back to the source that owns it.
3. Update the Markdown file after each source is verified, citing each claim's source, and report the saved file path when complete.
