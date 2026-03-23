# Deploying Kodemy to Vercel

## Quick setup

1. **Import the repo** to Vercel (GitHub, GitLab, or Bitbucket).

2. **Set Root Directory** (required for monorepo):
   - In Vercel: **Project Settings** → **General** → **Root Directory**
   - Click **Edit** and set to: `frontend`
   - Save

3. **Environment variables** (optional):
   - `NEXT_PUBLIC_API_BASE_URL` – backend API URL (if you deploy the backend elsewhere, e.g. Railway or Render)
   - `NEXT_PUBLIC_HF_CHAT_SPACE_URL` – optional Hugging Face chat Space URL

4. **Deploy** – Vercel will build and deploy the Next.js app.

## Backend deployment

The backend (Express + Prisma) runs separately from the frontend. To use full functionality (auth, progress, subjects):

1. Deploy the backend to Railway, Render, Fly.io, or similar.
2. Set `NEXT_PUBLIC_API_BASE_URL` in Vercel to your backend URL.
3. Configure CORS on the backend to allow your Vercel domain.

Without the backend, the site loads but login/courses will fail. The homepage and static pages still work.

## If the site does not display

- Ensure **Root Directory** is set to `frontend`.
- Check build logs in the Vercel dashboard for errors.
- Ensure all required environment variables are set.
