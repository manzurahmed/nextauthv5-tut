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
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add sonner

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

// UUID
npm i uuid
npm install --save-dev @types/uuid

// Resend
npm i resend

// Spinners
npm i react-spinners
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

## Getting Github clientId and clientSecret

1. Go to your Github account
2. Click on your profile avatar and choose *Settings* from the dropdown menu.
3. Click *Developer Settings*.
4. Click *OAuth Apps* from the left sidebar.
5. Click *New OAuth App" button.
6. You should see your new clientId and generate a clientSecret from here.

## Getting Google clientId and clientSecret

1. Go to (Google Cloud console)[https://console.cloud.google.com/].
2. Beside the Google Cloud logo, click on the projects list. Click *NEW PROJECT*.
3. Give a project name for your project and create the project. After few moment, your new project will be created and press the "Select Project" button.
4. Later, your new project will open to a new page.
5. Search "Apis and Services" from the top search bar.
6. Click on "OAuth consent Screen" and select "External" from the right hand side and press the "CREATE" button.
7. Type in your app name in "App Information" section
8. Type in your support email and developer email address.
9. Click on the "Save and Continue" button. Click on the Save and Continue button on the next screens.
10. Click on "Go to Dashboard".
11. Next click on "Credentials" link on the left sidebar.
12. Press the "Create Credentials" and click on "OAuth client ID".
    - Application type: Web application
    - Name: Web client 1
    - Authorized JavaScript origins: http://localhost:3000
    - Authorized redirect URIs
13. Click on "CREATE" button.
14. A popup will appear where you should see your Client ID and Client secret.
    - Client ID:
    - Client secret:

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
