# Donnell and McBurns: An EPC Epic

A browser RPG about climbing the corporate ladder at an EPC (Engineering,
Procurement, Construction) company — built with [Phaser 3](https://phaser.io/),
no build step required.

You play **Karsh**, freshly promoted to Engineering Manager, working toward
Executive. Walk the office, fight in conference rooms and huddle spaces, run
site visits, and negotiate change orders with clients.

## Running it

No install, no build tool. Just open `index.html` in a browser — Phaser
loads from a CDN and everything else is plain JS.

```
epc-quest/index.html
```

(If you're on a system with `python3`, `npx serve`, or similar, serving the
folder over `http://localhost` works too, but isn't required.)

**Controls:** Hit any key at the title screen to start. Arrow keys / WASD to
move, `SPACE` to talk/interact/fight and to confirm menu choices, `H` to warp
back to your cubicle from anywhere in the office, arrow keys to navigate
battle menus and the cubicle's mode-select menu. The title and intro screens
play a small procedurally-synthesized beat.

## What's in the game

- **Title & intro** — a title card over a procedurally drawn construction
  blueprint (storage tanks, a flare stack, a crane) and a short story beat
  setting up the promotion before you land in the office.
- **Two floors, two departments** — **GFS** is Engineering (the main office
  floor: desk pods, conference rooms, a break room). **CDB** is Construction
  (estimators, schedulers, construction managers). Stairs on each floor take
  you to the other.
- **Your cubicle** — home base, on GFS's west wall. Interact with it to open
  a mode-select menu: Office, Site Visit, Visitor Day, or PTO — the single
  hub for every mode.
- **Coworkers** — a large fictional cast across both floors, each with a
  procedurally generated face, hairstyle, and business-casual (or, for
  Visitor Day guests, casual) outfit. A few wander a small loop between the
  break room and nearby desks instead of standing still.
- **Turn-based battles** — no random encounters. Every conference room and
  every former "solid" landmark room (stairs, restrooms, huddle rooms,
  utility, print/copy, etc.) is walkable and has one battle object inside —
  walk up and hit SPACE to fight. A handful of coworkers (the QA/QC manager,
  the client rep, a rival Engineering Manager from CDB) trigger a fight when
  their dialogue ends instead. Corporate-satire enemies: Scope Creep,
  Reply-All Storm, Deadline Wraith, Redline Barrage, Schedule Slip, and more.
- **Promotion ladder** — leveling up advances your actual job title:
  Engineering Manager → Senior Engineering Manager → Director of
  Engineering → VP of Engineering → **Executive**. Executive is gated behind
  a scripted boss fight (a "Performance Review" against the Regional
  Director, in the La Plata conference room).
- **Bonus Potential** — a reputation score starting at 20, with flavor labels
  from "Not Bonus Eligible" to "Stock Options Mentioned Once." Maxing it out
  at 100 rolls over and queues a level up, same as XP overflow — but neither
  path applies until you get a change order approved on a site visit, so
  leveling needs progress in the office *and* on-site, not either alone.
- **Site visits** — construction-site maps reached from your cubicle. Clear
  three checkpoints (Safety, Schedule, Quality), survive hazard-zone
  encounters, then negotiate a change order with the client — winning it is
  what unlocks any level up you've queued up.
- **Visitor Day** — a low-stakes bonus mode reached from your cubicle, with
  a bigger, more decorated lobby (flower beds, more trees). Family give a
  one-time Bonus Potential boost plus a free heal; vendors give a repeatable
  heal plus a temporary "Well Fed" battle buff; subcontractors give a
  repeatable small Bonus Potential bump; clients give a bigger one-time
  Bonus Potential boost. Every visitor's title states their category
  (Vendor —, Subcontractor —, Client —) so they're easy to tell apart.
- **PTO** — take time off with Colleen and Indra from your cubicle. Fully
  restores HP/MP, at the cost of some Bonus Potential.

## Project structure

```
index.html                  Entry point — loads Phaser (CDN) + all scripts in order
src/
  audio.js                   Procedurally synthesized title/intro beat (Web Audio API)
  data/                      Plain-data config, no logic
    ranks.js                 Promotion ladder thresholds/titles + shared level-up growth
    bonus.js                 Bonus Potential scoring + labels
    coworkers.js              Coworker roster + dialogue, both floors
    enemies.js / bosses.js    Battle-object/chat-triggered fights + the Executive boss fight
    clients.js                Client negotiation "boss" data
    site_hazards.js           Random encounters specific to site visits
    sitevisits.js              Site visit map(s), checkpoints, client trailer
    visitors.js                Visitor Day cast + lobby map
    floorplan.js                FLOORS.GFS / FLOORS.CDB — maps, NPCs, battle objects, stairs, cubicle
  scenes/
    TitleScene.js               Title card + blueprint art ("Hit any key to play")
    IntroScene.js                Story beat + controls legend, between title and the game
    BootScene.js               Generates all placeholder art procedurally (no image assets)
    OfficeScene.js              The office overworld (either floor)
    TransitionScene.js          Brief "Travelling to Site..."-style message between modes
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
art (a couple of characters pin a specific hair color instead of hashing it).

## Status

Actively evolving. Current focus has been core systems (movement, battles,
promotion ladder, site visits, Visitor Day, PTO, a two-floor office, and a
cubicle hub for mode selection) over content volume — more coworkers, site
visits, and story beats are easy to add since everything is data-driven off
the files in `src/data/`.
