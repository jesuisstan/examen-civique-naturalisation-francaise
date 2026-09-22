# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Expo (SDK 55) / React Native universal app (iOS, Android, web) helping users prepare the French
civic naturalization exam. All user-facing content is in French. There is no backend: the question
dataset ships as a bundled JSON file.

## Commands

```bash
npm start                    # Expo dev server
npm run start:clear          # dev server with cleared Metro cache
npm run start:tunnel         # dev server over ngrok tunnel (physical devices off-LAN)
npm run android | ios | web  # start on a specific platform
npm run lint                 # expo lint (ESLint)
npx tsc --noEmit             # typecheck (strict mode)

npm run build:dev:android    # EAS dev-client build
npm run build:prod:android   # EAS production build (autoIncrement)
npm run deploy:web           # expo export --platform web + eas deploy --prod
```

No test suite is configured.

## Architecture

**Routing.** expo-router with file-based routes under `src/app/` (not the default `app/`).
`typedRoutes` is enabled, so route strings are typechecked. Routes: `index` (Accueil) and
`questions`. `src/app/_layout.tsx` is the only layout — it wraps everything in a React Navigation
`ThemeProvider`, renders `AnimatedSplashOverlay`, then `AppTabs`.

**Platform splitting via file extensions.** Metro resolves `*.web.tsx` over `*.tsx` on web. This is
the main mechanism for platform divergence, and the two variants are genuinely different
implementations, not styling tweaks:

- `app-tabs.tsx` uses `expo-router/unstable-native-tabs` (`NativeTabs`) — a bottom native tab bar
  whose triggers are named after route files (`index`, `questions`).
- `app-tabs.web.tsx` uses `expo-router/ui` (`Tabs`/`TabList`/`TabTrigger`/`TabSlot`) — a floating
  top pill bar whose triggers use arbitrary names + `href` (`home` → `/`).
  **When adding a route, both files must be updated, with the naming convention each one requires.**
- `use-color-scheme.web.ts` returns `'light'` until hydration, to keep static web rendering stable.
- `animated-icon.web.tsx` + `animated-icon.module.css` replace the Reanimated splash overlay.

**Theming.** `src/constants/theme.ts` is the single source of design tokens: `Colors.light` /
`Colors.dark` (keys typed as `ThemeColor`), `Spacing`, `Fonts`, `MaxContentWidth`, `BottomTabInset`.
Components never hardcode colors or spacing — they call `useTheme()` (resolves the OS scheme to a
`Colors` object) and use `ThemedText` / `ThemedView`, which accept a `ThemeColor` key rather than a
raw color. Web font tokens are CSS variables defined in `src/global.css`, imported from `theme.ts`.

**Content and links.** Every French UI string lives in `src/constants/content.ts` and every external
URL in `src/constants/links.ts`. Do not inline user-facing text or URLs in components.

**Data.** `src/constants/data-gouv-qcm-civique-naturalisation.json` (official Ministère de
l'Intérieur questions, suggested answers from leqcmcivique.fr under Licence Ouverte 2.0 / Etalab) is
typed by `src/types/questions.ts` and accessed only through `useQuestions()`, which memoizes the
theme list, the flat question list, and a theme→questions lookup. The legal disclaimer about answer
provenance (`DisclaimerBanner`) is a licensing requirement — keep it visible.

**Path aliases.** `@/*` → `src/*`, `@/assets/*` → `assets/*`.

## Working in this repo

`.claude/rules/*` are binding; `.claude/agents/` holds the subagents. Implementation work is
delegated by default — `frontend` (screens, components, styling, the `*.web.tsx` variants),
`data-content` (dataset, types, hooks, `content.ts` / `links.ts` / `theme.ts`), `verifier` (browser
QA, web target only, never edits code). The routing table and the write → verify loop live in
`.claude/rules/agent-delegation.md`; git discipline (task branch off `main`, PR reviewed by a human)
in `.claude/rules/git-workflow.md`.

There are no automated tests. After edits run `npx tsc --noEmit` and `npm run lint`, then verify
behaviour in the browser; native-only surfaces have to be checked manually with `npm run ios` /
`npm run android`.

## Conventions

- Files are kebab-case; components are named exports except default-exported screens/`AppTabs`.
- JSDoc on hooks, exported components, and non-obvious helpers; otherwise minimal comments.
- Styles via `StyleSheet.create` at the bottom of the file, using `Spacing` constants.
- `reactCompiler` is enabled in `app.config.js` — avoid manual memoization patterns that fight it.
