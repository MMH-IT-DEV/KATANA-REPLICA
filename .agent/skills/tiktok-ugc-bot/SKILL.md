---
name: tiktok-ugc-bot
description: "Project summary for TikTok UGC Bot. Completed January 2026. Automated TikTok video downloader with Google Drive organization. Reference when building video download bots, Google Drive automation, or yt-dlp integrations."
---

# TikTok UGC Bot

## Project Overview

| Field | Value |
|-------|-------|
| **Completed** | January 2026 |
| **Duration** | ~2 weeks |
| **Type** | Automation Bot |
| **Status** | ✅ Complete |

### What We Built
Automated system that reads TikTok video URLs from a Google Sheet, downloads them using yt-dlp, uploads to organized Google Drive folders (by month and skin condition), and updates the sheet with status and Drive links.

### Business Problem Solved
Eliminated manual process for marketing team: no more manually downloading TikTok UGC videos, organizing into folders, and tracking which have been processed.

---

## Tech Stack & Tools

| Tool | Purpose |
|------|---------|
| **Python 3.8+** | Core language |
| **yt-dlp** | TikTok video download |
| **Google Sheets API** | Read video list, update status |
| **Google Drive API** | Upload to organized folders |
| **Windows Task Scheduler** | Daily 4PM automation |

---

## Features Implemented

- [x] Read video URLs from Google Sheets
- [x] Download TikTok videos via yt-dlp
- [x] Cookie authentication for age-restricted content
- [x] Upload to Drive with organized folder structure
- [x] Dynamic filename generation from Sheet data
- [x] Automatic month-based folder routing
- [x] Status column updates (Processing, Downloaded, Failed)
- [x] Verification checkbox completion
- [x] Drive link insertion
- [x] Duplicate detection
- [x] Test mode (--test flag for 2 videos)
- [x] Sandbox mode (--sandbox for test sheet)

---

## Architecture

### File Structure
```
tiktok-ugc-bot/
├── app.py                     # Main orchestrator
├── requirements.txt
├── run_bot.bat                # Production
├── run_bot_sandbox.bat        # Testing
├── run_bot_test.bat           # 2-video test
├── README.md
├── .gitignore
├── config/
│   ├── settings.json          # Folder IDs, sheet ID
│   ├── settings.template.json # Template for GitHub
│   ├── cookies.txt            # TikTok auth
│   └── credentials/           # Google API creds
├── services/
│   ├── sheets_service.py
│   ├── drive_service.py
│   └── downloader_service.py
├── database/
├── downloads/
└── logs/
```

### Data Flow
```
Google Sheet → Read URLs → Download via yt-dlp → Upload to Drive → Update Sheet
     │                                                                  │
     └──────────── Status: "To Be Downloaded" → "Downloaded" ──────────┘
```

### Folder Structure (Drive)
```
2_TTS Downloads/
├── January 2026/
│   ├── All Flares/
│   ├── Baby/Moms/
│   ├── Boil/
│   ├── Cystic Acne/
│   ├── Eczema/
│   ├── Folliculitis/
│   ├── HS/
│   ├── Men/
│   └── Psoriasis/
├── February 2026/
│   └── [same subfolders]
└── ... through December 2026
```

---

## Key Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Download method | yt-dlp with cookies.txt | Handles age-restricted content |
| Folder routing | Current calendar month | Marketing wants current month organization |
| Status handling | Explicit "To Be Downloaded" | Prevents accidental processing |
| Column separation | Clip Link ≠ Drive Link | Preserves source URLs |
| Authentication | Cookie file export | More reliable than browser cookies |

---

## How to Run

### Production (all videos)
```bash
python app.py
# or double-click run_bot.bat
```

### Test mode (2 videos only)
```bash
python app.py --test
```

### Sandbox mode (test sheet)
```bash
python app.py --sandbox
```

---

## Google Sheet Structure

| Column | Name | Bot Usage |
|--------|------|-----------|
| A | Month | Ignored (uses current date) |
| B | Avatar | Filename component |
| C | Skin Condition | Folder routing |
| D | TikTok Username | Filename component |
| E | UGC Type | Filename component |
| F | B/A Included | Determines _B&A suffix |
| G | Jar Color | Logging only |
| H | Angle | Logging only |
| I | Clip Link | TikTok URL (NEVER modified) |
| J | Status | Bot filters/updates this |
| K | Verification | Bot checks after success |
| L | Drive Link | Bot writes Drive URL here |

---

## Filename Convention

```
{Avatar}_{TikTokUsername}_{UGCType}[_B&A].mp4
```

Examples:
- `AdultGeneral_modernlifemani_TestimonialTalk_B&A.mp4`
- `MomBaby_user123_SkinTransformation.mp4`
- `AdultTeen_thehayshop_MegaReview.mp4`

---

## Lessons Learned

### What Worked Well
- Google Apps Script for bulk folder creation (71 seconds for 36 folders)
- Separate columns for input vs output data
- Dynamic month routing based on calendar
- Test mode for safe iteration

### What We'd Do Differently
- Test Shared Drive access FIRST (would save 2+ hours debugging 404)
- Set up cookies.txt immediately (age-restricted content is common)
- Use absolute paths from the start (Task Scheduler changes working directory)

### Patterns Added to Universal Skill
- Google Drive supportsAllDrives=True pattern
- yt-dlp cookie authentication pattern
- Absolute path pattern for batch scripts
- Apps Script for bulk Drive operations

---

## Troubleshooting

### "No videos to download"
- Check Status column has "To Be Downloaded" (not empty)
- Verify Clip Link column has TikTok URL

### TikTok "Log in for access" error
1. Export cookies from TikTok using browser extension
2. Save as `config/cookies.txt`
3. Ensure bot uses absolute path to cookie file

### Google Drive 404 error
- Verify folder is Shared Drive → need `supportsAllDrives=True`
- Check folder ID matches config
- Verify folder is shared with service account email

### Cookie file not found
- Use absolute path in code
- Set `cd /d "%~dp0"` in batch file

---

## Schedule

**Daily at 4:00 PM** via Windows Task Scheduler

---

## Contacts

- **Owner:** MMH Marketing Team
- **Repository:** MMH-IT-DEV/MMH_TIKTOK_UGC_BOT
