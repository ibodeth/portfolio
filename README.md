# Personal Portfolio & Terminal Resume

A high-performance, dark-themed developer portfolio and interactive terminal resume designed for showcasing engineering experience, system architecture projects, and machine learning skill maps.

## Key Features

- **Interactive System Shell Booting:** Immersive startup animation and sound effects simulating retro command-line boots.
- **Bento Grid Skill Visualizer:** Interactive cards plotting machine learning, backend/systems, embedded edge, and media competency areas.
- **Dynamic Experience Canvas:** Operational timeline detailing past roles, team leadership, and competitive engineering results.
- **Fully Responsive:** TailwindCSS grid structures optimized across mobile, tablet, and desktop viewports.

## Tech Stack

- **Core:** React 18, Vite, TypeScript
- **Styling:** Vanilla TailwindCSS
- **Animations:** CSS Keyframes & Web Audio APIs

## Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose (optional)

## Quick Start (Docker)

Spin up the containerized production environment:

```bash
docker compose up -d --build
```

Access the portfolio at `http://localhost:8080`.

## Local Development

To run the Vite dev server locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.