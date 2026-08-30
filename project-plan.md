# CivicPulse â€” Project Plan

## Outcome

Ship a working Studionet dapp in which a user can complete the full lifecycle in the README, observe the pending consensus transaction, and inspect the final canonical record from chain.

## Delivery phases

1. **Reconnaissance:** inspect the repository examples, confirm current GenLayer SDK signatures, and do not copy an old productâ€™s domain model.
2. **Contract skeleton:** implement storage structs, generated IDs, bounded inputs, lifecycle enums, public views, and deterministic guards.
3. **Consensus boundary:** implement a structured nondeterministic evaluator. Sanitize source/user content as untrusted evidence; validate JSON; compare only stable decision fields; abstain on malformed, unavailable, or conflicting evidence.
4. **Vector retrieval:** add embedding generation and scoped KNN retrieval. Include a deterministic fixture path for direct tests, but never present fixtures as live consensus.
5. **Frontend shell:** implement the bespoke UI described in ui/ux.md, responsive at 390px/768px/1440px, with loading, empty, pending, reverted, abstained, and wallet states.
6. **Contract client:** map ABI methods in one module, centralize network config, wait for receipts, refetch after writes, and link every transaction to the official explorer.
7. **Verification:** run lint, typecheck, direct contract tests, production build, schema inspection, and a Studionet happy-path plus negative-path test.
8. **Handoff:** update handoff.md immediately after each work session and record unresolved decisions in that file, not memory.md.

## Acceptance gates

- No server-side private key, mock transaction hash, fake validator count, or hidden demo fallback in live mode.
- Contract writes occur only after consensus returns an allowed structured result.
- Source mutation, duplicate submission, unauthorized action, and malformed result are tested.
- The frontend makes the difference between preparing, consensus pending, settled, abstained, and failed unmistakable.
- All important evidence can be traced from UI record to contract record and transaction.

## Suggested milestones

| Milestone | Exit evidence |
|---|---|
| M1 | Contract compiles; schema and direct tests pass |
| M2 | Consensus mock tests cover every enum and abstention |
| M3 | Frontend reads live contract and has no invented data |
| M4 | Wallet write completes on Studionet |
| M5 | Negative path and responsive UI verified |
| M6 | README, architecture, PRD, TRD, UX, and handoff are current |
