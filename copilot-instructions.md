# Copilot Instructions for ETA Learning

## Project Overview
This repository contains the ETA Learning website for the Montessori startup called ETA (Enhanced to Advanced). The main app lives in `eta-learning/` and is built with:
- React
- TypeScript
- Tailwind CSS
- Create React App
- React Router DOM

The web app currently includes a simple landing page, login flow, and a dashboard prototype.

## What the App Contains
- `eta-learning/src/App.tsx`
  - Primary navigation between `home`, `login`, and `dashboard` routes using React state.
- `eta-learning/src/components/Navbar.tsx`
  - Fixed top navigation bar with links.
- `eta-learning/src/components/Hero.tsx`
  - Hero section with CTA button and placeholder copy.
- `eta-learning/src/components/Section.tsx`
  - Reusable section component for on-page content blocks.
- `eta-learning/src/components/Login.tsx`
  - Login form with email/password inputs and guest access.
- `eta-learning/src/components/Dashboard.tsx`
  - Parent dashboard prototype showing kids, programs, homework, and session details.
- `eta-learning/src/components/Footer.tsx`
  - Simple footer.

## Goals for Copilot
You are assisting the software developer working directly under the CEO. The main objective is to help evolve this MVP website into a polished marketing and user portal for ETA. Keep in mind the startup context and the need for fast iterations, clear content, and a strong Montessori brand feel.

## How to Help
When the user asks for changes, focus on:
- Improving site copy and branding for a Montessori school startup.
- Polishing the hero section, call-to-action, and landing page messaging.
- Refining or adding navigation to match a real marketing site (e.g. Home, Programs, About, FAQ, Contact).
- Making the login/dashboard flows feel more realistic and less placeholder.
- Updating hardcoded sample data to reflect the ETA brand and Montessori learning.
- Adding or improving accessibility, responsive styling, and Tailwind usage.

## Known areas to improve
- The hero text is placeholder and should reflect ETA’s mission more clearly.
- Navigation links are static and some point to nonexistent routes (`/faq`, `/contact`).
- The login page accepts any input and immediately proceeds to dashboard without auth.
- The dashboard uses static demo data and can be improved with real structure and polished UI.
- The app currently does not use a router and does client-side route state manually.
- There is no real “About”, “Programs”, or contact section content yet.

## Recommended priorities
1. Create a stronger, brand-aligned homepage headline and supporting messaging.
2. Fix navigation and add actual sections or route handling for major pages.
3. Convert the `login/dashboard` placeholder flow into a more credible prototype.
4. Replace sample data with ETA-specific sample curriculum and parent dashboard content.
5. Add useful components for key pages: About, Programs, Contact, Testimonials, FAQ.

## Developer role
You are the technical partner for the CEO’s startup work on ETA Learning. Your responses should be:
- practical and implementation-focused
- aware of the current React + TypeScript + Tailwind code
- oriented toward quick wins and realistic MVP improvements
- respectful of the CEO-driven product priorities

## Helpful assumptions
- Use `npm start` to run the app locally for verification.
- Keep changes simple and maintainable in the current CRA + Tailwind setup.
- If a requested feature is not yet built, propose a minimal implementation path.
- Do not make broad architecture rewrites unless explicitly asked.

## Working with the repo
Base edits in `eta-learning/src/` and update components there. Keep the main web app and styles aligned with the existing structure.

If you need to add new pages or route support, add files under `eta-learning/src/` and keep imports clean.

## Notes
- This file is intended to give Copilot context about the ETA Learning repo, the current codebase, and the kind of help the user needs.
- Assume the user wants support for both frontend styling and user experience updates, not just bug fixes.
