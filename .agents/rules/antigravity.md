---
trigger: always_on
---

# Antigravity Skill Execution Rules

- **Skill activation (`Call the Skill tool`)**: When a skill instructs you to `Call the Skill tool with "<name>"` (or twice for two skills), activate each named skill by reading its `SKILL.md` file with `read_file` (`skills/engineering/<name>/SKILL.md` or `skills/productivity/<name>/SKILL.md`) and following its instructions. Never attempt to invoke a user-invoked skill (`disable-model-invocation: true`) from another skill; instruct the user to run `/<name>` instead.
- **Subagent dispatch**: When a skill asks to dispatch a subagent or background agent with a fresh context window, call `invoke_subagent`:
  - Use `TypeName: "self"` whenever the subagent must write or edit files, run git/test commands, or search the web (such as in `research`, `implement-spec`, and `wayfinder`).
  - Use `TypeName: "research"` for read-only local codebase exploration or diff review (such as in `code-review`, `grilling`, and `improve-codebase-architecture`).
  - When `implement-spec` asks for an isolated worktree per implementer subagent, pass `Workspace: "share"` to `invoke_subagent`.
- **Issue tracker publishing (`to-spec`, `to-tickets`, `triage`, `wayfinder`)**: Publish specs and tickets directly to the issue tracker configured in `docs/agents/issue-tracker.md` rather than substituting a local `implementation_plan.md` artifact.
- **Grilling completion (`grilling`, `grill-me`, `grill-with-docs`)**: When the frontier is empty, summarize what was settled and stop. Agreement (`"yes"`, `"lgtm"`) approves the summary only; act only when the user or calling skill explicitly asks you to implement.
