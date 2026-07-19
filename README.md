# EPC Quest

A browser RPG about climbing the corporate ladder at an EPC (Engineering,
Procurement, Construction) company — built with [Phaser 3](https://phaser.io/),
no build step required.

You play **Karsh**, a multi-disciplinary engineering manager working toward
Executive. Walk the office, fight off corporate chaos in turn-based battles,
run site visits, and negotiate with unreasonable clients.

## Running it

No install, no build tool. Just open `index.html` in a browser — Phaser
loads from a CDN and everything else is plain JS.

```
epc-quest/index.html
```

(If you're on a system with `python3`, `npx serve`, or similar, serving the
folder over `http://localhost` works too, but isn't required.)

**Controls:** Arrow keys / WASD to move, `SPACE` to talk/interact and to
confirm menu choices, arrow keys to navigate battle menus.

## What's in the game

- **Office overworld** — a floor plan modeled on a real EPC office layout
  (desk pods, conference rooms, a break room that slowly restores HP/MP,
  huddle rooms, print/copy, restrooms).
- **Coworkers** — a fully fictional cast (Dave from Piping, a QA/QC manager
  who redlines everything, an HSE lead, a Regional Director, etc.) with
  their own dialogue.
- **Turn-based battles** — random encounters against corporate-satire
  enemies (Scope Creep, Reply-All Storm, Deadline Wraith). Attack, use MP
  on an Overtime Push, Guard, or Flee.
- **Promotion ladder** — leveling up advances your actual job title:
  Engineering Manager → Senior Engineering Manager → Director of
  Engineering → VP of Engineering → **Executive**. Reaching Executive is
  gated behind a scripted boss fight (a "Performance Review" against the
  Regional Director), not just XP grinding.
- **Bonus Potential** — a 0–100 reputation score (with flavor labels from
  "Not Bonus Eligible" to "Stock Options Mentioned Once") that moves based
  on how battles and negotiations go.
- **Site visits** — separate construction-site maps reached via an office
  portal. Clear three checkpoints (Safety, Schedule, Quality), survive
  hazard-zone encounters, then negotiate a change order with the client in
  a re-skinned battle (Push Back / Propose Change Order / Reassure /
  Concede).
- **Visitor Day** — a low-stakes bonus mode: family visits give a one-time
  Bonus Potential boost plus a free heal, and lunch vendors give a
  repeatable heal plus a temporary "Well Fed" battle buff.

## Project structure

```
index.html                  Entry point — loads Phaser (CDN) + all scripts in order
src/
  data/                      Plain-data config, no logic
    ranks.js                 Promotion ladder thresholds/titles
    bonus.js                 Bonus Potential scoring + labels
    coworkers.js              Office NPC roster + dialogue
    enemies.js / bosses.js    Random encounters + the Executive boss fight
    clients.js                Client negotiation "boss" data
    site_hazards.js           Random encounters specific to site visits
    sitevisits.js              Site visit map(s), checkpoints, client trailer
    visitors.js                Visitor Day cast + lobby map
    floorplan.js                Office map, NPC placements, portals
  scenes/
    BootScene.js               Generates all placeholder art procedurally (no image assets)
    OfficeScene.js              The office overworld
    SiteVisitScene.js           Site visit maps
    VisitorScene.js             Visitor Day lobby
    BattleScene.js              Shared turn-based battle engine (encounters, bosses, negotiations)
  main.js                       Phaser game config + global PLAYER_STATE
```

All art is generated procedurally at boot (`BootScene.js`) via Phaser's
`Graphics` API — no external image files, so the game runs from a plain
`file://` page with zero setup.

## Status

Actively evolving. Current focus has been core systems (movement, battles,
promotion ladder, site visits, Visitor Day) over content volume — more
coworkers, site visits, and story beats are easy to add since everything
is data-driven off the files in `src/data/`.
