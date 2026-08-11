# Donnell and McBurns: An EPC Epic

A browser RPG about climbing the corporate ladder at an EPC (Engineering,
Procurement, Construction) company — built with [Phaser 3](https://phaser.io/),
no build step required.

You play **Karsh**, freshly promoted to Engineering Manager, working toward
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

**Controls:** Hit any key at the title screen to start. Arrow keys / WASD to
move, `SPACE` to talk/interact and to confirm menu choices, arrow keys to
navigate battle menus and the cubicle's mode-select menu.

## What's in the game

- **Title & intro** — a title card ("Donnell and McBurns: An EPC Epic") and a
  short story beat setting up the promotion before you land in the office.
- **Office overworld** — a floor plan modeled on a real EPC office layout
  (desk pods, conference rooms, a break room that slowly restores HP/MP,
  huddle rooms, print/copy, restrooms).
- **Your cubicle** — home base, on the west wall. Interact with it to open a
  mode-select menu and jump to a Site Visit, Visitor Day, or just stay on
  the office floor — the single hub for every mode.
- **Coworkers** — a fully fictional cast (Dave from Piping, a QA/QC manager
  who redlines everything, an HSE lead, a Regional Director, etc.) with
  their own dialogue, each with a procedurally generated face, hairstyle,
  and business-casual (or, for Visitor Day guests, casual) outfit.
- **Turn-based battles** — random encounters against corporate-satire
  enemies (Scope Creep, Reply-All Storm, Deadline Wraith). Attack, use MP
  on an Overtime Push, Guard, or Flee. Encounter zones roll once when you
  step into them, not on every tile you cross while inside one.
- **Promotion ladder** — leveling up advances your actual job title:
  Engineering Manager → Senior Engineering Manager → Director of
  Engineering → VP of Engineering → **Executive**. Reaching Executive is
  gated behind a scripted boss fight (a "Performance Review" against the
  Regional Director, found in the La Plata conference room), not just XP
  grinding.
- **Bonus Potential** — a 0–100 reputation score (with flavor labels from
  "Not Bonus Eligible" to "Stock Options Mentioned Once") that moves based
  on how battles and negotiations go.
- **Site visits** — separate construction-site maps reached from your
  cubicle. Clear three checkpoints (Safety, Schedule, Quality), survive
  hazard-zone encounters, then negotiate a change order with the client in
  a re-skinned battle (Push Back / Propose Change Order / Reassure /
  Concede).
- **Visitor Day** — a low-stakes bonus mode, also reached from your cubicle:
  family visits give a one-time Bonus Potential boost plus a free heal, and
  lunch vendors give a repeatable heal plus a temporary "Well Fed" battle
  buff.

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
    floorplan.js                Office map, NPC placements, home base cubicle
  scenes/
    TitleScene.js               Title card ("Hit any key to play")
    IntroScene.js                Story beat between the title card and the game
    BootScene.js               Generates all placeholder art procedurally (no image assets)
    OfficeScene.js              The office overworld
    SiteVisitScene.js           Site visit maps
    VisitorScene.js             Visitor Day lobby
    BattleScene.js              Shared turn-based battle engine (encounters, bosses, negotiations)
  main.js                       Phaser game config + global PLAYER_STATE
```

All art is generated procedurally at boot (`BootScene.js`) via Phaser's
`Graphics` API — no external image files, so the game runs from a plain
`file://` page with zero setup. Every character sprite (skin tone, hair
style/color, wardrobe trim) is derived deterministically from a hash of its
texture key, so the cast reads as individuals without needing per-character
art.

## Status

Actively evolving. Current focus has been core systems (movement, battles,
promotion ladder, site visits, Visitor Day, a title/intro flow, and a
cubicle hub for mode selection) over content volume — more coworkers, site
visits, and story beats are easy to add since everything is data-driven off
the files in `src/data/`.
