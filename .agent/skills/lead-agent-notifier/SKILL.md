---
name: lead-agent-notifier
description: "Protocol for Lead Agent to include structured notification blocks. Extension uses chat name for agent identification - name chats with emojis. Enables cross-agent context extraction from Slack history."
---

# Lead Agent Notification Skill

## Purpose

Create structured Slack notifications that serve as a **distributed memory system** across all agents. The **chat name** identifies which agent/project sent the notification.

---

## Chat Naming Convention

Name your Claude chats with **emoji prefixes** to identify the agent:

| Emoji | Agent | Example Chat Name |
|-------|-------|-------------------|
| 🤖 | Lead Agent (Claude) | `🤖 Lead - Notification System` |
| 💻 | Code Agent (Cursor) | `💻 Code - WASP Integration` |
| 🔍 | Mini Agent (Chrome) | `🔍 Mini - Testing` |
| 🗄️ | Database Agent | `🗄️ DB - Schema Updates` |

The extension reads the chat name and uses it directly in notifications.

---

## Notification Block Format

At the end of significant responses, include:

```
---NOTIFY---
user: [What the user asked - imperative form, 5-15 words]
done: [What was accomplished - past tense, 5-15 words]
next: [Next step, or "None" if complete]
status: [ready|waiting|question|blocked]
---END---
```

### Fields

| Field | Description |
|-------|-------------|
| `user` | What was requested (like a command) |
| `done` | What was accomplished this response |
| `next` | Immediate next step, or "None" |
| `status` | ready, waiting, question, or blocked |

### Status Values

| Status | When | Slack Shows |
|--------|------|-------------|
| `ready` | Work complete | ✅ |
| `waiting` | Need user action | ⏳ |
| `question` | Asked a question | ❓ |
| `blocked` | Cannot proceed | 🚫 |

---

## Examples

### Created Files
```
---NOTIFY---
user: Update extension to use chat name
done: Created v16 with getChatName() function
next: Test with renamed chat
status: waiting
---END---
```

### Sent Instructions
```
---NOTIFY---
user: Fix table sorting bug
done: Created instruction block #12 for Cursor
next: Relay to Cursor Agent
status: waiting
---END---
```

### Analysis Complete
```
---NOTIFY---
user: Debug API 404 error
done: Found issue - missing supportsAllDrives flag
next: None - solution documented
status: ready
---END---
```

### Asked Question
```
---NOTIFY---
user: Plan cloud migration approach
done: Outlined 3 options with tradeoffs
next: None - awaiting decision
status: question
---END---
```

---

## Slack Output

With a chat named `🤖 Lead - Notification System`:

```
🤖 Lead - Notification System 🎯  (45s) ⏳
📝 Ask: Update extension to use chat name
✅ Done: Created v17 with clickable chat link
📋 Next: Test with renamed chat
```

### Key Features
- **Chat name is clickable** → Opens the conversation in Claude.ai
- **🎯** indicates structured block was parsed (vs fallback)
- **Status emoji at end** shows if action needed (⏳ ✅ ❓ 🚫)

---

## When to Include

### ALWAYS include when:
- Created or modified files
- Completed a significant task
- Sent instructions to another agent
- Found something important
- Asked a question requiring response

### DON'T include when:
- Quick clarification ("What do you mean?")
- Simple acknowledgment ("Got it!")
- Very short response (<100 words)
- Mid-task continuation

---

## Multi-Agent Search

After 2 days, search Slack:
- `"🤖 Lead"` → All Lead Agent notifications
- `"💻 Code"` → All Code Agent notifications  
- `"Notification System"` → All notifications for this project
- `"waiting"` → All tasks needing action

---

## Writing Good Summaries

### User Field
- **Imperative form** (like a command)
- Specific about the goal
- 5-15 words

| ❌ Bad | ✅ Good |
|--------|---------|
| "User wanted help" | "Fix notification delay" |
| "Question about API" | "Debug WASP 404 error" |

### Done Field
- **Past tense**, factual
- Include key details
- 5-15 words

| ❌ Bad | ✅ Good |
|--------|---------|
| "Did the thing" | "Created v16 with chat name detection" |
| "Made progress" | "Sent instruction block #12 to Cursor" |

### Next Field
- Future tense or imperative
- Specific action
- "None" if truly complete

| ❌ Bad | ✅ Good |
|--------|---------|
| "Continue" | "Test extension in browser" |
| (empty) | "None - feature complete" |

---

## Integration

This skill works with:
- **multi-agent-workflow**: Identifies which agent via chat name
- **session-handoff**: Slack history aids context transfer
- **knowledge-extraction**: Notifications provide raw material

---

*Name your chats → Get clear notifications → Extract context later*
