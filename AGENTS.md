# Agent Guide - Jekyll Page (manfred.no)

Welcome! This repository hosts the personal website and portfolio of Manfred Bjørlin (`manfred.no`), a Cloud Native Architect and developer. 

This guide outlines the project structure, components, integration logic, and development workflows to help you contribute effectively without trial-and-error discovery.

---

## 🛠 Project Overview & Architecture

This is a **GitHub Pages / Jekyll website** styled using the `pages-themes/midnight` remote theme. The page dynamically pulls content (specifically speaker/event information) in the browser from external APIs.

### Directory Structure

```
.
├── _config.yml           # Jekyll configuration (defines theme, plugins, and title/description)
├── CNAME                 # Custom domain configuration (manfred.no)
├── index.md              # Homepage content & layout (entrypoint)
├── _layouts/
│   └── default.html      # The base HTML layout wrapped around index.md (includes social links)
├── assets/
│   ├── css/
│   │   ├── index.css     # Custom style overrides for galleries and events lists
│   │   └── style.scss    # Imports the Midnight Jekyll remote theme
│   ├── js/
│   │   ├── eventsLoader.js # Dynamic speaker events loader (fetches from Sessionize)
│   │   └── formatDate.js   # Date formatting helper for events
│   └── data/
│       └── linkedin.json # Local backup/store of LinkedIn posts (historical context)
└── images/               # Project and cover images used on the site
```

---

## ⚙️ Essential Commands & Development Workflow

As this is a lightweight static site built with Jekyll, you can develop and run it locally.

### Local Jekyll Development (Docker approach)

If Ruby, Bundler, or Jekyll are not installed on your host system, you can use Docker to build or serve the site:

```bash
# Serve the Jekyll site locally
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  -p 4000:4000 \
  -it jekyll/jekyll:pages \
  jekyll serve --watch --host 0.0.0.0
```

### Static File Checking

Since the Javascript is loaded directly into the browser, you can debug and lint Javascript components using Node.js:

```bash
# Run ad-hoc style checks or validation on the JS files
node assets/js/formatDate.js
node assets/js/eventsLoader.js
```

---

## 🧩 Key Components & Data Flow

### 1. Events Loader & Sessionize Integration
The homepage (`index.md`) dynamically renders Manfred's past and upcoming talks using the Sessionize API.
* **API Endpoint**: `https://sessionize.com/api/speaker/json/42z601511p`
* **Workflow**: 
  1. `index.md` calls `window.loadEvents(apiUrl)` upon loading.
  2. `eventsLoader.js` fetches the JSON speaker profile.
  3. Events are sorted chronologically descending (`eventStartDate`).
  4. Events are grouped into **Upcoming** and **Past**.
  5. The soonest upcoming event is highlighted as a `"Next up!"` badge with special styles (`#upcoming-events li.highlight`).
  6. The `upcoming-count` and `past-count` elements are updated dynamically with event counts (e.g. `(3)`).

### 2. Layouts and Social Links
The main navbar and layout are defined in `_layouts/default.html`.
* Social profiles showcased: LinkedIn, Discord, Codeberg, and Sessionize.
* All external links in the HTML MUST specify `target="_blank" rel="noopener"` for security and user-experience preservation.

### 3. Styling & Theming
* Theme is configured as `pages-themes/midnight@v0.2.0` in `_config.yml`.
* Custom overrides are implemented in `assets/css/index.css`. This includes grid rules for the `.gallery`, styling for the dynamic list components (`#upcoming-events`, `#past-events`), and the highlights badge.

---

## ⚠️ Important Gotchas & Conventions

* **Pyright/LSP Noise**: Since this is a static site codebase, LSP tools or Pyright in this environment might generate irrelevant syntax errors for `.html`, `.md`, `.scss`, and browser-based `.js` files. Please ignore those linter issues as they are environment-specific and do not represent actual build errors.
* **Front Matter**: Jekyll pages (`index.md`) and stylesheets (`assets/css/style.scss`) MUST start with three hyphens front matter block (`---`) to be parsed by Jekyll.
* **Browser Execution Scope**: Both `formatDate.js` and `eventsLoader.js` expose their functions onto the global scope via `window.formatDate = formatDate` and `window.loadEvents = loadEvents` only if `typeof window !== 'undefined'`. Make sure to maintain this safe export wrapper.
* **Date Parsing**: Keep in mind that dates parsed by `new Date(ev.eventStartDate)` and formatted via `toLocaleDateString` reflect the local browser timezone. 
