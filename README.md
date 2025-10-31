# Section 5 – Refactoring Code Smells in Practice

This document shows the smells I found in the original `src/main.ts` and the refactorings I applied.

## Code Smells I Identified

1. **Unclear Names**: Variables like `c`, `a`, `b`, `h` obscure meaning (counter, IDs, heading text).
2. **Magic strings/numbers**: IDs, button labels, title prefix, and color choices were hard-coded in multiple places.
3. **Duplicated code**: Each button handler repeated the same 3 steps:
   1. update count,
   2. set counter text,
   3. set title and background color.
4. **Long Function/Mixed responsibilities**: 'setup()` both constructed the UI and sprinkled in view update logic.

## Refactorings Applied

- **Rename Variable**: Clear, easy-to-understand names (`state.count`, `TEXT`, `COLORS`, `IDS`).
- **Introduce Parameter/Constant**: Collected all user-facing strings/IDs/colors in dedicated objects (`TEXT`, `COLORS`, `IDS`) to remove magic strings.
- **Encapsulate Record**: `IDS`, `TEXT`, `COLORS` are single sources of truth.
- **Introduce Explaining Variable / Function**: Helper `el(...)` to reduce errors.
- **Remove Duplication**: Event delegation replaces three nearly-identical listeners.
-
  - **Extract Function**: `render()` helps centralizes all UI updates and `dispatch()` applies an action then calls `render()`.
