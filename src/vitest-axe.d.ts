/**
 * Type augmentation for vitest-axe's `toHaveNoViolations` matcher.
 *
 * vitest-axe 0.1.0 ships `extend-expect`, but it augments the legacy global
 * `Vi.Assertion` namespace that Vitest 4 removed, so the matcher never
 * type-checks. The Vitest-4 way is to extend `Matchers` on the `vitest` module
 * (`Assertion` extends `Matchers`, so it flows through to `expect(...)`). We use
 * `Matchers` rather than `Assertion` to avoid colliding with jest-dom's own
 * `Assertion` augmentation. Runtime registration lives in vitest.setup.ts.
 */
import 'vitest';

declare module 'vitest' {
  // The generic mirrors the real `Matchers<T = any>` so this augmentation
  // merges; it is intentionally unreferenced here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  interface Matchers<T = any> {
    toHaveNoViolations(): void
  }
}
