# Donnell and McBurns: An EPC Epic

A browser RPG about climbing the corporate ladder at an EPC (Engineering,
Procurement, Construction) company — built with [Phaser 3](https://phaser.io/),
no build step required.

You play **Karsh**, freshly promoted to Engineering Manager, working toward
Executive. Walk the office, fight in conference rooms and huddle spaces, run
site visits across five industries, and negotiate change orders with clients.

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
play a small procedurally-synthesized beat; the intro also shows the full
controls legend.

**On a phone or tablet:** open the same page and on-screen controls appear —
a thumb pad plus `SPACE` and `H` buttons. The pad reads direction from where
your thumb sits, so you can slide between directions without lifting and hold
a corner to walk diagonally. In portrait the game sits above the controls; in
landscape they tuck into the letterbox bands beside the canvas. They stay
hidden on desktop, and on a touchscreen laptop until you actually touch the
screen.

## What's in the game

- **Title & intro** — a title card over a procedurally drawn construction
  blueprint (storage tanks, a flare stack, a crane) and a short story beat
  setting up the promotion before you land in the office.
- **Three floors, three departments** — **GFS** is Engineering (the main
  office floor: desk pods, conference rooms, a break room). **CDB** is
  Construction (estimators, schedulers, construction managers). **EXEC** is
  the executive floor — private offices for the COO/CFO/General Counsel plus
  their secretaries at desks outside each door, and a boardroom. Nobody on
  EXEC will interact with you until you've made Director; the fights up
  there are deliberately much tougher than anything else in the game. Each
  floor has its own color palette so they read as distinct places. Stairs
  connect GFS↔CDB and GFS↔EXEC.
- **Your cubicle** — home base, on GFS's west wall. Interact with it to open
  a mode-select menu: Office, Site Visit (lists every unlocked site), Visitor
  Day, or PTO — the single hub for every mode.
- **Coworkers** — a large fictional cast across all three floors, each with a
  procedurally generated face, hairstyle, and business-casual (or, for
  Visitor Day guests, casual) outfit. A few wander a small loop between the
  break room and nearby desks instead of standing still.
- **Turn-based battles** — no random encounters. Every conference room and
  every former "solid" landmark room (stairs, restrooms, huddle rooms,
  utility, print/copy, etc.) is walkable and has one battle object inside —
  walk up and hit SPACE to fight. A handful of coworkers (the QA/QC manager,
  the client rep, a rival Engineering Manager from CDB, and the EXEC-floor
  big wigs) trigger a fight when their dialogue ends instead. Corporate-satire
  enemies: Scope Creep, Reply-All Storm, Deadline Wraith, Redline Barrage,
  Schedule Slip, and more.
- **Promotion ladder** — leveling up advances your actual job title:
  Engineering Manager → Senior Engineering Manager → Director of
  Engineering → VP of Engineering → **Executive**. Every level up (however
  it's triggered) hands you a brief "note from the executives" congratulating
  you before you're back on the floor. Executive itself isn't unlocked by
  leveling — it's earned on the EXEC floor: a scripted "Performance Review"
  boss fight against the Regional Director (La Plata conference room, GFS,
  available at VP) confirms you're ready, then you have to beat all four
  EXEC-floor bosses (the COO, the CFO, General Counsel, and the Board) to
  actually win the promotion — and the game.
- **Bonus Potential** — a reputation score starting at 20, with flavor labels
  from "Not Bonus Eligible" to "Stock Options Mentioned Once." Maxing it out
  at 100 rolls over and queues a level up, same as XP overflow — but neither
  path applies until you get a change order approved on a site visit, so
  leveling needs progress in the office *and* on-site, not either alone.
- **Site visits** — six construction-site maps reached from your cubicle,
  spanning multiple industries: a processing facility, a food manufacturing
  plant, a T&D line rebuild, an oil & gas refinery turnaround, a bridge
  replacement, and a water treatment plant upgrade. Clear three checkpoints
  (Safety, Schedule, Quality) at each, survive hazard-zone encounters, then
  negotiate a change order with the client — winning it is what unlocks any
  level up you've queued up. Completing the first site (Meridian Phase 2)
  unlocks the other five in the cubicle's menu.
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
  touch.js                   On-screen phone/tablet controls — synthesizes the
                             same key events the scenes already listen for
  data/                      Plain-data config, no logic
    ranks.js                 Promotion ladder thresholds/titles + shared level-up growth
    bonus.js                 Bonus Potential scoring + labels
    coworkers.js              Coworker roster + dialogue, all three floors
    enemies.js / bosses.js    Battle-object/chat-triggered fights, EXEC-floor bosses, the Executive boss fight
    clients.js                Client negotiation "boss" data, one per site visit
    site_hazards.js           Random encounters specific to site visits, generic + industry-specific
    sitevisits.js              All six site visit maps, checkpoints, client trailers, unlock rules
    visitors.js                Visitor Day cast + lobby map
    floorplan.js                FLOORS.GFS / CDB / EXEC — maps, NPCs, battle objects, stairs, cubicle
  scenes/
    TitleScene.js               Title card + blueprint art ("Hit any key to play")
    IntroScene.js                Story beat + controls legend, between title and the game
    BootScene.js               Generates all placeholder art procedurally (no image assets)
    OfficeScene.js              The office overworld (any of the three floors)
    TransitionScene.js          Brief "Travelling to Site..."-style message between modes
    PromotionScene.js           "A note from the executives" screen shown on any level up
    SiteVisitScene.js           Site visit maps
    VisitorScene.js             Visitor Day lobby
    BattleScene.js              Shared turn-based battle engine (encounters, bosses, negotiations)
  main.js                       Phaser game config + global PLAYER_STATE
```

All art is generated procedurally at boot (`BootScene.js`) via Phaser's
`Graphics` API — no external image files, so the game runs from a plain
`file://` page with zero setup. Every character sprite (skin tone, hair
style/color, wardrobe trim, arms) is derived deterministically from a hash
of its texture key, so the cast reads as individuals without needing
per-character art (a couple of characters pin a specific hair color instead
of hashing it). Walls draw as thin architectural lines that pick their
orientation from their neighbors, rather than solid blocks, so a run of
walls reads as one continuous line instead of a stack of dashes.

## Status

Actively evolving. Current focus has been core systems (movement, battles,
promotion ladder, six site visits across five industries, Visitor Day, PTO,
a three-floor office, and a cubicle hub for mode selection) over content
volume — more coworkers, site visits, and story beats are easy to add since
everything is data-driven off the files in `src/data/`.
