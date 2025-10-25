# DebtGo - Debt Management Application

## Overview
DebtGo is a debt management web application built with Vite and Tailwind CSS. The project was imported from GitHub and set up to run in the Replit environment on October 25, 2025.

## Project Architecture

### Tech Stack
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS 3.x with PostCSS and Autoprefixer
- **Runtime**: Node.js 20

### Project Structure
```
/
├── src/
│   ├── main.js        # Application entry point
│   └── style.css      # Tailwind CSS imports and global styles
├── index.html         # HTML entry point
├── package.json       # Project dependencies and scripts
├── vite.config.js     # Vite configuration (configured for Replit)
├── tailwind.config.js # Tailwind CSS configuration
└── postcss.config.js  # PostCSS configuration
```

## Development Setup

### Workflow
- **Server**: Runs `npm run dev` on port 5000
- The development server is configured to bind to `0.0.0.0:5000` for Replit compatibility
- Hot Module Replacement (HMR) is configured for WebSocket connections through Replit's proxy

### Running the Application
The development server starts automatically via the configured workflow. To manually restart:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Deployment Configuration
- **Type**: Autoscale (stateless web application)
- **Build Command**: `npm run build`
- **Run Command**: `npx vite preview --host 0.0.0.0 --port`

## Current State
The application displays a landing page with three main feature areas:
1. **Track Debts** - Monitor all debts in one place
2. **Plan Payments** - Create payment strategies
3. **See Progress** - Visualize debt freedom journey

## Recent Changes (October 25, 2025)
- Initialized empty GitHub repository with basic Vite + Tailwind setup
- Configured Vite server for Replit environment (0.0.0.0:5000)
- Set up proper HMR configuration for WebSocket connections
- Created basic landing page with Tailwind CSS styling
- Configured deployment settings for production
