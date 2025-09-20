# Rentigoo - Share & Lend Platform

A modern rental marketplace built with React and Vite.

## Browse Page Overview

The `Browse` page (`src/pages/Browse.jsx`) provides a client-side exploration experience for listings using mock data.

Features implemented:
- Search across title, location, and owner.
- Category filter (single select) with an `All` option.
- Price range slider ($0–$500+) implemented as a 0–100 slider scaled in code.
- Availability toggle (show only items marked `Available`).
- Sort options: Newest, Price (Low→High / High→Low), Rating.
- Responsive grid with `ListingCard` components.
- Client-side pagination (12 items per page).
- Empty state messaging.

Supporting modules:
- `src/lib/mockListings.js`: Generates 125 mock listings and exposes `filterListings` + `sortListings` helpers.
- `src/components/ListingCard.jsx`: Card component for individual listings.

Implementation notes:
- UI primitives (select, slider, switch, etc.) were originally copied with TypeScript generic annotations; these were converted to plain JavaScript for the current setup. If you migrate to TypeScript later, restore appropriate type parameters.
- When replacing mock data with a real API, wrap fetches in React Query (`@tanstack/react-query`). Keep local filter state, or push filters into the query key if you want server-side filtering.

### Replacing Mock Data with an API (Suggested Steps)
1. Install/confirm `@tanstack/react-query` (already present).
2. Create an API service function, e.g. `fetchListings({ page, pageSize, ...filters })`.
3. Replace mock imports in `Browse.jsx` with a React Query call using the filters & pagination as part of the `queryKey`.
4. Show loading skeletons using existing skeleton component (add if desired) while data loads.
5. Handle errors with a retry button and a toast notification.

### Potential Enhancements
- Multi-select categories (+tags UI) & a Clear Filters button.
- Persist filters in the URL via `useSearchParams` so sharable links reflect state.
- Infinite scroll / virtualized list for large result sets (e.g. `react-window`).
- Server-driven facets (show counts per category).
- Auth-aware actions (favorite / quick rent buttons) once auth is added.

## How can I edit this code?

There are several ways of editing your application.

## Getting Started

To run this project locally, you'll need Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.