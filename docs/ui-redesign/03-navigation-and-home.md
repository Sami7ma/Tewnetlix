# Phase 3: Navigation and Home Experience

## Goal

Establish the primary Tewnetlix identity: cinematic content, calm navigation,
and clear actions.

## Navigation

- Replace duplicated desktop/mobile action markup with one semantic navigation
  model that adapts through CSS.
- Use a restrained floating glass surface on larger screens.
- Use a safe-area-aware bottom navigation on small screens.
- Add active route styling and `aria-current="page"`.
- Convert search and profile actions to labelled controls.
- Keep the logo as a brand link with a useful accessible name.

## Hero

- Keep full-bleed artwork and a strong readable gradient.
- Limit the action row to one primary and one secondary action.
- Use the shared button primitives.
- Add clear slide-dot labels and selected state.
- Pause autoplay on hover/focus and disable it for reduced motion.
- Ensure pointer dragging cannot trigger accidental navigation.

## Media rails

- Use adaptive card widths.
- Add scroll snap and touch-friendly spacing.
- Disable or hide arrows when movement is unavailable.
- Preserve visible keyboard focus while horizontally scrolling.
- Use consistent rail headings, category controls, and see-all actions.

## Acceptance criteria

- Home is usable at mobile, tablet, desktop, and large TV viewport sizes.
- The hero remains readable over bright and dark artwork.
- Navigation exposes the current route.
- Rails work with mouse, touch, keyboard, and reduced motion.
