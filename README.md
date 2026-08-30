# CivicPulse

This folder is a complete implementation handoff for **CivicPulse**, a GenLayer project for community infrastructure proposals.

## Build contract

Residents submit local infrastructure proposals. The protocol groups duplicates, checks eligibility and evidence, and records a transparent community prioritization result.

The product must use the off-chain-then-settle-on-chain pattern: the browser collects evidence and displays preparation state; GenLayer performs nondeterministic retrieval/reasoning; only bounded, equivalence-safe fields and deterministic state transitions become canonical contract state.

## Existing-work exclusion

This is intentionally not a betting app, grant evaluator, quote verifier, appeal system, creative-lineage app, generic moderation oracle, or ordinary summarizer. Do not collapse it into one of those patterns during implementation.

## Stack constraints

- Next.js App Router + TypeScript.
- genlayer-js@1.1.8 for reads/writes.
- Injected EIP-1193 wallet only; do not create, persist, or silently fall back to a browser private key.
- Studionet, chain ID 61999, RPC https://studio.genlayer.com/api.
- Python GenLayer Intelligent Contract; no backend database as canonical state.
- Public reads may work before wallet connection; every write requires explicit wallet confirmation.
- Use bounded strings, arrays, pagination, deterministic enums, and explicit abstention states.

## Vector Store

Embed proposal text, neighborhood needs, prior project descriptions, and evidence. Use similarity to cluster duplicates and retrieve precedent, not to replace resident voting.

Use the official GenLayer Vector Store/embedding APIs available in the pinned runtime. Store model/version metadata and source references. Never persist private raw documents unless the product explicitly requires it; prefer hashes, public URLs, redacted excerpts, and user-provided references.

## Primary lifecycle

program opens; residents submit; duplicate clusters form; validators screen; residents endorse; deterministic score publishes priority

## MVP boundary

one city district, wallet-based endorsement, no token payout, admin-created program

## Main risks

sybil endorsements; political sensitivity; geographic bias; duplicate manipulation; public safety claims
