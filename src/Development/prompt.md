# Angular Single License Generator - Dev Prompts (Vibe Check Edition)

## Prompt 1: The Genesis Block (Project Setup)

**Let's cook.** We're starting a new Angular 18+ project.

- **Project name:** `single-license-web`
- **The Stack:**
  - Angular 18+ (Standalone everything, no more ngModules, we die like men)
  - Tailwind CSS (for the drip)
  - Angular Router (so we can get lost)
  - `HttpClient` (to talk to the outside world)

**Folder Structure (The Blueprint):**
```
src/app/
├── core/
│   ├── services/
│   │   └── license.service.ts
│   ├── models/
│   │   └── license.model.ts
│   └── interceptors/
│       └── api.interceptor.ts
├── shared/
│   └── components/
│       └── loading-spinner/
├── pages/
│   ├── home/
│   │   └── home.component.ts
│   ├── register/
│   │   └── register.component.ts
│   ├── renew/
│   │   └── renew.component.ts
│   └── view-license/
│       └── view-license.component.ts
├── app.component.ts
├── app.routes.ts
└── app.config.ts
```

**Env Setup:**
- `environment.ts` with `apiUrl: 'http://localhost:3000/api/v1'`

**Routes (The Map):**
- `/` → `HomeComponent` (The front door)
- `/register` → `RegisterComponent` (Join the club)
- `/renew` → `RenewComponent` (Pay your annual dues)
- `/api/v1/license/:licenseNumber` → `ViewLicenseComponent` (Flex the license)

**Dependencies (The Squad):**
- `html2canvas` (for screenshotting our masterpieces)
- `@angular/forms` (because forms are inescapable)

---

## Prompt 2: Define the Universe (Create the Models)

Let's define our data shapes. This is the boring part, but it's important.

**File:** `src/app/core/models/api/v1/license.model.ts`

**Interfaces (The Cast of Characters):**
- `State`, `Phase`, `GeneralStatus`: The lookup tables. The canon lore.
- `LicenseExtras`: The juicy stats.
  - `lcex_situationships_count`: number
  - `lcex_dating_apps_count`: number
  - `lcex_ghosted_count`: number
  - `lcex_ghosted_count`: number
  - `lcex_self_focus_count`: number
  - `lcex_bonus_titles`: string[] (The achievements)
- `License`: The main character. Has all the things.
- `CreateLicenseRequest`, `RenewLicenseRequest`, `UpdateExtrasRequest`: The things we send to the backend.
- `ApiResponse<T>`: The shape of every response from our API.

---

## Prompt 3: The Messenger (Create the License Service)

Create the service that actually talks to the API.

**File:** `src/app/core/services/api/v1/license.service.ts`

Use `inject(HttpClient)`. It's the new hotness.

**Methods (The Spells):**
- `getStates()`: Fetches all the states.
- `getPhases()`: Fetches all the single "phases."
- `register(data: CreateLicenseRequest)`: Creates a new license. Gotta use `FormData` for the photo upload.
- `renew(licenseNumber: string, data?: RenewLicenseRequest)`: Renews a license.
- `updateExtras(licenseNumber: string, data: UpdateExtrasRequest)`: Updates the fun stats.
- `getLicense(licenseNumber: string)`: Gets a specific license to show off.

---

## Prompt 4: The Welcome Mat (Create the Home Page)

**File:** `src/app/pages/home/home.component.ts`

This is the landing page. Make it pop.
- **Headline:** "Get Your Official Single License™" or something equally dramatic.
- **Subtext:** "Certified by the Department of Self-Partnered Affairs."
- **Buttons:**
  - "Get My License" → `/register`
  - "Renew My Vows (to Myself)" → `/renew`
- **Fake Stats Section:**
  - "69,420 Singles Certified"
  - "42,069 Renewals This Year"
  - "100% Uncuffed"

**Styling:** Dark theme. Gradient accents. Let's get some vaporwave vibes in here.

---

## Prompt 5: The Initiation (Create the Register Page)

**File:** `src/app/pages/register/register.component.ts`

This is the form. Use Reactive Forms.
- **Required Info:** Name, Photo (optional), Single Since, State, Current Phase.
- **Optional Fun Questions (The "personality test"):**
  - "How many situationships this year?"
  - "Dating apps installed?"
  - "Times ghosted?"
  - "Times you've said 'I'm focusing on myself'?"
- Show a preview of the photo.
- Show loading spinners. Don't leave the user hanging.
- On success, send them to their new license page.

---

## Prompt 6: The Annual Pilgrimage (Create the Renew Page)

**File:** `src/app/pages/renew/renew.component.ts`

For returning champions.
- **Step 1:** Find their license with their license number.
- **Step 2:** Show their current info. Give them an option to "level up" their Phase.
- On success, show them the newly renewed license.

---

## Prompt 7: The Trophy Room (Create the View License Page)

**File:** `src/app/pages/view-license/view-license.component.ts`

This is the main event. Where they see their glorious license.
- Display the `license-front-card`, `license-back-card`, and `license-certificate`.
- Load the license data from the URL.
- **Buttons:**
  - "Download as Image" (using `html2canvas`)
  - "Share" (copy link)
  - "Update My Stats" (for when the numbers go up)
- Show a cool loading skeleton while the data is fetching.
- If the license doesn't exist, show a "404 Not Found" meme.

---

## Prompt 8: The Building Blocks (Create Reusable Card Components)

Let's make the display components.
- `license-front-card.component.ts`
- `license-back-card.component.ts`
- `license-certificate.component.ts`
- All of them take `@Input() license: License`.
- These should be styled to perfection, ready to be screenshotted and posted.

---

## Prompt 9: The Export Button (Download/Share Functionality)

Update the `view-license.component.ts` to make the buttons work.
- Implement the `downloadCard` function using `html2canvas`.
- Make separate buttons to download the front, back, and certificate.
- The share button should just copy the URL. Simple and clean.

**`html2canvas` Snippet:**
```typescript
import html2canvas from 'html2canvas';

async downloadCard(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return; // Guard clause, king
  const canvas = await html2canvas(element, {
    scale: 3, // Go for high-res
    backgroundColor: null, // Keep transparency
  });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
```

---

## 📋 Game Plan

1.  **Prompt 1:** Foundation.
2.  **Prompt 2:** Lore.
3.  **Prompt 3:** Communication.
4.  **Prompt 4-7:** Build the world.
5.  **Prompt 8-9:** Add the cool features.

---

## 🎨 Color Palette (The Vibe)
```css
/* Suggested theme */
--bg-primary: #1a1a2e; /* Deep space blue */
--bg-secondary: #16213e; /* A slightly different blue */
--bg-card: #0f3460; /* The card itself */
--accent-pink: #e94560; /* Loud pink */
--accent-purple: #7b2cbf; /* Royal purple */
--accent-gradient: linear-gradient(135deg, #e94560, #7b2cbf); /* The real magic */
--text-primary: #ffffff; /* White text, duh */
--text-secondary: #a0a0a0; /* Gray for the whispers */
```