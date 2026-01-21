---
name: mmh-workflow-knowledge
description: "Universal knowledge base for MyMagicHealer projects. Contains all reusable patterns, agent rules, best practices, and lessons learned from completed projects. Auto-activates for any development work. Updated after each project completion."
---

# MMH Universal Workflow Knowledge

> **Last Updated**: January 2026
> **Projects Integrated**: 4 (FedEx Dispute Bot, Invoice Migration, Katana MO Module, TikTok UGC Bot)

---

## 🤖 Agent Coordination Rules

### Lead Agent (Claude)
| Can | Cannot |
|-----|--------|
| Create instructions | Access browser |
| Coordinate agents | Make code changes |
| Review reports | Run terminal commands |
| Make decisions | Access localhost |

### Code Agent (Cursor/Windsurf)
| Can | Cannot |
|-----|--------|
| Edit code files | Open browser |
| Run terminal commands | View localhost |
| Start dev server | Visual verification |
| Read/write files | Run Git push (human does) |
| Create documentation | Delete folders outside project |

### Mini Agent (Chrome Extension)
| Can | Cannot |
|-----|--------|
| Open localhost | Edit code |
| Navigate browser | Run commands |
| Take screenshots | Make file changes |
| Find data in app | |
| Verify UI changes | |

### Database Agent
| Can | Cannot |
|-----|--------|
| Run SQL queries | Access browser |
| Verify schema | Edit application code |
| Create migrations | |

---

## 📋 Instruction Block Template

```markdown
## 🔧 CODE AGENT INSTRUCTION - [Title]

╔════════════════════════════════════════════════════════╗
║  [Type] - [Brief Description]                          ║
║  Priority: [HIGH/MEDIUM/LOW] | Module: [Area]          ║
╚════════════════════════════════════════════════════════╝

⚠️ IMPORTANT RULES:
• DO NOT open localhost or launch browsers
• Browser testing done by Mini Agent or Human
• Report changes with line numbers

📚 REQUIRED READING:
• [Design system or reference file]
• [Similar file for patterns]

TASK: [Description]

[Steps and code]

OUTPUT REQUIRED:
□ [Deliverable 1]
□ [Deliverable 2]
□ Report with line numbers
```

---

## 🔐 Security Patterns

### Credentials Management
```
GitHub     → Code only (NO credentials)
Shared     → Transfer credentials locally
1Password  → Backup important credentials
Local      → Where bot actually runs
```

### .gitignore Standard
```gitignore
# Credentials
credentials.json
token.json
settings.json
*.pickle
config/credentials/

# Runtime
__pycache__/
*.pyc
logs/
*.log

# Browser
user_data*/
BrowserMetrics/
Crashpad/

# Output
reports/*.pdf
```

**Rule**: Create .gitignore BEFORE first `git add`

---

## 🖥️ Windows Deployment Patterns

### Task Scheduler Rules
1. **ALWAYS use LOCAL paths** - Network paths fail
2. Set "Start in" to project folder
3. Test with right-click → Run first

### Absolute Paths for Config Files
```python
# Python - Always use absolute paths
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
config_file = os.path.join(project_root, 'config', 'settings.json')
```

```batch
@echo off
REM Batch file - Set working directory first
cd /d "%~dp0"
python app.py
```
**Relative paths break when run from Task Scheduler!**

### Multi-Computer Transfer
```
Dev Computer → Shared Folder → Target Local Folder
                    ↓
         (Transfer point only,
          never run from here)
```

### Folder Structure
```
C:\Users\[USERNAME]\BOT_AUTOMATIONS\
├── [PROJECT_1]\
├── [PROJECT_2]\
└── [PROJECT_3]\
```

---

## 📥 Download & API Patterns

### yt-dlp Cookie Authentication
```python
# For age-restricted content (TikTok, YouTube, etc.)
cmd = ['yt-dlp', '-o', output_path, '--no-warnings']

cookie_file = os.path.join(project_root, 'config', 'cookies.txt')
if os.path.exists(cookie_file):
    cmd.extend(['--cookies', cookie_file])

cmd.append(url)
subprocess.run(cmd)
```

**How to get cookies.txt:**
1. Install "Get cookies.txt LOCALLY" browser extension
2. Go to site while logged in
3. Export cookies to `config/cookies.txt`

**Note:** `--cookies-from-browser chrome` is unreliable - use file instead

---

## 🗄️ Database Patterns

### Supabase Error Logging
```typescript
if (error) {
  console.error('Context:', {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint
  });
}
```

### Create Mode Guard (for /entity/new routes)
```typescript
const isCreateMode = id === 'new';

useEffect(() => {
  if (isCreateMode) {
    setDefaults();
    return; // NO database queries with "new"
  }
  loadData();
}, [id]);
```

### Create-Then-Navigate Pattern
```typescript
const handleCreate = async (data) => {
  // 1. Create entity FIRST
  const { data: entity } = await supabase
    .from('table')
    .insert(data)
    .select('id')
    .single();
  
  // 2. Populate related records with REAL ID
  await populateRelated(entity.id);
  
  // 3. Navigate to real URL
  router.replace(`/entity/${entity.id}`);
};
```

### Numeric Overflow Protection
```typescript
const safeNumber = (value: any, decimals = 4): number => {
  if (value === null || value === undefined) return 0;
  const num = parseFloat(String(value));
  if (isNaN(num) || !isFinite(num)) return 0;
  const max = 99999999.9999;
  return Number(Math.max(-max, Math.min(max, num)).toFixed(decimals));
};
```

---

## 🎨 UI Development Patterns

### Pre-Development Checklist
- [ ] Design System document exists
- [ ] Color palette defined
- [ ] Reference file identified
- [ ] Database schema verified

### Build Sequence
1. **List page** (read-only first)
2. **Detail page** (read-only first)
3. **Edit functionality**
4. **Create flow** (with guards)
5. **Polish & edge cases**

### Standard Colors (Katana Dark Theme)
| Purpose | Hex |
|---------|-----|
| Page background | `#1a1a18` |
| Card background | `#262624` |
| Hover state | `#3a3a38` |
| Primary text | `#faf9f5` |
| Muted text | `#7a7974` |
| Accent (coral) | `#d97757` |
| Success (green) | `#8aaf6e` |
| Warning (amber) | `#bb8b5d` |
| Error (red) | `#ff7b6f` |

---

## 📁 Google Drive Patterns

### Shared Drive API (CRITICAL)
```python
# ALL Drive API calls must include these for Shared Drives
result = service.files().create(
    body={...},
    supportsAllDrives=True
).execute()

result = service.files().list(
    supportsAllDrives=True,
    includeItemsFromAllDrives=True
).execute()
```
**Without this, Shared Drive calls return 404!**

### Bulk Folder Creation (Use Apps Script)
For 10+ folders, use Google Apps Script instead of Mini Agent:
```javascript
function createFolders() {
  var parentId = 'PARENT_FOLDER_ID';
  var folders = ['Folder1', 'Folder2', 'Folder3'];
  
  folders.forEach(function(name) {
    var folder = DriveApp.getFolderById(parentId).createFolder(name);
    Logger.log(name + ': ' + folder.getId());
  });
}
```
**71 seconds for 36 folders vs hours of clicking**

### File Ownership Rules
- Can't delete files owned by others (even with edit access)
- Check owner before bulk operations
- Create owner-specific scripts

### Migration Pattern
```
1. COPY    → Create copies (new ownership)
2. VERIFY  → Confirm all files copied
3. DELETE  → Only after verification passes
```

### File Name Normalization
```javascript
function cleanFileName(name) {
  let clean = name;
  if (clean.toLowerCase().startsWith('copy of ')) {
    clean = clean.substring(8);
  }
  clean = clean.replace(/\(copy\)/gi, '');
  clean = clean.replace(/\(\d+\)/g, '');
  clean = clean.replace(/ copy(\.[^.]+)$/i, '$1');
  return clean.trim();
}
```

### Timeout Handling (Apps Script)
```javascript
var MAX_TIME = 5 * 60 * 1000; // 5 minutes
var startTime = Date.now();

for (var i = index; i < items.length; i++) {
  if (Date.now() - startTime > MAX_TIME) {
    props.setProperty('INDEX', i.toString());
    return; // Save state and exit
  }
  // Process item
}
```

---

## 📝 Documentation Patterns

### Create Three Docs
1. **README.md** - Short, for humans
2. **AGENT_SETUP_GUIDE.md** - Detailed, for code agents
3. **MANUAL_SETUP.md** - Step-by-step for humans without agents

### Name Credentials Specifically
❌ "credentials.json"
✅ "FedEx Dispute Bot - credentials.json"

---

## ⚡ Quick Decision Framework

| Situation | Action |
|-----------|--------|
| Need visual verification | → Mini Agent |
| Need code changes | → Code Agent |
| Need database queries | → Database Agent |
| Need Git push | → Human (with Code Agent prep) |
| File owned by others | → Create owner-specific script |
| Route uses /new pattern | → Add UUID guards immediately |
| Building UI | → Read Design System first |
| Creating 10+ Drive folders | → Use Apps Script (not clicking) |
| Download age-restricted video | → Use cookies.txt file |
| Using Shared Drive | → Add supportsAllDrives=True |
| Task Scheduler won't find file | → Use absolute paths |
| Mini Agent asks confirmation | → Use direct command language |

---

## 🤖 Mini Agent Command Patterns

### Direct Commands (Execute Immediately)

```
✅ "Go to [URL] now and..."
✅ "Start now with..."
✅ "Find and list..."
✅ "Give me a report with..."
```

### Avoid (Triggers Confirmation)

```
❌ "Here are instructions to follow..."
❌ "The process is to..."
❌ "Mini Agent should..."
❌ Document-style formal language
```

**Rule**: Use second-person, conversational, imperative language.

---

## 🔢 Project Registry

| # | Project | Type | Date | Key Learnings |
|---|---------|------|------|---------------|
| 1 | FedEx Dispute Bot | Windows Bot | Dec 2025 | Task Scheduler, multi-computer deploy |
| 2 | Invoice Migration | Google Drive | Dec 2025 | Ownership, Copy-Verify-Delete |
| 3 | Katana MO Module | UI Module | Jan 2026 | Create mode guards, design system |
| 4 | TikTok UGC Bot | Download Bot | Jan 2026 | Shared Drive API, yt-dlp cookies, Apps Script |

---

## 📊 Metrics

| Metric | Before Knowledge | After Knowledge |
|--------|------------------|-----------------|
| Agent confusion incidents | ~5 per project | ~1 per project |
| Rework cycles | ~8 per module | ~2 per module |
| Time to deploy | Variable | Predictable |

---

*This document is updated after each project completion. Patterns that prove valuable across multiple projects are promoted here.*
