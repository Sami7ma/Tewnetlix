# Phase 1: Foundation and Architecture

## Goal

Create one reliable application shell and one set of shared state primitives
before changing page-specific visuals.

## Work

1. Add a route layout with persistent navigation and an outlet.
2. Add route-level scroll restoration.
3. Add shared loading, empty, error, and retry states.
4. Add an application error boundary.
5. Define a normalized media view model.
6. Extract shared discovery-page pagination and cancellation logic.
7. Extract shared movie/TV detail loading and section composition.
8. Decide whether React Query or a small cancellable fetch layer is the source
   of truth; do not maintain two data-loading patterns.
9. Preserve the current route URLs while refactoring internals.

## Acceptance criteria

- Every route uses the same application shell.
- Failed requests produce visible recovery UI.
- Discovery pages do not duplicate pagination and observer logic.
- Detail pages cannot remain indefinitely in a loading state after failure.
- Existing routes and deployment build continue to work.
