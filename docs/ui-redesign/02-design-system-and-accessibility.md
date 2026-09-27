# Phase 2: Design System and Accessibility Primitives

## Goal

Build the reusable visual and interaction language for the liquid-glass
direction.

## Tokens

Define tokens for:

- Canvas, glass, elevated, and solid surfaces.
- Primary, secondary, muted, inverse, and danger text.
- Accent, selected, hover, and focus colors.
- Small, medium, and large radii.
- Spacing scale and content max-width.
- Glass border, blur, saturation, and shadow levels.
- Navigation, overlay, modal, and player z-index layers.
- Motion durations and easing.

Use neutral names so the system remains maintainable and does not encode a
single page's visual decision.

## Primitives

Create or standardize:

- `GlassSurface`
- `Button`
- `IconButton`
- `Pill`
- `Dialog`
- `Popover`/`Select`
- `LoadingState`
- `EmptyState`
- `ErrorState`
- `Skeleton`

## Accessibility rules

- All controls have semantic elements and accessible names.
- All interactive elements have a visible `:focus-visible` state.
- Minimum touch target is 44px where practical.
- Dialogs support Escape, focus entry, focus return, and body-scroll locking.
- Selectors expose expanded, selected, and controlled relationships.
- Motion respects `prefers-reduced-motion`.
- Glass surfaces retain readable opaque fallbacks.
- High-contrast and forced-colors modes remain usable.

## Acceptance criteria

- New page controls use primitives instead of bespoke button CSS.
- Keyboard-only users can reach and operate every visible control.
- Screen readers can identify navigation, dialogs, selected filters, and player
  controls.
- Reduced-motion mode disables autoplay and nonessential transitions.
