# Portfolio Frontend — The Living Codex

This is the React-based frontend for the "Living Codex" portfolio. It is a highly modular, performant, and documentation-focused engine designed to showcase engineering expertise with a premium, tactile feel.

## 🚀 New Architecture Features

- **Page-Flip Engine**: An immersive 18-page digital manuscript layout.
- **Modular Components**: Each chapter and entry is its own sub-component for maximum maintainability.
- **Zero-Boilerplate Scaling**: Add projects or experiences by simply updating JSON data files.
- **Tactile UX**: Includes custom page-turn audio and "Ink-Reveal" transitions.
- **Ref-Based Navigation**: Uses safe React refs for TOC and bookmark jumps (no global state hacks).
- **Utility CSS**: A custom-built, lightweight CSS system that replaces heavy frameworks like Bootstrap.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **State/Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Engine**: [React PageFlip](https://stpage.github.io/react-pageflip/)
- **Icons**: [Font Awesome 6](https://fontawesome.com/)
- **Typography**: Google Fonts (Inter, Outfit, Fira Code)

## 📁 Project Structure

```text
src/
├── components/
│   ├── book/        # Core flip-engine, shell, and navigation components
│   └── pages/       # Individual page layouts and entry sub-components
├── data/            # CENTRAL DATA: experience, projects, skills, and manifest
├── hooks/           # Custom hooks (e.g., usePageSound for audio logic)
├── styles/          # Central CSS design system (book-system-v2.css)
├── App.js           # Main application entry
└── constants.js     # GLOBAL CONFIG: dimensions, audio, and UI keys
```

## 🛠️ Development

To start the project:
```bash
npm install
npm start
```

For content updates, refer to the **[MAINTENANCE.md](../MAINTENANCE.md)** file in the root directory.

