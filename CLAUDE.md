# Arbor Parent App — Prototype Context

This is the working prototype for Arbor's Parent App 2.0, built by Anna Collini (Senior Product Designer).
Used for team sharing, stakeholder review, and user testing. Not production code.

---

## Tech stack

- React / JSX
- Tailwind CSS — **core utility classes only**, no custom config
- No backend — all data is mocked

---

## Mock data — always use the Collini family

| Role | Name |
|---|---|
| Parent | Kate Brown |
| Child 1 | Molly |
| Child 2 | Lucas |
| Child 3 | Ethan |
| Schools | Oakwood Primary, Oakwood Secondary |

Never invent other names. Use this family consistently across all screens and flows.

---

## App structure

Four-tab bottom navigation:

| Tab | Contents |
|---|---|
| Home | Coming Up, To Do (consent notices), household summary |
| My Child | Child-specific academic/pastoral info, Absence Reporting |
| Book & Pay | Clubs, Trips, Meals, Basket |
| Messages | Parent-to-school messaging |

Profile/settings: half-height sheet accessed from Home. Contains "Account & settings" card, "Children's details" card, and Log out. Not a fifth tab.

---

## Key constraints to respect in every build

### Multi-child
- v1 is single-child at a time — no "all children" views
- Child switcher exists; each request is tagged to the active child
- Content must be clearly attributed to the right child when displayed

### School config states — three are always possible per feature
Every feature can be in one of three states. These must be visually distinct:

| State | API flag | What to show |
|---|---|---|
| App not enabled by school | `UNAVAILABLE_NOT_ROLLED_OUT` | [visual treatment TBD] |
| Feature turned off for this parent | `UNAVAILABLE_NOT_AVAILABLE` | [visual treatment TBD] |
| Feature on but no content yet | *(standard empty state)* | Empty state with appropriate CTA |

Never collapse these three into one generic "unavailable" state.

### Payments / checkout seam
Clubs, Trips, Meals, and Basket all hand off to a Voyager-built 3rd party checkout (arriving July 2026, branded to Arbor). Do not tightly couple payment flows to a specific checkout UI — design to a clear handoff point.

### Basket — two item types with different behaviour
| Type | Examples | Behaviour |
|---|---|---|
| Non-space-reserving | Meal top-ups | Persists indefinitely, no expiry |
| Space-reserving | Clubs, Trips | 24hr expiry from time added. Persists if app minimised or user navigates within app. On return after expiry: show expiry message, offer re-add if space available |

### Viewport
Primary design width is 390px (iPhone 14/15). Occasionally verify at 375px (iPhone SE) for anything with tight horizontal layouts — pill filters, multi-column grids, long labels.

---

## Clubs — session picker variants

| Variant | Pattern | When to use |
|---|---|---|
| S1 | Checklist | Default single-session picker |
| S2 | Checklist with time pills | Sessions with meaningful time variants |
| S3 | Week grid, 1 row | Breakfast and after-school clubs |
| S4 | Week grid, 2 rows, radio select | Breakfast/after-school with AM/PM split |

Breakfast and after-school clubs always use S3 or S4.

---

## @tonyarbor tokens and components

### Tokens
`@tonyarbor/tokens` CSS variables are imported globally in `main.jsx`. They are available everywhere — use them instead of hardcoded hex values.

**Never hardcode hex values.** Always map to a token:

| Instead of | Use |
|---|---|
| `#fff` | `var(--color-white)` or `var(--color-bg-primary)` |
| `#222`, `#333` | `var(--color-text-primary)` |
| `#666` | `var(--color-text-secondary)` |
| `#888`, `#bbb` | `var(--color-text-tertiary)` |
| `#eee`, `#ddd` | `var(--color-border-default)` |
| `#f5f5f5` | `var(--color-bg-secondary)` |
| Brand green | `var(--color-brand-600)` |
| Error red | `var(--color-text-destructive)` |

Use Tailwind utilities for layout and spacing where they map cleanly. Use `var(--token-name)` in inline styles for semantic colours.

### Component selection — decision tree

For every UI element when building a new screen:

1. **Does a `@tonyarbor` component exist?**
   - Yes → Is it mobile-fit (works at 390px, appropriate touch targets, no hover-only states)?
     - Yes → Use it.
     - No → Flag: *"Component X exists but is desktop-only — building a custom mobile variant using tokens instead."*
   - No → Flag: *"No suitable `@tonyarbor` component for [X]. Gap for Tony's library. Building custom using tokens."*

### Mobile fitness — quick reference

**Use these:**
`Button`, `Input`, `TextArea`, `Checkbox`, `Radio`, `Toggle`, `Tag`, `Banner`, `Avatar`, `Card`, `Tabs`, `ListRow`, `ListRowMultiLine`, `ButtonSegmented`, `DatePicker`
`Combobox` — use with care, test dropdown positioning at 390px.

**Desktop-only — skip, build custom with tokens:**
`TopNavBar`, `SideNavBar`, `SideNavButton`, `SideNavItem` — sidebar nav, not mobile.
`Table`, `TableControls`, `TableFooterPagination` — data grids don't work at 390px.
`Pagination` — desktop pattern; mobile uses "Load more".
`Breadcrumbs` — no place on a phone screen.
`Modal` — hardcoded 584px width; mobile needs full-screen sheets or bottom drawers.

### Retrofitting existing code
**Fix-forward rule:** Do not sweep the whole file. When touching a section for any reason, align its hardcoded hex values to tokens at the same time. New screens must use tokens from the start.

---

## Design patterns — be consistent

- **Reductive pill filters** — used in Browse, Messages, Bookings. Add, don't replace.
- **Progressive disclosure** — show the most critical info first; reveal complexity on demand.
- **No partial flows** — if a workflow is being prototyped it should be end-to-end complete.
- **Actionable insight, not raw data** — surface what the parent needs to know, not raw MIS values.

---

## UI Changes

When modifying UI components, always confirm the exact file path and component name with the user before making changes. Read the target file first to verify it's the correct page/component.

---

## Debugging

When fixing CSS overlay/positioning issues, always test that interactive elements (buttons, clickable areas) remain accessible. Check z-index stacking and pointer-events explicitly.

---

## Accessibility

Never use disabled button states. Disabled elements are inaccessible to screen readers. Instead, keep buttons active and show an inline error message when the user taps without meeting the requirements (e.g. no session selected).

---

## Decision log

All significant design and technical decisions must be appended to `DECISIONS.md` in this format:

```
[Date] [Feature area]
Decision: [what was decided]
Rationale: [why, including alternatives considered]
```

When Anna makes a decision during a session, offer to append it to DECISIONS.md.

---

## Out of scope for v1 — don't build these

- Multi-child views / "do this for all children" flows
- Push notification time customisation
- Search, filtering, or sorting on Clubs or Trips
- Cancellation of club or trip bookings
- Attachments on messages
- Dietary/allergen support in Meals
- Payment history in any feature
- Offline support, Dark Mode, Windows support
