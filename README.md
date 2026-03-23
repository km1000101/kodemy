# Kodemy

Udemy-like LMS for Kodnest. Learn in order, track progress, resume anytime.

## Structure

- `frontend/` – Next.js app (deploy to Vercel)
- `backend/` – Express + Prisma API

## Local development

```bash
npm install
npm run dev
```

Runs frontend (Next.js) and backend (Express) concurrently.

## Deploy to Vercel

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for step-by-step instructions.

**Important:** Set **Root Directory** to `frontend` in Vercel project settings.
