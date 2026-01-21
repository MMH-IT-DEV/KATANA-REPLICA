---
name: mini-agent-guide
description: "Guide for creating and using Mini Agent (Claude for Chrome) skills. Use when assigning browser-based tasks, creating Mini Agent instructions, or developing new Mini Agent skills. Covers capabilities, limitations, instruction format, and best practices."
---

# Mini Agent Skills Guide

## What is Mini Agent?

Mini Agent is Claude for Chrome - a browser-based AI assistant that can:
- Navigate websites
- Read and extract content
- Take screenshots
- Fill forms
- Click buttons
- Verify visual states

---

## Capabilities vs Limitations

### ✅ Mini Agent CAN:

| Capability | Examples |
|------------|----------|
| **Navigate** | Go to URLs, click links, use search |
| **Read** | Extract text, read JSON files, view page content |
| **Capture** | Take screenshots, copy text |
| **Interact** | Click buttons, fill forms, select dropdowns |
| **Verify** | Confirm page state, check if element exists |
| **Report** | Summarize findings, create structured output |

### ❌ Mini Agent CANNOT:

| Limitation | Workaround |
|------------|------------|
| Edit code files | → Code Agent |
| Run terminal commands | → Code Agent |
| Access local filesystem | → Human or Code Agent |
| Make API calls directly | → Code Agent |
| Persist data between sessions | → Human saves report |
| Run automated scripts | → Code Agent + Task Scheduler |

---

## Instruction Format for Mini Agent

### Standard Template

```markdown
┌─────────────────────────────────────────────────────────────────┐
│  MINI AGENT TASK: [Task Name]                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  OBJECTIVE: [What to accomplish]                                │
│                                                                 │
│  STEPS:                                                         │
│  1. [Step 1]                                                    │
│     → [Specific action]                                         │
│     → [What to look for]                                        │
│                                                                 │
│  2. [Step 2]                                                    │
│     → [Specific action]                                         │
│                                                                 │
│  OUTPUT:                                                        │
│  - [What to report]                                             │
│  - [Format expected]                                            │
│                                                                 │
│  IF BLOCKED:                                                    │
│  - [What to do if X happens]                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Example: Verification Task

```markdown
┌─────────────────────────────────────────────────────────────────┐
│  MINI AGENT TASK: Verify Credentials Type                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  OBJECTIVE: Check if Google credentials are Service Account     │
│                                                                 │
│  STEPS:                                                         │
│  1. Navigate to GitHub repo                                     │
│     → https://github.com/MMH-IT/tiktok-ugc-bot                 │
│                                                                 │
│  2. Go to config/credentials folder                             │
│     → Click config/ → credentials/                              │
│                                                                 │
│  3. Open credentials.json                                       │
│     → Look for "type" field                                     │
│     → Should say "service_account" or show client_id            │
│                                                                 │
│  OUTPUT:                                                        │
│  - Type: "Service Account" or "OAuth Client"                    │
│  - Screenshot of the relevant section                           │
│                                                                 │
│  IF BLOCKED:                                                    │
│  - File not visible → Report "credentials not in repo"          │
│  - Need auth → Report "repo is private, need access"            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Mini Agent Skill Categories

### 1. Verification Skills
Quick checks to resolve unknowns.

| Skill | Use Case |
|-------|----------|
| File Content Check | Read JSON, config files |
| UI State Verification | Confirm page looks correct |
| Settings Audit | Screenshot current settings |
| Existence Check | Verify folder/file exists |

### 2. Data Collection Skills
Gather information from sources.

| Skill | Use Case |
|-------|----------|
| **AI Intelligence Gathering** | Monitor X profiles for insights |
| Web Research | Collect info on a topic |
| Competitor Analysis | Review similar products |
| Documentation Extraction | Pull info from docs |

### 3. Testing Skills
Verify functionality works.

| Skill | Use Case |
|-------|----------|
| UI Testing | Click through flows, verify behavior |
| Link Verification | Check all links work |
| Form Testing | Submit forms, verify responses |
| Cross-browser Check | Verify in different browsers |

### 4. Monitoring Skills
Regular checks on systems.

| Skill | Use Case |
|-------|----------|
| Status Check | Verify service is running |
| Error Monitoring | Check for error messages |
| Update Detection | Notice when something changes |

---

## Best Practices

### DO:
- ✅ Give specific URLs (not "go to the website")
- ✅ Tell exactly what to look for
- ✅ Specify output format
- ✅ Include "if blocked" instructions
- ✅ Break complex tasks into steps
- ✅ Ask for screenshots when visual verification needed
- ✅ **Use direct command language** (see below)

### Direct Command Language (Avoids Confirmation Prompts)

Mini Agent may ask for confirmation when instructions feel like "a document to review" rather than "a direct request." Use these patterns:

| ❌ Triggers Confirmation | ✅ Direct Execution |
|--------------------------|---------------------|
| "Here are instructions..." | "Go to [URL] now and..." |
| "The process is to..." | "Start now with..." |
| "Mini Agent should..." | "Give me..." |
| "Please collect..." | "Collect..." |
| Third-person instructions | Second-person commands |
| Document/formal tone | Conversational/direct tone |

**Phrases that trigger immediate action:**
- "Go to [URL] now"
- "Start now"
- "Do the following:"
- "Give me a report"
- "Find and list..."
- "Check and tell me..."

**Example:**
```
❌ "Please navigate to the website and extract the relevant data 
    according to the criteria outlined below..."

✅ "Go to https://x.com/alexwg now. Find their posts from the last 
    7 days about AI agents. Give me a summary of each with like counts."
```

### DON'T:
- ❌ Ask to edit files (use Code Agent)
- ❌ Give vague instructions ("check if it works")
- ❌ Assume Mini Agent remembers previous sessions
- ❌ Ask for tasks requiring authentication you haven't set up
- ❌ Request tasks that need persistent storage
- ❌ **Ask Mini Agent to TYPE code** - causes spacing/formatting issues

---

## ⚠️ Critical Gotcha: Never Let Mini Agent Type Code

### The Problem
When Mini Agent types code character-by-character into web editors (Google Apps Script, CodePen, etc.), it creates:
- Weird vertical spacing between characters
- Broken formatting
- Unusable code

### The Solution
**ALWAYS use clipboard paste, NEVER type code manually**

### Correct Instruction Pattern:

```
Go to https://script.google.com now.

I have code ready to paste.

1. Open the project MMH-Notifications
2. Click in the Code.gs editor
3. Select all (Cmd+A)
4. Delete current content
5. Paste from clipboard (Cmd+V)
6. Save (Cmd+S)

The code is already in my clipboard - just paste it.

Start now.
```

### Workflow for Code in Web Editors:

```
┌─────────────────────────────────────────────────────────────────┐
│  CORRECT: Human/Code Agent prepares code                        │
│           Human copies to clipboard                             │
│           Mini Agent navigates and pastes                       │
├─────────────────────────────────────────────────────────────────┤
│  WRONG:   Mini Agent types code character by character ❌       │
└─────────────────────────────────────────────────────────────────┘
```

### When Mini Agent Needs to Input Code:

| Step | Who Does It |
|------|-------------|
| 1. Generate code | Lead Agent or Code Agent |
| 2. Copy to clipboard | Human |
| 3. Navigate to editor | Mini Agent |
| 4. Paste code | Mini Agent (Cmd+V) |
| 5. Save | Mini Agent |

---

## Output Formats

### Simple Check
```markdown
## Verification Result

| Item | Status | Notes |
|------|--------|-------|
| [Item 1] | ✅ / ❌ | [Details] |
| [Item 2] | ✅ / ❌ | [Details] |
```

### Data Collection
```markdown
## Collection Report

### Source: [URL]
**Date**: [Date]

### Findings:
1. **[Finding 1]**
   - Detail: [...]
   - Actionable: Yes/No

2. **[Finding 2]**
   - Detail: [...]
   - Actionable: Yes/No

### Recommended Actions:
- [ ] [Action 1]
- [ ] [Action 2]
```

### Screenshot + Notes
```markdown
## Visual Verification

**Page**: [URL]
**Screenshot**: [attached]

### Observations:
- [What was seen]
- [Any issues noted]
- [Confirmation of expected state]
```

---

## Integration with Other Agents

### Mini Agent → Lead Agent
```
Mini Agent completes task → 
Reports findings → 
Lead Agent reviews → 
Decides next steps
```

### Lead Agent → Mini Agent
```
Lead Agent identifies unknown → 
Creates Mini Agent task → 
Human relays to Mini Agent → 
Mini Agent executes and reports
```

### Mini Agent → Code Agent (via Lead Agent)
```
Mini Agent finds issue → 
Reports to Lead Agent → 
Lead Agent creates Code Agent instruction → 
Code Agent fixes
```

---

## Skill Development Process

### To Create a New Mini Agent Skill:

1. **Identify the Use Case**
   - What recurring task needs browser access?
   - Is it verification, collection, testing, or monitoring?

2. **Define the Scope**
   - What websites/pages?
   - What specific data to extract?
   - What filters to apply?

3. **Create the Skill File**
   - Use YAML frontmatter
   - Clear step-by-step instructions
   - Output format template
   - Error handling

4. **Test the Skill**
   - Have Mini Agent run it once
   - Review output quality
   - Refine instructions

5. **Integrate with Workflow**
   - Add to relevant planning skills
   - Define scheduling if recurring
   - Connect to knowledge system

---

## Available Mini Agent Skills

| Skill | Purpose | Frequency |
|-------|---------|-----------|
| **ai-intelligence-gathering** | Collect AI insights from X | Weekly |
| [Add more as created] | | |

---

*Mini Agent extends our capabilities into the browser domain.*
