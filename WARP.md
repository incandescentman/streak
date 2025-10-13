# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a "100 Days of Writing" progress tracker - a web-based visualization tool for tracking daily writing habits over a 100-day period. The system uses Emacs org-mode as the data source and displays progress in a calendar-like grid format.

## Architecture

### Data Flow
1. **Data Source**: `progress.org` - Emacs org-mode file containing daily entries with TODO/DONE/MISSED status
2. **Intermediate**: `progress.html` - Auto-generated HTML from the org-mode file (exported by Emacs)
3. **Presentation**: JavaScript dynamically parses the HTML and renders a visual calendar grid

### Key Components
- **`progress.org`**: Master data file with entries like `* DONE <2024-05-30 Thu>` or `* MISSED <2024-06-04 Tue>`
- **`progress.html`**: HTML export with structured DOM elements containing status spans and timestamps
- **`script.js`**: Main JavaScript that fetches and parses `progress.html`, organizing days into weekly rows
- **`styles.css`**: CSS Grid layout creating 7-column calendar with visual status indicators

### Status System
- **DONE**: Green squares with checkmarks (✔) - completed writing days
- **MISSED**: White squares with red crosses (✘) - missed writing days  
- **TODO**: White squares with empty checkboxes (☐) - future or unmarked days
- **No status**: Entries without TODO/DONE/MISSED keywords are treated as unmarked

### Layout Logic
The JavaScript organizes days into rows of 7 (weekly view) with an 8th column showing the month name based on the last day of each row.

## Development Commands

### Local Development
```bash
# Serve locally (required for fetch() to work)
python3 -m http.server 8000
# Or use any local server - the JavaScript uses fetch() which requires HTTP protocol
```

### Testing Different Versions
The project contains experimental directories (`1-chatgpt/`, `2-claude/`, `3-gemini/`, `3.5/`) with different JavaScript implementations. Each can be tested by:
```bash
cd 2-claude/  # or any version directory
python3 -m http.server 8000
```

## Working with Data

### Adding Progress Entries
Edit `progress.org` with Emacs org-mode syntax:
```org
* DONE <2024-05-30 Thu>
* MISSED <2024-06-04 Tue>
* TODO <2024-06-05 Wed>
* <2024-06-06 Thu>  # No status keyword = unmarked
```

### Generating HTML
The `progress.html` file must be exported from `progress.org` using Emacs org-mode HTML export functionality. The JavaScript expects specific DOM structure with:
- `.outline-2` containers for each day
- `.done`, `.todo` status spans  
- `.timestamp` elements with date strings

## Code Architecture Notes

### JavaScript Parsing Strategy
The main `script.js` uses DOM parsing to extract:
1. Date information from `.timestamp` elements using regex `/(\\d{4}-\\d{2}-\\d{2})/`
2. Status from `.done` and `.todo` spans (with special handling for MISSED status)
3. Sequential day counting for "Day X" labels

### CSS Grid Implementation
- 7-column CSS Grid for calendar layout
- `display: contents` on `.week-row` to maintain grid structure
- Square aspect ratio (1:1) for day cells
- Responsive design with percentage-based widths

### Alternative Implementations
Different version directories contain varied approaches:
- **2-claude**: Uses inline DOM manipulation
- **3-gemini**: Includes empty cell padding for incomplete weeks
- **Main**: Current production version with refined month column logic

## File Dependencies

Critical files that must remain synchronized:
- `progress.org` → `progress.html` (via Emacs export)
- `progress.html` → JavaScript parsing (strict DOM structure dependency)
- HTML structure changes require corresponding JavaScript parser updates

## Live Demo
Production version available at: https://incandescentman.github.io/streak/