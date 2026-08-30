# CivicPulse â€” Architecture

## System shape

Browser UI â†’ genlayer-js 1.1.8 â†’ GenLayer Intelligent Contract â†’ nondeterministic web/LLM + Vector Store â†’ bounded consensus â†’ deterministic on-chain settlement â†’ browser audit view

The browser may prepare local form state and preview retrieval candidates, but it must not claim a decision. The contract is the canonical source of truth.

## Data domains

- Case/project record: owner, participants, criteria, lifecycle, created reference.
- Evidence record: URL or content reference, digest/hash when available, kind, submitter, status.
- Semantic index: vector, metadata, model/version, source reference, bounded excerpt.
- Decision record: schema version, stable enums, bands, evidence IDs, rationale, final status.
- Audit record: action, actor, prior state, new state, transaction reference supplied by frontend.

## Sequence

1. User connects an injected wallet on chain 61999.
2. User submits a bounded creation transaction.
3. Contributors add evidence references.
4. A caller requests consensus; nondeterministic work happens inside the permitted contract boundary.
5. Validators compare the stable schema fields.
6. Deterministic code persists the decision and executes the permitted consequence.
7. Frontend waits for receipt, refetches public getters, and renders the audit trail.

## Failure handling

Source unavailable â†’ ABSTAINED or INSUFFICIENT_EVIDENCE.

Schema invalid â†’ transaction-safe rejection or normalized abstention, according to runtime behavior.

Validator disagreement â†’ no consequential settlement.

Wallet rejected/reverted â†’ retain local draft, show exact failure, and do not fabricate a record.

## Deployment

Use Studionet (61999) and https://studio.genlayer.com/api. Keep the deployed contract address in one environment variable and one config module. The explorer link must use https://explorer-studio.genlayer.com.
