# Phase 6: Validation and Polish

## Goal

Validate the redesign as a product, not only as a screenshot.

## Responsive matrix

- 320px phone.
- 390px phone.
- 768px tablet.
- 1024px laptop/tablet landscape.
- 1440px desktop.
- Large television viewport.

## Interaction matrix

- Mouse and trackpad.
- Touch swipe and tap.
- Keyboard-only navigation.
- Screen reader smoke test.
- Reduced motion.
- Browser zoom at 200%.
- Forced-colors/high-contrast mode.

## Failure matrix

- Slow network.
- Empty result.
- API failure.
- Invalid route.
- Missing poster/backdrop/profile image.
- Blocked or unavailable embed provider.

## Performance checks

- Measure backdrop-filter cost on low-end hardware.
- Avoid blur on large full-screen layers where an opaque fallback is enough.
- Lazy-load below-the-fold images.
- Use responsive image sizes where available.
- Verify route build and deployment output.

## Cleanup

- Remove duplicated reset styles.
- Remove obsolete component-specific button rules after migration.
- Remove unused dependencies only after confirming they are not part of the
  final architecture.
- Keep documentation aligned with the actual component structure.

## Definition of done

- `npm run lint` passes for changed code.
- `npm run build` passes.
- Existing routes preserve their intended behavior.
- Every visible interactive control has a keyboard and accessible path.
- Liquid-glass styling is consistent, restrained, performant, and readable.
