# CivicPulse â€” Product Requirements

## Problem

Residents submit local infrastructure proposals. The protocol groups duplicates, checks eligibility and evidence, and records a transparent community prioritization result.

## Users

- **Initiator:** creates the case, shipment, object, policy, or project.
- **Evidence contributor:** adds documents, URLs, updates, or responses.
- **Decision viewer:** inspects the canonical result and audit trail without needing a wallet.
- **Authorized actor:** performs lifecycle actions defined by the contract.

## Non-goals

- Not professional medical, legal, insurance, scientific, or security advice.
- Not a replacement for source custodians or human escalation.
- Not a general chatbot; the product must produce bounded protocol state.
- Not a custodial wallet or browser-generated account.

## Core user stories

1. As an initiator, I can create a case with explicit criteria.
2. As a contributor, I can attach bounded evidence references and see whether they were accepted.
3. As a reviewer, I can see the exact stable fields used for consensus and the evidence references.
4. As a viewer, I can inspect settled, abstained, and pending records from the chain.
5. As an authorized actor, I can perform only the actions allowed by the state machine.

## Required screens

- Landing / explanation of why GenLayer is necessary.
- Public explorer/feed.
- Create flow.
- Detail view with evidence and lifecycle timeline.
- Consensus review state.
- Wallet/network panel.
- Error, abstention, and unsupported-input states.

## Success criteria

- A first-time user understands what is being decided before connecting a wallet.
- Every AI-derived claim is labeled as validator consensus, not objective truth.
- A complete demo can be performed with one injected wallet and public fixture evidence.
- The product remains useful as a read-only public registry.
