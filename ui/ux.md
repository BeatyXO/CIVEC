# CivicPulse â€” UI/UX Direction

## Design thesis

Public noticeboard: off-white civic forms, cobalt typography, vermilion priority marks, map + proposal wall, dense editorial layout

The interface should feel like a purpose-built instrument for this domain, not a generic AI SaaS dashboard. Avoid purple gradients, rounded card grids, oversized â€œAI-poweredâ€ hero copy, stock robot illustrations, and three identical statistic cards.

## Visual system

- Primary surfaces: domain-specific material rather than pure white dashboard cards.
- Type: one expressive display face plus a highly readable utility face; use monospace only for IDs, hashes, and protocol state.
- Shape language: use rails, dossiers, pins, stamps, field notes, timelines, maps, or evidence strips as appropriateâ€”not interchangeable cards.
- Motion: receipt confirmation, evidence indexing, and consensus progression should be calm and informative; never use looping AI sparkle effects.

## Information architecture

1. **Orientation:** explain the decision and show a real example.
2. **Workspace:** create or inspect one case at a time.
3. **Evidence:** show source, hash/reference, retrieval status, and semantic matches.
4. **Consensus:** show pending validators without inventing progress percentages.
5. **Settlement:** show canonical status, deterministic consequence, and transaction.

## Required interaction details

- Wallet button shows address, network, and disconnect state.
- Every write has a review step with exact method, target, and value.
- Long text is expandable; hashes and URLs have copy controls.
- Pending consensus is recoverable after refresh.
- Empty states teach the next action; abstention states explain what evidence is missing.

## Responsive behavior

- Mobile: single-column dossier, bottom action tray, horizontally scrollable evidence rail.
- Tablet: split workspace and evidence drawer.
- Desktop: domain-specific canvas with persistent lifecycle rail.

## Accessibility

Keyboard-complete controls, visible focus, semantic headings, color-independent status labels, reduced-motion support, readable contrast, and screen-reader announcements for wallet and transaction state.
