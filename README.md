## notes and project structure

- turbopack is not supported yet
- components: Reusable components for other projects
- modules: Project-specific components that may only be reused within the project.
- Hooks: Common hooks for broader usage.
- services: Handles data fetching, caching, and state management. Separates data logic from UI elements.
- Next framework, jotai for data management, tailwind for styling(I would suggest UnoCSS if it's not Next framework).

## Introduction

This is a webiste for you and another player to play: https://en.wikipedia.org/wiki/Rock_paper_scissors#Additional_weapons

### Process

**It's a game for two players, if you just want to test the game, it's better to use two browsers.**

1. First hand creats the game: deployed the game contract, assign the second hand and stake some money
2. Second hand join the game with the game contract address provided by the first hand.
3. Second hand made its move and stake same amount of money as the first hand.
4. First hand reveal its move and salt. Result revealed and game over.
5. If any party doesn't response within 5 minutes, the other party can end the game and get the stake back.
6. You can always restart a new game from landing page, every time the game restarted, a new contract will be deployed.

I hope the website and process introduction provides you the clear processing logic, but a vedio below is also provided to guide you:

https://github.com/Ricy137/RSPGame-Next/assets/97211928/4d51e6ad-0d77-4cf1-964a-69faf4178920

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the dev env

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
