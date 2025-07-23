This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Description

DFtoolAI is a modern, AI-powered PDF summarizer built with Next.js, Tailwind CSS, Clerk authentication, Prisma ORM, and Stripe payments.
Users can upload PDF files, receive AI-generated summaries, and manage subscriptions with secure authentication and payment processing.
The app features a minimalistic, responsive dark UI and supports user management, subscription status, and webhook integrations for real-time updates.

Features:

Upload and summarize PDF files using AI
Modern, responsive UI with Tailwind CSS
User authentication via Clerk
Subscription management and payments with Stripe
PostgreSQL database with Prisma ORM
Webhook support for Clerk and Stripe events


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
