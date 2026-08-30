# CivicPulse â€” Technical Requirements

## Contract API

Implement these public methods as the minimum surface:

$(System.Collections.Hashtable.methods)

Use dataclasses/structs with bounded fields. Generate IDs in-contract. Use explicit OPEN, PENDING, SETTLED, ABSTAINED, REJECTED, and CLOSED-style states as applicable; never encode lifecycle in prose.

## Consensus protocol

The nondeterministic section may fetch only declared public evidence. Prompt content must clearly separate instructions from untrusted user/source content. Return JSON with stable enums, bounded numeric bands, evidence IDs, and a short rationale. Validators compare schema validity and stable decision fields, not free-form prose. If evidence is unavailable, mutated, insufficient, or validators disagree, settle to an abstention/review state.

## Vector retrieval

Use a typed VecDB value containing ecord_id, kind, source_ref, 	ext_excerpt, model_id, and created_ref. Add/update/remove operations must be bounded. KNN results are context for the evaluator and UI; they do not directly trigger state transitions.

## Frontend integration

- src/lib/config.ts: network, chain ID, RPC, explorer, contract address.
- src/lib/contract.ts: typed read/write wrappers and receipt waiting.
- src/lib/types.ts: mirror bounded contract result types.
- src/lib/wallet.tsx: injected EIP-1193 connection and network switch request.
- Query hooks must refetch after transaction receipt and show transaction links.

## Testing

- Direct tests for constructor state, happy path, authorization, duplicate IDs, bounds, invalid transitions, malformed consensus, unavailable evidence, disagreement, and repeat settlement.
- Frontend tests for disconnected reads, rejected wallet request, wrong chain, pending receipt, reverted write, empty feed, and abstention.
- Integration test against Studionet after deployment; record addresses and transaction hashes in handoff.md.

## Security and privacy

sybil endorsements; political sensitivity; geographic bias; duplicate manipulation; public safety claims

Keep secrets out of contract prompts and frontend bundles. Treat URLs, documents, images, and model output as adversarial input. Do not claim that an embedding proves identity, ownership, coverage, or truth.
