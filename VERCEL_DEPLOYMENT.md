# Deploying Sanctuary Pastor to Vercel

This project is fully configured for zero-configuration deployment on **Vercel** with Vite frontend and Vercel Serverless API functions.

---

## 1. Environment Variables (`.env`)

In your Vercel Project dashboard, navigate to **Settings** > **Environment Variables** and add the following:

| Variable Name | Description | Example / Source | Required |
|---|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key | Get from [Google AI Studio](https://aistudio.google.com/app/apikey) | Recommended |
| `GROQ_API_KEY` | Groq API Key (High-Speed LLM with auto-failover) | Get from [Groq Console](https://console.groq.com/keys) | Optional / Recommended |
| `APP_URL` | Production Domain URL | `https://your-project.vercel.app` | Optional |

> **Note:** If neither API key is set, the app will automatically and safely fall back to the built-in pastoral scripture catalog without throwing any errors or showing broken states.

---

## 2. Deploy via GitHub / Git (Recommended)

1. Push this project to your GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel will automatically detect the settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `vite build` (or `npm run vercel-build`)
   - **Output Directory**: `dist`
5. Expand the **Environment Variables** section and paste your `GEMINI_API_KEY` and/or `GROQ_API_KEY`.
6. Click **Deploy**.

---

## 3. Deploy via Vercel CLI

If you prefer deploying directly from your terminal:

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to preview
vercel

# 4. Add your secrets
vercel env add GEMINI_API_KEY
vercel env add GROQ_API_KEY

# 5. Deploy to production
vercel --prod
```

---

## 4. Architecture on Vercel

- **Frontend**: Vite SPA built to `dist/`, served statically via Vercel's global Edge CDN.
- **Backend API**: Serverless Node.js functions located in `/api/`:
  - `POST /api/generate-prayer` -> Auto-rollup prayer generation engine (Groq -> Gemini -> Pastoral Fallback)
  - `GET /api/health` -> Health check endpoint
- **Routing**: `vercel.json` routes `/api/*` to the serverless functions and redirects all other client routes to `index.html` for client-side routing.
