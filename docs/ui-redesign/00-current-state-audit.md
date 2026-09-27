# Tewnetlix UI Redesign: Current-State Audit

## Scope

This audit covers the complete frontend under `frontend/src`, including routes,
pages, reusable components, styling, interactions, media loading, and the
dependencies available for the redesign.

## Current architecture

- React 19 and Vite application.
- React Router routes for home, movies, TV shows, anime, media details,
  playback, profile, and not-found states.
- TMDB data access is implemented in one service module with manual `fetch`
  calls and page-local `useEffect` state.
- CSS is colocated with pages and components, with no shared design-token
  layer.
- The application already uses a dark canvas, large artwork, rounded surfaces,
  horizontal media rails, and translucent navigation.

## Route and page findings

### Home

- Loads several datasets in parallel and renders a hero plus media rails.
- Trending anime and top-rated anime are fetched but currently not rendered.
- Loading and request-error states are not visible to users.
- Hero autoplay, dragging, description expansion, and navigation all live in
  one component and need shared motion and button rules.

### Discovery pages

`Movies`, `TVShows`, and `Anime` duplicate pagination, filtering,
intersection-observer, loading, and error logic.

The redesign should introduce one discovery-page shell and one reusable
pagination/data hook. The visual design should then be applied once across all
three catalog experiences.

### Detail pages

`Movie` and `TVShow` duplicate detail, credits, recommendations, and trailer
loading. Failed requests can leave the page in a loading state indefinitely.
They should share a detail-page composition with media-type configuration.

### Watch page

The watch experience has a player, server selector, season selector, episode
selector, notice, and recommendations. It needs a glass control panel, clearer
focus/selected states, visible loading/error handling, and a data-driven server
configuration.

### Profile and not-found

Both are placeholders and do not use the application shell. They should become
intentional glass-surface states rather than blank route endpoints.

## Interaction inventory

### Navigation

- Logo links to home.
- Home, Movies, TV Shows, and Anime links.
- Search opens an overlay.
- Profile links to the profile route.
- Desktop and mobile markup duplicate the same actions.
- Search is currently triggered by clickable icon elements instead of semantic
  buttons.
- Active route and `aria-current` states are missing.

### Hero

- Play and details actions.
- See more/see less description control.
- Slide dots.
- Pointer drag/swipe.
- Autoplay timer.
- Detail hero back and mute controls.

Required improvements:

- Semantic buttons with labels.
- Strong `:focus-visible` states.
- Reduced-motion and reduced-data behavior.
- Pointer gestures must not interfere with button activation.

### Media cards and rails

- Media cards navigate on article click.
- Poster hover reveals a play affordance.
- Rails scroll horizontally with arrow buttons.
- Rails can change category from a custom dropdown.

Required improvements:

- Replace clickable articles with keyboard-accessible links or buttons.
- Add image fallback behavior.
- Add focus-visible card treatment.
- Add scroll snapping and responsive scroll distances.
- Make category menus proper disclosures/listboxes or use native controls.

### Search

- Search query input.
- Filter/quick-action buttons.
- Clear query button.
- Search result navigation.
- Close button.

Required improvements:

- Dialog semantics and labelled title.
- Initial-focus, Escape-close, focus-return, and body-scroll locking.
- Debounced/cancellable requests.
- Explicit loading, empty, and error states.

### Filters

- Genre and advanced filter controls on movies, TV, and anime.
- Reset and option-selection controls.

Required improvements:

- Shared filter primitives.
- Consistent state shape (`genres`, not separate `genre`/`genres` variants).
- URL synchronization or an explicit product decision not to persist filters.
- Mobile sheet layout and desktop glass toolbar.

### Playback

- Back navigation.
- Server selection.
- Season and episode selection.
- Embedded player and player notice.

Required improvements:

- Radio-group semantics or `aria-pressed` for server selection.
- Accessible dropdown behavior or native selects.
- Player loading/error fallback.
- Resolve the mismatch between eight visible servers and two effective embed
  URL destinations.

## Styling findings

Strengths:

- Dark cinematic canvas.
- System font stack.
- Good use of artwork and gradient overlays.
- Existing rounded, translucent navigation and controls.
- Lucide icons already provide a consistent icon source.

Gaps:

- No shared color, spacing, radius, elevation, blur, or z-index tokens.
- Button styles are repeated by component.
- Hover is more developed than keyboard focus.
- No global reduced-motion policy.
- No safe-area handling for the mobile bottom navigation.
- No forced-colors or opaque fallback strategy for glass surfaces.
- `App.css` duplicates reset responsibilities already present in `index.css`.

## Data and reliability findings

- Manual `useEffect` fetching is duplicated across pages.
- React Query is installed but unused.
- Axios is installed but the visible path uses native `fetch`.
- Requests are not consistently cancelled on unmount or filter changes.
- Errors are generally logged without a user-facing recovery action.
- Invalid media IDs can leave detail routes stuck on a spinner.
- The media list ignores the supplied anime-specific empty-state title.
- Missing poster/profile assets do not have reliable fallbacks.

## Redesign principles

1. Content remains the visual focus; glass is used to group controls, not to
   decorate every surface.
2. Surfaces need an opaque fallback where blur is unavailable or contrast is
   insufficient.
3. Every interactive visual element must be keyboard-operable and labelled.
4. Motion is restrained and disabled or reduced under
   `prefers-reduced-motion`.
5. Controls use large, comfortable hit targets suitable for touch and
   television-sized viewing distances.
6. The design is Apple TV-inspired in qualities—cinematic, spacious, layered,
   and calm—but uses original Tewnetlix styling and assets.

## Highest-priority fixes

1. Semantic buttons and links for icon controls and media cards.
2. Shared focus-visible treatment.
3. Search dialog accessibility.
4. Custom selector accessibility.
5. User-visible loading, error, empty, and retry states.
6. Shared route shell and design tokens.
7. Consolidated discovery/detail patterns.
8. Data-driven playback server configuration.
