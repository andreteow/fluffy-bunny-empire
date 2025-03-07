# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f5103d46-3532-48c0-b169-12091a042b33

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f5103d46-3532-48c0-b169-12091a042b33) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```



# Bunny Clicker Game – Design Brief

## Overview
A whimsical incremental **clicker game** inspired by *Universal Paperclips*, where the player nurtures an ever-growing population of cute bunnies. The player starts with a single bunny and provides food by clicking, helping the bunny multiply over time. The theme is lighthearted and pastel-colored, with an absurdly fun end goal of filling the planet with bunnies.

## Core Gameplay Mechanics

- **Click to Feed**: Each click feeds the bunny one unit of food. This is the primary action for the player at the start, directly increasing the bunny’s fullness and progress toward multiplication.

- **Multiplication Milestones**: The bunny population doubles when certain feeding thresholds are reached. For example, after **100 feedings** the single bunny reproduces (becoming two bunnies). At higher milestones (e.g., **1,000 total feedings**), the rabbit population doubles again. Each subsequent multiplication requires a larger feeding count, creating an exponential growth curve as the game progresses.

- **Market System (Selling Bunnies as Pets)**: Once the player has more bunnies than they can handle, they can sell excess rabbits as pets for in-game currency. The pet **market features supply and demand price fluctuations**:
  - **Randomized Value Tiers**: Each rabbit has a base value categorized as Low, Mid, or High. Most rabbits (about 60%) are low-value, 30% are mid-value, and 10% are high-value pets. High-value bunnies fetch more money when sold.
  - **Demand Cycles**: Market demand shifts in cycles every **30 seconds**, affecting sale prices:
    - *High Demand* – Rare (10% chance): Pet buyers pay **double** the normal price for rabbits.
    - *Normal Demand* – Common (70% chance): Rabbits sell at their standard base price.
    - *Low Demand* – Occasional (20% chance): Rabbits sell for half price due to market oversupply.
  - **Market Timer**: A visible countdown clock shows time until the next demand shift. This allows the player to strategize, such as selling large batches of rabbits during high demand for maximum profit.

- **Automation (Self-Feeding Rabbits)**: After the population reaches a certain size or milestone, the bunnies become **self-aware and start feeding themselves**. At this point, food generation becomes partially automated — for example, each bunny might start contributing a small number of autonomous feedings per second. This automation eases the reliance on player clicks and dramatically accelerates growth as the colony expands.

- **Technology Progression**: As the rabbits evolve and organize, they begin to **research and build tools**. The bunny colony can invent technologies (e.g. carrot farming tools, automated feeders, toy workshops) that improve efficiency. Rabbits eventually produce **sellable items** (like handmade toys or tools) which can be sold for additional revenue. This tech tree gives the player new goals beyond feeding, providing upgrades that increase feeding rates, breeding rates, and market profits.

- **Resource Management (Food Supply)**: Food starts as a **finite resource**, adding a layer of strategy. The player initially relies on a limited stash of carrots to feed the bunnies. If food runs out, feeding (and therefore growth) pauses. To counter this, the rabbit colony can research agriculture or find creative solutions to **grow their own food**. Eventually, the rabbits might build carrot farms or hydroponic gardens, ensuring an infinite food supply to sustain their exponential multiplication.

- **Endgame Goal**: The ultimate objective is to breed an astronomical **100 billion rabbits**, effectively covering the planet in bunnies. Reaching this number triggers the win condition of the game. At endgame, the player has guided the humble bunny colony from one tiny rabbit to a world-spanning civilization of rabbits. (Optional narrative twist: perhaps the bunnies prepare to launch into space after conquering Earth, adding a humorous narrative capstone.)

## Art & Sound

- **Art Style**: Cute and whimsical visuals define the game’s look. Expect **pastel-colored** graphics and adorable bunny animations (e.g. bunnies hopping or nibbling on carrots). The interface remains clean and minimalist like *Universal Paperclips*, but with soft edges and charming cartoon imagery to reinforce the lighthearted theme.

- **Music & Sound**: A gentle, **whimsical soundtrack** plays in the background, creating a relaxing atmosphere. As the game progresses and the bunnies become self-aware and more technologically advanced, the music subtly shifts in tone. Early on, tunes are simple and cheerful; later, they grow slightly more complex or epic to reflect the rabbits’ newfound sophistication. Sound effects (like munching noises or happy squeaks) reward clicking and milestone events, adding feedback and personality to the experience.

