# CIVEC

This folder is the CIVEC GenLayer project: a public civic evidence registry for community infrastructure proposals.

## Deployed Contract

- Network: GenLayer StudioNet
- Chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Contract: `0x1056735efD5C1dccAaF9AAE0aab3B3B4Bc69830d`
- Deployment tx: `0x7f6a74aa2e47e234820d0e074aaceae99f4b900792e32db3cc24187ba4ae0e73`

## Build Contract

Residents submit local infrastructure proposals. The protocol records proposal details, public evidence references, wallet endorsements, nondeterministic evidence screening, and final closure state.

The product uses the off-chain-then-settle-on-chain pattern: the browser collects proposal and evidence inputs; GenLayer performs nondeterministic retrieval and reasoning with `gl.nondet.web.get`, `gl.nondet.exec_prompt`, and `gl.vm.run_nondet_unsafe`; only bounded fields and explicit lifecycle states become canonical contract state.

## Stack Constraints

- Next.js App Router + TypeScript.
- `genlayer-js@1.1.8` for reads/writes.
- Injected EIP-1193 wallet only.
- StudioNet chain ID `61999`, RPC `https://studio.genlayer.com/api`.
- Python GenLayer Intelligent Contract; no backend database as canonical state.
- Public reads may work before wallet connection; every write requires explicit wallet confirmation.
- Bounded strings, arrays, deterministic enums, and explicit abstention states.

## Live Smoke Results

Final smoke proposal: `civec-feedback-20260901`

- `create_proposal`: `0x1468e7aad295b096721264f1359d171783c1419f5776116616b1bc32e0ffab4a` accepted.
- `add_evidence`: `0xf5d877841cc6a8a9c503d5378c41ad78570b3310a6d9e202d075cd6b13a0c5db` accepted.
- `request_screening`: `0xf744ebd0ac75bc8a76b44525228e5a7ad0742b8710a9c77cc2371c8de7c41448` finalized with successful execution.
- `endorse`: `0xd0b890fc7f22ca99126a3b4b05004ce2d484a84c49c0af5cb9255ec9979b39c0` accepted.
- `close_proposal`: `0x9979ea72e12477b0a9f356da834b309ee80cefff8e5436f9099aff043df47453` accepted.

## Local Commands

```powershell
npm install
npm run typecheck
npm run build
```

Current release status: the updated CIVEC contract is deployed at `0x1056735efD5C1dccAaF9AAE0aab3B3B4Bc69830d`. Real GenLayer Direct Mode tests and static invariant tests are present, and GenVM static lint passes. Vercel is configured to redeploy from the pushed head.

Separately, local GenVM semantic validation remains limited on this Windows machine by an SDK-cache permission error (`WinError 5`). This does not affect the verified Vercel frontend build or the deployed contract.

## Main Risks

Sybil endorsements, political sensitivity, geographic bias, duplicate manipulation, and public safety claims.
