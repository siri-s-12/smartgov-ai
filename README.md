# Medicure — AI Clinic Assistant (Frontend Prototype)

A **frontend-only** React Native + Expo + TypeScript prototype of Medicure,
an AI-powered clinic management app. There is **no backend, no database, and
no network/API calls** — every "AI" response is simulated using local mock
data in `src/data/`.

## Tech Stack
- React Native (Expo, SDK 54)
- TypeScript
- React Navigation (native-stack)
- Local/mock data only

## Getting Started

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS (Mac only), or scan the QR code with
the Expo Go app. `npm run web` also works for a quick browser preview.

## Folder Structure

```
src/
  components/     Reusable UI: AppButton, GlassCard, DoctorCard, Header, etc.
  screens/        One file per screen (see below)
  navigation/      RootNavigator (native-stack)
  constants/      Theme tokens (colors/spacing/radius/typography), departments
  data/           Mock doctors, queue, admin stats, and simulated "AI" logic
  types/          Shared TypeScript models + navigation param list
  assets/
    images/       Place real design images here once provided
    icons/        Place custom icon assets here once provided
```

## Screens (feature -> screen mapping)

| # | Feature                          | Screen file                              |
|---|-----------------------------------|-------------------------------------------|
| - | Landing / role entry              | `HomeScreen.tsx`                          |
| 1 | Patient symptom input             | `SymptomInputScreen.tsx`                  |
| 2 | AI department recommendation      | `AIRecommendationScreen.tsx`              |
| 3 | Doctor recommendation             | `AIRecommendationScreen.tsx`              |
| 4 | Doctor availability (5 slots)     | `DoctorAvailabilityScreen.tsx`            |
| 5 | Estimated waiting time            | `AIRecommendationScreen.tsx`              |
| 6 | Appointment booking               | `BookingConfirmationScreen.tsx`           |
| 7 | Patient AI summary                | `PatientSummaryScreen.tsx`                |
| 8 | Receptionist queue management     | `ReceptionistQueueScreen.tsx`             |
| 9 | Admin dashboard & clinic insights | `AdminDashboardScreen.tsx`                |

## How the "AI" is simulated

`src/data/mockAI.ts` contains a small local keyword-matching function
(`getAIRecommendation`) that maps free-text symptoms to a department and the
best-available mock doctor, plus helpers for mock time slots
(`getMockSlots`) and a mock doctor-facing summary (`getMockPatientSummary`).
None of this calls any external service — it's all deterministic local logic
so the prototype behaves consistently offline.

Example:
- Input: `"Fever, headache and cough"` → no keyword match → falls back to
  **General Medicine**, and picks whichever available doctor has the
  shortest mock queue (e.g. **Dr. Ananya Rao**).
- Input: `"Pain in my leg since 2 days"` → matches `"leg"` → **Orthopedics**
  → tries `Dr. Manjunath Gowda` first, who is marked `available: false` in
  the mock data, which triggers the "doctor unavailable, try a nearby
  center" flow with 4 mock healthcare centers.

## Styling — placeholder pending your screenshots

Every screen pulls its colors, spacing, radii, and typography from
`src/constants/theme.ts`. This is currently a reasonable placeholder (soft
teal glassmorphism, matching the Medicure/SmartGov brief) so the app is
fully usable right now. Once you send the design screenshots, restyling
should mostly mean editing `theme.ts` plus swapping icons/images into
`src/assets/` — the screens themselves won't need to change much.

## Not included (by design)
- No backend, database, or API calls
- No real authentication/OTP
- No real speech-to-text (the mic button in `SymptomInputScreen` fakes a
  short "listening" delay then fills in example text)
- No real SMS sending — this is noted only as a future backend feature
