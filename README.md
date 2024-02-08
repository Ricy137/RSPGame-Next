## Introduction

Welcome! This is a web-based game allows you and another player to play [additional version of Rock, Paper, and Scissors](https://en.wikipedia.org/wiki/Rock_paper_scissors#Additional_weapons) on chain. 

The project focuses on keeping data updated with the blockchain, and preventing players from losing their money (Cryptographically Secure Random Value, timeout responses, e.t...). and some tricks with etherjs. But the prompts of game rules won't be stressed, and players are expected to know the rules before playing.

### Rules explained
![rules](https://github.com/Ricy137/RSPGame-Next/assets/97211928/ff050285-0f0c-4564-81ce-4a1014eb2afe)

Scissors cuts paper.
Paper covers rock.
Rock crushes lizard.
Lizard poisons Spock.
Spock smashes scissors.
Scissors decapitates lizard.
Lizard eats paper.
Paper disproves Spock.
Spock vaporizes rock.
Rock crushes scissors.

[live demo](https://rsp-game-next.vercel.app/)

[game contract for each round](https://github.com/clesaege/RPS/blob/master/RPS.sol)

### Process

**It's a game for two players, if you just want to test the game, it's better to use two browsers.**

1. First-hand creats the game: deploys the game contract, commits its move, assigns the second hand and stakes some money. First-hand will get the game address and salt after creating the game and first hand need to save the salt and send the game address for second hand to play.
2. Second-hand joins the game with the game contract address provided by the first hand.
3. Second-hand makes its move and stakes same amount of money as the first hand.
4. First-hand reveals its move and salt. Result reveals and game over.
5. If any party doesn't response within 5 minutes, the other party can end the game and get the stake back(if the second-hand didn't join, the first-hand will recieve its stake, and if the fist-hand was unwilling to reveal it's original move, the second-hand will get stakes of both).
6. You can always restart a new game from landing page, every time the game restarted, a new contract will be deployed.

## notes and project structure

- turbopack is not supported yet
- components: Reusable components for other projects
- modules: Project-specific components that may only be reused within the project.
- Hooks: Common hooks for broader usage.
- services: Handles data fetching, caching, and state management. Separates data logic from UI elements.
- Next framework, jotai for data management, tailwind for styling.

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
