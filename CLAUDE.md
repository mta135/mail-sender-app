# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # ng serve — dev server at http://localhost:4200 (development config)
npm run build      # ng build — production build into dist/ (production is the default config)
npm run watch      # ng build --watch --configuration development
npx prettier --write <path>   # formatting (config in .prettierrc; no lint target exists)
```

**Tests are not wired up.** `package.json` has a `test` script and `tsconfig.spec.json` exists, but `angular.json` defines no `test` architect target and no test runner (Vitest/Karma) is installed, so `ng test` fails. All `ng generate` schematics are configured with `skipTests: true`, and there are no `*.spec.ts` files. Adding tests means first adding a `test` target and a runner.

## Stack

Angular 22 (standalone components, `@angular/build:application` builder), Angular Material 22 / CDK, TypeScript 6, npm.

## Architecture

The app is an early scaffold: `src/main.ts` bootstraps `App` (`src/app/app.ts`) with `appConfig` (`src/app/app.config.ts`), and `App`'s template renders only `<app-sidebar>`.

- **Routing has no routes yet.** `appConfig` registers `provideRouter([])` only so `Sidebar`'s `RouterLink`s can be injected; there is no `app.routes.ts` and `App` has no `<router-outlet>`. `Sidebar` links to `/dashboard`, `/analytics`, `/projects`, `/settings` — none of which exist. Adding any page means creating the routes, passing them to `provideRouter`, and adding an outlet to `app.html`.
- **Sidebar is `position: fixed`** and collapsed (80px) by default; it expands to 260px purely in CSS on `:hover` / keyboard focus, so there is no collapsed state in TypeScript. Main content placed beside it needs its own left offset, and reacting to collapse requires lifting that state out of `Sidebar`.
- Feature components live under `src/app/components/<name>/`.

## Conventions

- Angular 22 file naming without type suffixes: `sidebar.ts` / `sidebar.html` / `sidebar.css` exporting class `Sidebar` (not `sidebar.component.ts` / `SidebarComponent`). Selector prefix is `app`.
- Component styles are plain CSS; only the Material theme is SCSS.
- Templates use built-in control flow (`@if`/`@for`), not `*ngIf`/`*ngFor`; component state is held in signals.
- Prettier: 100-char width, single quotes, `angular` parser for HTML.
- TypeScript is not in `strict` mode, but `noImplicitOverride`, `noImplicitReturns`, `noPropertyAccessFromIndexSignature`, and Angular's `strictInjectionParameters` / `strictInputAccessModifiers` are on.

## Styling

Two global stylesheets load in this order (`angular.json`): `src/material-theme.scss`, then `src/styles.css`.

- `material-theme.scss` applies `mat.theme()` (Material 3, azure primary / blue tertiary, Roboto, light scheme) and exposes `--mat-sys-*` CSS variables. Roboto and Material Symbols Outlined are loaded from Google Fonts in `src/index.html`.
- `styles.css` has a universal margin/padding/`box-sizing` reset and forces `body` to `#fff`, overriding the Material `--mat-sys-surface` background set in `material-theme.scss`.
- The sidebar uses hard-coded hex colors and inline SVG icons rather than Material tokens or `mat-icon`; no Angular Material component is actually used yet.
- Production build budgets: component styles warn at 4kB and error at 8kB; initial bundle warns at 500kB and errors at 1MB.
