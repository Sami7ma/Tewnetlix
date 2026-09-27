# Phase 4: Catalog, Filters, and Search

## Goal

Make discovery feel like one cohesive browsing experience across movies, TV,
and anime.

## Catalog

- Build one discovery shell parameterized by media type.
- Keep filters, result count, loading state, and retry state in consistent
  positions.
- Add a responsive glass toolbar on desktop.
- Use a full-screen or bottom-sheet filter surface on mobile.
- Add active-filter chips and a clear reset action.
- Decide and document URL query-parameter synchronization.

## Filters

- Extract shared disclosure, option, genre, range, and reset controls.
- Normalize `genre` and `genres` into one filter model.
- Provide explicit selected and expanded state.
- Prevent stale results when filters change.

## Search

- Implement an accessible modal or drawer with a labelled title.
- Focus the input when opened and return focus when closed.
- Close on Escape and prevent background scrolling while open.
- Debounce and cancel requests.
- Distinguish initial, loading, empty, error, and result states.
- Use semantic links for result navigation.

## Acceptance criteria

- Movies, TV shows, and anime share the same interaction model.
- Filter state is understandable at a glance and reversible.
- Search is fully usable by keyboard and screen reader.
- Slow, empty, failed, and successful searches have distinct UI states.
