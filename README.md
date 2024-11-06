# Next Auth V5 - Advanced Guide (2024)
YouTube: [https://www.youtube.com/watch?v=1MTyCvS05V4&t=3345s]

# NextAuth NEW Documentation
[https://authjs.dev/]

# Packages

```bash
// Shadcn
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add input

npm i react-icons

// Prisma
npm i --save-dev prisma@latest
npm i @prisma/client@latest
npx prisma init

// NextAuth Version 5 [authjs.dev]
// Configuratiion: [https://authjs.dev/getting-started/installation?framework=Next.js]
npm install next-auth@beta

// NextAuth v5 Prisma Adapter
[https://authjs.dev/getting-started/adapters/prisma]
npm i @auth/prisma-adapter

// Password encryption
npm i bcryptjs
npm i -D @types/bcryptjs
```

# NextAuth Setup

1. Start by creating a new *auth.ts* file at the root of your app with the following content.

```javascript
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})
```

2. Add a Route Handler under */app/api/auth/[...nextauth]/route.ts*.

```javascript
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
```

3. Add optional Middleware to keep the session alive, this will update the session expiry every time its called.

```javascript
export { auth as middleware } from "@/auth"
```

## MissingSecret in NextAuth [https://errors.authjs.dev#missingsecret]

In *Next.js*, put the *NEXTAUTH_SECRET* in the .env file:

## callback in auth.ts

[https://authjs.dev/guides/role-based-access-control#using-the-role]

## Augmenting Session for TypeScript

[https://authjs.dev/getting-started/typescript]



### How to general NEXTAUTH_SECRET hash string

Open the *Cmdr* as *bash* and type the following command to generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```




# NEON.TECH - Online Postgres Database

Signed Up on NEON with my Gmail
NEON Password: hasTe@247deKho

# ReactJS Tutorial

## useTransition
useTransition is a React Hook that lets you update the state without blocking the UI.
```javascript
const [isPending, startTransition] = useTransition()
```

// ------------------------------------------------------------------------
## DEFAULT MESSAGE OF NEXTJS 14.2.5
// ------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
