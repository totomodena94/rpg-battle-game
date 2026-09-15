# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A plain HTML/CSS/JavaScript turn-based RPG battle game, built as a learning exercise (part of a larger `javascript-exercises` repo). No build system, no package manager, no test framework, no dependencies — it's three files (`index.html`, `styles.css`, `app.js`) loaded directly by the browser.

## Running the game

Open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) and visit it. There is no build/compile step.

Combat is currently driven by `console.log` — open the browser dev console to see battle output when playing.

## Architecture

`app.js` has two distinct halves that aren't yet wired together:

1. **Combat simulation (top of file, runs immediately on load):** A synchronous 10-round loop runs at script parse time, from `for (let round = 1; round <= 10; round++)` down to the closing brace before the `attack` function. Each round creates an `enemy` object from `nameEnemy`/`introEnemy` (indexed by `round - 1`), applies round-based events (a healer every even round, a 50% chance "cursed wizard" attack debuff), then runs a `while (!combateTerminado)` loop alternating `attack(player, enemy)` / `attack(enemy, player)` until one side's `pointsLife` hits 0. `combateTerminado` is a single shared/global flag reset at the top of each round.
2. **DOM/menu wiring (bottom of file):** Grabs elements by ID (`new-game`, `menu`, `game`, `title`, `title2`, `creator`) and toggles their visibility on the "New Game" button click. This is the only part of the game currently rendered/controlled through the DOM — the actual battle UI (`#player`, `#enemy`, `.life`, `.sprite`, `.name` in `index.html`) is present in markup but not yet populated by JS.

Because the combat loop runs at load time rather than being triggered by the "New Game" button, playing a game today means opening the dev console before clicking anything.

**Enemy scaling:** enemy `pointsLife`/`pointsAttack` scale quadratically with round number (`30 + round*round*6`, `4 + round*round`). Player stats are rebalanced at the end of each round using the same quadratic pattern, preserving the player's life as a percentage of max life across the level-up.

**Equipment system:** three parallel arrays (`armasDisponibles` weapons, `escudosDisponibles` shields, `armadurasDisponibles` armor), each a tier list of `{name, bonus|blockChance|reduction}`. The player's current tier in each is tracked by a module-level index (`weaponLevel`, `shieldLevel`, `armorLevel`), currently hardcoded to `0` — there's no UI or logic yet for the player to change equipment mid-game. Weapon bonus adds to attack damage range; shield gives a flat chance to block enemy attacks entirely; armor reduces incoming damage by a percentage. All three only apply when `defensor === player` / `atacante === player` — enemies never benefit from equipment.

**Damage formula:** damage is `floor(random(min, max)) `, where for the player min/max are `(pointsAttack + weapon bonus) * 0.75` to `pointsAttack + weapon bonus`, and for enemies it's `pointsAttack * 0.75` to `pointsAttack`. A flat 15% dodge chance applies to every attack regardless of attacker/defender.

## Assets

- `PrimuAnxientTrialRegular-OGejo.ttf` / `primu-anxient-font/` / `primu-anxient-font.zip`: the custom display font (`@font-face` in `styles.css`), used for all text via `*{ font-family: "Primu anxient" }`.
- `styles.css` currently loads the page background from an external `behance.net` CDN URL rather than the local `background-image.gif` — check which one is intended before changing background styling.

## Language

Game text, variable/function names, and commit-adjacent comments are written in Spanish (e.g. `daño`, `atacante`, `defensor`, `combateTerminado`). Match this convention for in-game strings and combat-logic identifiers; it's fine to use English for anything unrelated to game content.
