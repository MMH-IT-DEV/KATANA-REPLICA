---
name: fedex-dispute-bot
description: "Project summary for FedEx Dispute Bot. Completed December 2025. Automated weekly FedEx billing dispute process using Python and Playwright. Reference when building Windows scheduled bots, deploying to multiple computers, or working with FedEx Billing Online."
---

# FedEx Dispute Bot

## Project Overview

| Field | Value |
|-------|-------|
| **Completed** | December 2025 |
| **Duration** | ~2 weeks |
| **Type** | Windows Scheduled Bot |
| **Status** | ✅ Complete |

### What We Built
Automated bot that logs into FedEx Billing Online weekly, identifies invoices eligible for dispute, files disputes automatically, and generates PDF reports of actions taken.

### Business Problem Solved
Manual FedEx dispute process took hours weekly. Bot automates the entire workflow, running every Monday at 7 AM, saving significant staff time.

---

## Tech Stack & Tools

### Languages & Frameworks
- **Python 3.12**: Main bot logic
- **Playwright**: Browser automation (headless Chrome)
- **Flask**: Report generation (HTML → PDF)
- **Jinja2**: HTML templating

### APIs & Services
- **FedEx Billing Online**: Target website for automation
- **Google Sheets API**: Data storage and tracking
- **Gmail API**: Error notifications

### Infrastructure
- **Runs on**: Robin's computer (MMH-Logistics)
- **Scheduled**: Windows Task Scheduler (Mondays 7 AM)
- **Code Storage**: GitHub (private repo)
- **Credentials**: 1Password backup, local folder

---

## Features Implemented

### Core Features
- [x] Automated FedEx Billing Online login
- [x] Invoice scanning and eligibility detection
- [x] Automatic dispute filing
- [x] PDF report generation
- [x] Google Sheets logging

### Secondary Features
- [x] Error handling with Gmail notifications
- [x] State persistence between runs
- [x] Headless browser mode
- [x] Multi-computer deployment support

---

## Architecture

### File Structure
```
MMH_FEDEX_DISPUTE_BOT/
├── run_scheduled.py      # Main entry point
├── fedex_bot.py          # Bot logic
├── config/
│   └── credentials/      # Google API credentials
├── templates/
│   └── index.html        # Report template
├── reports/              # Generated PDFs
└── run.bat               # Windows launcher
```

### Data Flow
```
Task Scheduler → run.bat → Python → Playwright → FedEx Website
                                  → Google Sheets (logging)
                                  → PDF Report (output)
                                  → Gmail (errors)
```

---

## Key Decisions Made

| Decision | Choice | Why |
|----------|--------|-----|
| Browser automation | Playwright over Selenium | Better async, more reliable |
| Scheduling | Task Scheduler over cron | Windows native, reliable |
| Code storage | GitHub + shared folder | Version control + credential security |
| Report format | PDF via Flask/Jinja | Professional, email-ready |

---

## Credentials & Access Required

| Credential | Location | Purpose |
|------------|----------|---------|
| credentials.json | Local + 1Password | Google API auth |
| token.json | Local (auto-generated) | Google API token |
| FedEx login | Browser saved | Website access |

---

## How to Run/Deploy

### Quick Start
```bash
cd C:\Users\Logistics\BOT_AUTOMATIONS\MMH_FEDEX_DISPUTE_BOT
run.bat
```

### Full Setup (New Computer)
1. Clone from GitHub: `gh repo clone [ORG]/MMH_FEDEX_DISPUTE_BOT`
2. Copy credentials from shared folder
3. Install dependencies: `pip install -r requirements.txt`
4. Install Playwright: `playwright install chromium`
5. Create Task Scheduler task pointing to local path

---

## Lessons Learned (Summary)

### What Worked Well
- Playwright for browser automation (fast, reliable)
- GitHub CLI for multi-computer setup
- PDF reports for professional output

### What We'd Do Differently
- Set up .gitignore BEFORE first commit
- Plan multi-computer deployment from start
- Create agent-specific documentation earlier

### Key Patterns Discovered
- **Task Scheduler needs LOCAL paths** → Added to Universal Skill
- **Shared folder for transfer only** → Added to Universal Skill
- **Code agents can't run Git** → Added to Universal Skill
- **Clean project before deploy** → Added to Universal Skill

---

## Related Projects
- Google Sheets integrations
- Other scheduled bots

---

## Contacts
- **Owner**: Robin (Shipping Manager)
- **IT Support**: it@mymagichealer.com
- **Documentation**: README.md in repo

---

*Last updated: December 2025*
