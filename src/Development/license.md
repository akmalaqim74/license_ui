# License Card Design Specification (Now with 100% more vibes)

## Prompt: Create the License Front Card (The "Are you even old enough?" one)

**Objective:** Create the license front card component. The vibe is official, but like, Bikini Bottom official. Think SpongeBob getting his driver's license, but for being single.

**File:** `src/app/shared/components/license-front-card/license-front-card.component.ts`

**Design Reference:** SpongeBob's Driver License, but make it fashion.

**LAYOUT STRUCTURE:**
```
┌─────────────────────────────────────────────────────────┐
│  [HEADER BAR - Sunset yellow gradient]                  │
│  "SINGLE & THRIVING"          CLASS: [TITLE]            │
│  OFFICIAL SINGLE LICENSE      [LICENSE_NUMBER]          │
├───────────────┬─────────────────────────────────────────┤
│               │                                         │
│   [PHOTO]     │  [NAME - Bold, ALL CAPS, kinda loud]    │
│   Your best     │  [STATE NAME]                           │
│   meme face   │  MALAYSIA                               │
│   here        │                                         │
│               │  PHASE: [PHASE_NAME]                    │
│               │  SINCE: [SINGLE_SINCE_DATE]             │
├───────────────┤  ISSUED: [ISSUED_DATE]                  │
│ EXPIRES:      │  EXP: [EXPIRY_DATE]                     │
│ [NEVER?]      │                                         │
│               │  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~           │
│               │  [SIGNATURE - Illegible cursive]        │
└───────────────┴─────────────────────────────────────────┘
```

**COLOR SCHEME (Post-ironic beach party):**
- **Header background:** A chill linear gradient - `#F4D03F` to `#E9B824`. Think sunset over the pier.
- **Card background:** `#FDF6E3` (like an old Polaroid picture).
- **Text primary:** `#1a1a1a` (because contrast is key, in design and in life).
- **Text secondary:** `#4a4a4a`
- **Accent/borders:** `#2C3E50` (a serious, deep blue to show you're serious about being single).
- **Photo border:** Same deep blue.

**TYPOGRAPHY (Legible, but with personality):**
- **Header title "SINGLE & THRIVING":** Bold, sans-serif, wide tracking. Big mood.
- **"OFFICIAL SINGLE LICENSE":** Smaller, but still important.
- **License number:** Bold, monospace. Like it was typed on a vintage typewriter.
- **Name:** BOLD. ALL CAPS.
- **Labels (PHASE, SINCE, etc.):** Small caps, gray. The quiet friend.
- **Values:** Regular, readable.
- **Signature:** A wild, untamed cursive font. `Dancing Script` from Google Fonts is a good start.

**COMPONENT STRUCTURE:**
- `@Input() license: License;`
- Make sure to add `id="license-front-card"` so we can yeet it into a downloadable image later.

---

## Prompt: Create the License Back Card (The "Fine Print" bit)

**Objective:** Create the back of the license. This is where the stats and the funny rules go.

**File:** `src/app/shared/components/license-back-card/license-back-card.component.ts`

**LAYOUT STRUCTURE:**
```
┌─────────────────────────────────────────────────────────┐
│  [HEADER - "LICENSE TERMS & STATS"]                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  BATTLE STATS:                                          │
│  ─────────────────────────────────────                  │
│  Situationships This Year: [X] (Rookie numbers?)        │
│  Dating Apps Installed: [X] (Gotta catch 'em all)       │
│  Times Ghosted: [X] (It builds character)               │
│  "Focusing on Myself" Count: [X] (It's a full-time job) │
│                                                         │
│  ACHIEVEMENTS UNLOCKED:                                 │
│  [Badge] [Badge] [Badge]                                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  TERMS & CONDITIONS (Read fast like in commercials):    │
│  1. Holder is certified 100% single, no cap.            │
│  2. Not liable for any "we were just talking" scenarios.│
│  3. License requires annual emotional renewal.          │
│  4. Validity void upon posting a couple photo.          │
│                                                         │
│  ║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║                       │
│  [BARCODE that probably scans to a rickroll]            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**STYLING:**
- Same vibe as the front. Keep it consistent.
- Barcode can be faked with CSS or a barcode font. The content doesn't matter, it's all about the *aesthetic*.

**ACHIEVEMENT BADGES (Because we gamify everything now):**
- Little pill-shaped badges.
- **"Situationship Survivor"** - Millennial pink
- **"Left On Read Veteran"** - Sad boi blue
- **"Ghosting Sensei"** - Spooky purple
- **"Main Character Energy"** - Radiant green
- **"Emotional Damage Sponge"** - Orange, like the meme.

**COMPONENT STRUCTURE:**
- `@Input() license: License;`
- Add `id="license-back-card"` for the download button.

---

## Prompt: Create the Certificate (The "For the Wall of Fame")

**Objective:** A super fancy, over-the-top certificate to print and frame.

**File:** `src/app/shared/components/license-certificate/license-certificate.component.ts`

**LAYOUT (Landscape, because it's more dramatic):**
```
┌────────────────────────────────────────────────────────────────────┐
│  ✦ ═══════════════════════════════════════════════════════════ ✦  │
│  ║                                                              ║  │
│  ║            🏆 CERTIFICATE OF GLORIOUS SINGLEHOOD 🏆           ║  │
│  ║                                                              ║  │
│  ║                    Be it known to all that                   ║  │
│  ║                                                              ║  │
│  ║                    ~ [NAME] ~                                ║  │
│  ║                                                              ║  │
│  ║        Has demonstrated an elite level of independence       ║  │
│  ║        and is hereby awarded the title of:                   ║  │
│  ║                                                              ║  │
│  ║                  ✨ [TITLE] ✨                                ║  │
│  ║                                                              ║  │
│  ║        License No: [LICENSE_NUMBER]                          ║  │
│  ║        Current Phase: [PHASE] (It's not just a phase, mom)   ║  │
│  ║        Single Since: [DATE]                                  ║  │
│  ║                                                              ║  │
│  ║   Issued: [DATE]              Expires: [When you want it to] ║  │
│  ║                                                              ║  │
│  ║                         [SEAL OF APPROVAL]                     ║  │
│  ║                                                              ║  │
│  ║   _______________________                                    ║  │
│  ║   Chief Vibe Officer                                         ║  │
│  ║   Department of Self-Partnered Affairs                       ║  │
│  ║   Internet Chapter                                           ║  │
│  ✦ ═══════════════════════════════════════════════════════════ ✦  │
└────────────────────────────────────────────────────────────────────┘
```

**STYLING:**
- **Background:** Parchment texture. Very official.
- **Border:** Something ridiculously ornate.
- **Title:** A grand, sweeping serif font. `Playfair Display` is a good choice.
- **Name:** A flowy, elegant script font. `Great Vibes` or `Tangerine`.
- **Seal:** A big, gold, circular seal that says "CERTIFIED VIBE" or something equally silly.

**COMPONENT STRUCTURE:**
- `@Input() license: License;`
- Add `id="license-certificate"` for downloading.

---

## 📋 Summary of Design Prompts

| Component          | Style Reference                                          |
|--------------------|----------------------------------------------------------|
| **Front Card**     | SpongeBob's License - but for adults who use words like "aesthetic". |
| **Back Card**      | The back of a Pokémon card, but with emotional baggage stats. |
| **Certificate**    | Fancy diploma, but for successfully avoiding couple TikToks.   |