# CIVEC

This folder is the CIVEC GenLayer project: a public civic evidence registry for community infrastructure proposals.

## Deployed Contract

- Network: GenLayer StudioNet
- Chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Contract: `0xc6bde2Aa643AB5c1d0b2c093F6CAfA849B23AA72`
- Deployment tx: `0xacef4cf918587a0601055895e90be6e402059a91e532429c52aee61d9033e60f`

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

Final smoke proposal: `civec-final-live-20260830`

- `create_proposal`: `0x644b51ed15bb6a296b253c51f2d792aa7d4ada5c0fee9771bed63a622e48dd67` accepted.
- `add_evidence`: `0x5d9361abc56151aac68a4cec23663d38c264b0cae693c61ec8940c66cea7f4ea` accepted.
- `request_screening`: `0xf91a54780b4bd150d8579101346d466bd38570150c038e919321fdbd9f5101a6` accepted. Result: `ABSTAINED`, because the public evidence URL was general government information and not claim-specific.
- `endorse`: `0xfff197c3ad54e7dc51a7203e9831861ed0a390fb9687b4d5b0f45c56d9b80019` accepted.
- `close_proposal`: `0x03b20389b6d7b9b56794e3ef7eae4f351d73459bc43f0d20339d24a3305401aa` accepted.

## Local Commands

```powershell
npm install
npm run typecheck
npm run build
```

`npm install` was attempted in normal and escalated modes on this machine, but it hung without creating `node_modules`. The contract deployment and StudioNet smoke tests are verified; frontend typecheck/build still need a completed package install.

## Main Risks

Sybil endorsements, political sensitivity, geographic bias, duplicate manipulation, and public safety claims.
