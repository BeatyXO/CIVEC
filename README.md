# CIVEC

This folder is the CIVEC GenLayer project: a public civic evidence registry for community infrastructure proposals.

## Deployed Contract

- Network: GenLayer StudioNet
- Chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Contract: `0x8C955a51673EF90B8aC9602D5A3B578ee2361996`
- Deployment tx: `0x0f252522d818213348b5471e8313f1ae2397dd0579fecf7303c729bc0a3dffc3`

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

Final smoke proposal: `civec-final-20260831`

- `create_proposal`: `0xf558273d30f1b740a6da18cad95ed5a1eefa62f25ff787b6feb2f1c2335cd21a` accepted.
- `add_evidence`: `0x7891f668cdb8664c209c000d92c7de33c100cc7919eb4924eb41cde94bd1f1b0` accepted.
- `request_screening`: `0x1670f826629d351649091603dbf0843b9abf16cf465dd9c35374c7a5eb349a51` finalized with successful execution.
- `endorse`: `0xfff197c3ad54e7dc51a7203e9831861ed0a390fb9687b4d5b0f45c56d9b80019` accepted.
- `close_proposal`: `0xac93760d85ce9f10c2cb688499f7122d3b4cdf779f31bc657b59a0b8c077d819` accepted.

## Local Commands

```powershell
npm install
npm run typecheck
npm run build
```

`npm install` was attempted in normal and escalated modes on this machine, but it hung without creating `node_modules`. The contract deployment and StudioNet smoke tests are verified; frontend typecheck/build still need a completed package install.

## Main Risks

Sybil endorsements, political sensitivity, geographic bias, duplicate manipulation, and public safety claims.
