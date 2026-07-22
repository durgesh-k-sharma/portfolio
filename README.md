# ⚡ Dark Cyber-Minimalist Developer Portfolio

A high-performance, modern personal portfolio website engineered for developers, software architects, and designers. Built with **HTML5, CSS3, Vanilla JS, and Vite**, designed specifically for deployment on **GitHub Pages** as a fast static site.

---

## ✨ Features

- 🖤 **Dark Cyber-Minimalist Aesthetic**: Pitch obsidian black palette (`#08090C`) with electric cyan (`#00F0FF`) and emerald neon (`#00FF87`) accents, Space Grotesk display typography, and glassmorphism.
- 💻 **Interactive CLI Terminal**: Terminal prompt in the hero section with working commands (`help`, `whoami`, `projects`, `skills`, `contact`, `matrix`, `theme`, `clear`).
- 🌓 **Theme Switcher**: Dark Cyber & Light Cyber mode with `localStorage` persistence and keyboard shortcut (`T`).
- ⚡ **Interactive Cyber Grid Canvas**: Dynamic node & particle connection canvas background reacting to cursor physics.
- 🗂️ **Projects Showcase**: Category filterable project grid (`All`, `Web Apps`, `Dev Tools`, `AI & Data`) with interactive UI mockups and deep-dive detail modal drawers.
- 📈 **Animated Metrics Counter**: Intersection Observer driven counters for experience, shipped projects, and uptime stats.
- 📋 **Copy-to-Clipboard & Toast Notifications**: Instant visual feedback when copying email or triggering actions.
- 📱 **100% Mobile Responsive**: Tested and optimized for 375px, 768px, 1440px+ displays.
- ♿ **Accessible & SEO Ready**: Semantic HTML5 markup, Open Graph tags, keyboard navigable, and `prefers-reduced-motion` compliance.

---

## 🛠️ How to Customize Your Portfolio

All personal info slots are clearly tagged with `[PLACEHOLDER]` or `[YOUR_...]` strings throughout the code.

### 1. Update Personal Info & Content in `index.html`
Search for `[PLACEHOLDER]` in [`index.html`](file:///home/durgesh/mysite/index.html) to update:
- `[NAME]`: Your real name (e.g. `Alex Rivers`).
- `[ROLE / TAGLINE]`: Your headline (e.g. `Senior Frontend Engineer & Open Source Contributor`).
- `[PLACEHOLDER: Short bio...]`: Your 2-3 sentence background pitch.
- `[LOCATION_PLACEHOLDER]`: City/Region (e.g. `San Francisco, CA`).
- `[YOUR_EMAIL@EXAMPLE.COM]`: Your contact email.
- `[YOUR_GITHUB_USERNAME]`, `[YOUR_LINKEDIN_USERNAME]`, `[YOUR_TWITTER_HANDLE]`: Social profile handles.
- `[RESUME_LINK_PLACEHOLDER]`: Direct link to your hosted resume PDF.

### 2. Update Project Details in `src/main.js` & `index.html`
- Project titles, descriptions, live demo links, and GitHub repository URLs are located in [`index.html`](file:///home/durgesh/mysite/index.html) inside `<article class="project-card">` tags.
- Detailed modal drawer content (overview, key features, architecture bullets) is defined in the `projectData` object inside [`src/main.js`](file:///home/durgesh/mysite/src/main.js#L265).

### 3. Connect Contact Form (Optional)
Replace `[YOUR_FORMSPREE_ID_PLACEHOLDER]` in [`index.html`](file:///home/durgesh/mysite/index.html) with your free endpoint ID from [Formspree](https://formspree.io) to receive contact messages straight to your inbox.

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## 📦 Production Build & Local Preview

```bash
# Build production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. **Create a GitHub Repository**: Create a new repository on GitHub (e.g., `portfolio` or `username.github.io`).
2. **Push Your Code**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio site setup"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your GitHub Repository -> **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!

### Option B: Manual Command Line Deployment (`gh-pages`)

If you prefer deploying directly from your terminal:
```bash
npm run deploy
```
Then in GitHub Repository -> **Settings** -> **Pages**, set **Source** to `Deploy from a branch` and select `gh-pages` branch `/ (root)`.

---

## 📁 File Structure Overview

```
mysite/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions auto-deploy workflow
├── public/                 # Static assets (favicons, og-images)
├── src/
│   ├── style.css           # Complete Dark Cyber design system & CSS variables
│   └── main.js             # Terminal CLI, canvas background, modal drawer, toasts
├── index.html              # Main HTML5 semantic structure & SEO metadata
├── vite.config.js          # Vite config with relative base path (base: './')
├── package.json            # Scripts & project dependencies
└── README.md               # Setup & deployment documentation
```

---

## 📄 License

MIT © 2026. Built for community customization.
