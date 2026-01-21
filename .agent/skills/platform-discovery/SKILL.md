---
name: platform-discovery
description: "Explore external platforms before development. Use when integrating with any existing system, website, or API."
---

# Platform Discovery

## When to Use

- Before ANY external platform integration
- Starting work with existing system
- API integration projects
- Before making architecture decisions

---

## Discovery Flow

```
DISCOVER → DOCUMENT → DECIDE → BUILD
    │          │          │
  Mini     Findings    Architecture
  Agent    Report      based on
  explores            REAL knowledge
```

---

## Mini Agent Discovery Task

```
┌─────────────────────────────────────────────────────────────────┐
│  PLATFORM DISCOVERY: [Platform Name]                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Go to [URL] now and explore systematically.                    │
│                                                                 │
│  DOCUMENT:                                                      │
│  1. Main navigation - every menu item                          │
│  2. Settings pages - all options available                     │
│  3. API/Integration section - what's possible                  │
│  4. User roles/permissions                                     │
│  5. Import/Export capabilities                                 │
│  6. Webhook/automation options                                 │
│                                                                 │
│  OUTPUT: Structured report with screenshots                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Discovery Report Template

```markdown
## Platform: [Name]
## Date: [Date]
## Explorer: Mini Agent

### Navigation Structure
| Section | Features |
|---------|----------|
| [Menu item] | [What's there] |

### Settings Available
| Setting | Options | Notes |
|---------|---------|-------|
| [Setting] | [Options] | [Impact] |

### API Capabilities
- Endpoints discovered: [list]
- Auth method: [type]
- Rate limits: [if visible]

### Integration Points
- [ ] Webhooks available?
- [ ] Zapier/Make integration?
- [ ] API documentation?
- [ ] Bulk import/export?

### Screenshots
[Attached]

### Unknowns Remaining
- [What couldn't be determined]
```

---

## Key Questions

| Category | Ask |
|----------|-----|
| Auth | How to authenticate? |
| Endpoints | What's actually available? |
| Limits | Rate limits? Size limits? |
| Permissions | What can we access? |
| Webhooks | Real-time updates possible? |

---

## Common Discoveries

| Platform | Watch For |
|----------|-----------|
| **WASP** | UI permissions ≠ API access |
| **Katana** | API versions differ |
| **Google** | Shared Drive requires flags |
| **ShipStation** | Multiple API versions |

---

## Output

After discovery, you'll have:
1. **Real knowledge** (not assumptions)
2. **Architecture decisions** based on facts
3. **Documented capabilities** for future reference
4. **Identified limitations** before hitting them
