---
name: infrastructure-hub
description: "Master overview of the multi-agent workflow system. START HERE for any project. Shows all skills, how they connect, and when to use each. The visual map of your entire agentic infrastructure."
---

# Infrastructure Hub

> **Your Agentic Layer at a Glance**
> One place to understand the entire system.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          AGENTIC LAYER                                   │
│                                                                         │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐              │
│   │   PLAN      │ ──► │   BUILD     │ ──► │   LEARN     │              │
│   └─────────────┘     └─────────────┘     └─────────────┘              │
│         │                   │                   │                       │
│         ▼                   ▼                   ▼                       │
│   project-planning    multi-agent-workflow  knowledge-extraction        │
│   platform-discovery  reference-replication workflow-knowledge          │
│                       ui-component-redesign                             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                        APPLICATION LAYER                                 │
│                                                                         │
│   Katana MRP │ WASP Inventory │ ShipStation │ Google Workspace │ etc   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## The Four Agents

| Agent | Tool | Can Do | Cannot Do |
|-------|------|--------|-----------|
| **Lead** | Claude.ai | Plan, decide, write instructions | Access browser, edit code |
| **Code** | Cursor/Windsurf | Edit code, run commands | Open browser, visual verify |
| **Mini** | Claude for Chrome | Browse, screenshot, verify UI | Edit code, run commands |
| **Database** | Supabase/SQL | Query, migrate, verify schema | Edit app code, browse |

**Human** = The bridge. Relays messages, approves decisions, pushes to Git.

---

## Skill Map

### 🟢 PLAN Phase

| Skill | Purpose | Triggers |
|-------|---------|----------|
| **project-planning** | Create project plan with phases | "New project", "Let's build X" |
| **platform-discovery** | Explore target system before coding | Any external platform integration |

### 🔵 BUILD Phase

| Skill | Purpose | Triggers |
|-------|---------|----------|
| **multi-agent-workflow** | Agent coordination rules | Every Code Agent instruction |
| **reference-based-replication** | Build new pages from gold standard | "Build X like Y" |
| **ui-component-redesign** | Fix existing pages to match reference | "Fix X to match Y" |
| **mini-agent-guide** | Browser-based tasks | Need to verify, screenshot |
| **design-system** | Colors, components, patterns | Any UI work |

### 🟡 COMMUNICATE Phase

| Skill | Purpose | Triggers |
|-------|---------|----------|
| **lead-agent-notifier** | Slack notifications | End of significant responses |
| **session-handoff** | Context continuity | Ending session, switching |

### 🟣 LEARN Phase

| Skill | Purpose | Triggers |
|-------|---------|----------|
| **knowledge-extraction** | Extract lessons from conversation | Project complete |
| **workflow-knowledge** | Universal patterns (auto-referenced) | All development work |

---

## Quick Decision Tree

```
START HERE
    │
    ▼
Is this a NEW project?
    │
    ├── YES → Use: project-planning
    │            │
    │            ▼
    │         External platforms involved?
    │            ├── YES → Use: platform-discovery FIRST
    │            └── NO → Proceed to build
    │
    └── NO → What are you doing?
                │
                ├── Building NEW pages → reference-based-replication
                ├── FIXING existing pages → ui-component-redesign
                ├── Browser verification → mini-agent-guide
                ├── Ending session → session-handoff
                └── Project complete → knowledge-extraction
```

---

## Complete Project Flow

```
1. INTAKE
   └─► "What are we building?"
       └─► project-planning skill

2. DISCOVERY
   └─► "What platforms are involved?"
       └─► platform-discovery skill (Mini Agent explores)

3. ARCHITECTURE
   └─► Decisions based on real platform knowledge

4. BUILD
   └─► For each task:
       ├─► Lead writes instruction (multi-agent-workflow)
       ├─► Code Agent executes
       ├─► Mini Agent verifies (if UI)
       └─► Lead reviews, iterates

5. UI DEVELOPMENT
   └─► Build FIRST page carefully
   └─► Designate as REFERENCE
   └─► Use reference-based-replication for rest

6. CLOSE
   └─► session-handoff (if continuing later)
   └─► knowledge-extraction (if complete)
   └─► Update workflow-knowledge
```

---

## Feedback Loop Checklist

For every task:

```
□ Code Agent reports what changed (with line numbers)
□ Mini Agent verifies visual result (screenshot)
□ Lead Agent confirms matches expectation
□ ONLY THEN: mark task complete
```

If any loop is open, task is NOT done.

---

## Web Application

The Infrastructure Hub is also available as an interactive web view:
- Network graph showing all connections
- Click nodes to see details
- Filter by type (agents, skills, platforms)
- Download skills directly
- Health dashboard

URL: [Deployed Vercel URL]

---

*The agentic layer is only as powerful as its organization.*
