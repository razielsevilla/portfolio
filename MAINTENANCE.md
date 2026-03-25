# Development & Maintenance Guide

This guide explains where to update your portfolio's content and configuration now that the codebase has been modularized for production.

---

## 📦 Content & Data
Most of your portfolio's content is now abstracted into the `src/data/` directory. Edit these files to update the text across your site.

| Content Type | File Location | What's Inside? |
| :--- | :--- | :--- |
| **Experience** | [experienceData.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/data/experienceData.js) | Job titles, companies, dates, and bullet points. |
| **Projects** | [projectData.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/data/projectData.js) | Project titles, taglines, tech stacks, and links. |
| **Skills** | [skillsData.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/data/skillsData.js) | Skill categories (Core, Extended, Frontier) and years of experience. |
| **Contact Info** | [contactData.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/data/contactData.js) | Email address and social media links. |
| **Book Structure** | [spreads.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/data/spreads.js) | Order of pages and chapter start markers. |

---

## ⚙️ Global Configuration
Application-wide settings are centralized in [constants.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/constants.js). Edit this file to change:
- **Audio Paths**: Where the page-turn sound is located.
- **Book Dimensions**: Width, height, and scale of the book components.
- **Skill Tiers**: Labels and colors for "Core", "Extended", and "Frontier" skills.
- **Project Status**: Labels for "Published", "In Press", "Case Study", etc.

---

## 🖋️ Specific Page Prose
If you want to edit fixed text (like the **Foreword** or the **Invitation** conclusion), modify these page components:
- **Foreword**: [PageForeword.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/components/pages/PageForeword.js)
- **Closing Prose**: [InvitationProse.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/components/pages/InvitationProse.js)

---

## 🎨 Styling & Design
To update global colors, fonts, or component layouts, use the centralized CSS:
- [book-system-v2.css](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/styles/book-system-v2.css): Contains the tokens and utility classes for the entire book.

---

## 🚀 Quick Actions

### Adding a New Project
1. Open [projectData.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/data/projectData.js).
2. Add a new object to the array.
3. The book automatically handles the layout (it batches 2 projects per page).

### Adding a New Experience
1. Open [experienceData.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/data/experienceData.js).
2. Add a new entry at the top of the array for the most recent role.
3. If you add many roles, you may need to adjust the `slice` indices in [PageChapter1.js](file:///c:/Users/Raziel/OneDrive/Documents/06_Projects/Portfolio/frontend/src/components/pages/PageChapter1.js) to move them to the next page.
