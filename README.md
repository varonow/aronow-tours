# Aronow Tours

The family travel hub at **aronow.tours**. One site, one login, all trips.

## How it works
- `login.html` — passwordless magic-link sign-in (Supabase).
- `index.html` — the hub: after login, shows the trips you belong to.
- `/<trip>/` — each trip is a self-contained sub-app (e.g. `/scotland/`, `/marshall/`),
  gatekept by shared `js/supabase.js` (`requireTripAccess`).
- Access is driven by the `trips` + `trip_members` tables (membership by email).
- Each trip folder carries its own PWA manifest + icon, so "Add to Home Screen"
  installs a trip-specific app that opens straight to that trip.

## Deploy
GitHub Pages from `main`. Custom domain `aronow.tours` (CNAME added at cutover).
