# CivicPulse â€” Handoff Log

## How to use this file

Append immediately after each work session. Never rewrite prior entries. Record evidence, not confidence: files changed, commands run, test results, deployed addresses, transaction hashes, and unresolved blockers.

## Current status

Planning package generated. Implementation has not started in this folder.

## Next action

Read the seven handoff documents, inspect the repositoryâ€™s current GenLayer conventions, then implement the contract skeleton and direct tests before styling the frontend.

## Log

### 2026-08-30 â€” Package created

- Created the independent product handoff for CivicPulse.
- No contract, frontend, deployment, or test files have been created yet.
- Next owner: implementation agent.

### 2026-08-30 - CIVEC implementation

- Built `contracts/civec.py` with bounded proposal/evidence inputs, global public records, explicit owner checks, lifecycle states, single-address endorsements, screening/abstention, and public getters.
- Built the Next.js App Router frontend under `app/` and `src/lib/`: public proposal wall, honest loading/empty/unavailable states, submission form, deep-link dossier route, StudioNet config, direct GenLayer read/write wrapper, and injected-wallet state.
- Added strict TypeScript config, pinned package manifest, and `.env.example` with `NEXT_PUBLIC_CIVEC_CONTRACT_ADDRESS`.
- Verification attempted: `npm install --no-audit --no-fund` and `npm run typecheck`; the environment did not materialize `node_modules`, so `tsc` was unavailable. No deployment was attempted because no contract address is configured yet.
- Remaining action: install dependencies in a network-enabled environment, run typecheck/build, deploy `contracts/civec.py` to StudioNet, set the returned address, and exercise the live write lifecycle.
- Added centralized write helpers for proposal creation, evidence, endorsement, screening, and closing.
- Removed the invalid extra GenLayer package entry from `package.json`.
- Remaining external actions: successful dependency installation, StudioNet deployment/address configuration, GitHub push, and Vercel deployment.
- Attempted `npm install --no-audit --no-fund`; npm hung without creating `node_modules`, so typecheck/build could not run.
- Confirmed CLI network is StudioNet (chain 61999, RPC `https://studio.genlayer.com/api`). Deployment reached the encrypted keystore prompt for active account `bibet-test`; its password is not available in project context.
- Added `.env.local` with StudioNet selected and an empty contract-address slot. Fill the address after deployment; do not commit `.env.local`.
- Created and unlocked disposable CLI account `civec-deployer` (public address `0xf8c03F1e5F6e6ceE945A9b37807924D70e2A9C5f`) using the documented encrypted-keystore flow; secret material remains outside the repository.
- Deployed to StudioNet: contract `0x21DBFbF05f1D5a376173b1346A13129bca09e683`; deployment transaction `0x9b459d67c09c12d76403558681df90f2f03dc358b0cc05c8689a90cbe87009cf`.
- Updated `.env.local` with the deployed public contract address. RPC reads/schema verification were attempted but blocked by outbound network `EACCES`; npm install remains blocked by the same environment.
- Compared against the provided Kontyn repository. Corrected CIVEC to use the concrete GenVM dependency hash and serialized JSON strings in `TreeMap[str, str]`, fixing the live `Proposal object has no attribute encode` error.
- Verified schema on StudioNet for the prior valid deployment. Final redeployment after the evidence-path fix: contract `0xC3b96b6d135424fb6C38052C0443104AB95D2dad`, transaction `0x6b4a929716a144de00d9d6dba7b90ddece15ba593c6e433a857df6a4e384e351`.
- Final smoke create attempt exposed and fixed the evidence-path dict/record mismatch; a fresh final deployment is configured in `.env.local`. Remaining: rerun the smoke lifecycle and npm checks when network/package installation is available, then push.

### 2026-08-30 - CIVEC final contract and smoke verification

- Corrected the contract to keep GenLayer's nondeterministic value path: `request_screening` now fetches public evidence with `gl.nondet.web.get`, asks for a bounded JSON decision with `gl.nondet.exec_prompt`, and validates it through `gl.vm.run_nondet_unsafe`.
- Fixed owner address handling so CLI/frontend owner values can arrive as either a string or GenLayer `Address`.
- Final deployed contract: `0x8C955a51673EF90B8aC9602D5A3B578ee2361996`.
- Final deployment transaction: `0x0f252522d818213348b5471e8313f1ae2397dd0579fecf7303c729bc0a3dffc3`.
- Schema verification was run against `0x8C955a51673EF90B8aC9602D5A3B578ee2361996`.
- Final smoke proposal id: `civec-final-20260831`.
- Smoke txs accepted: `create_proposal` `0x644b51ed15bb6a296b253c51f2d792aa7d4ada5c0fee9771bed63a622e48dd67`; `add_evidence` `0x5d9361abc56151aac68a4cec23663d38c264b0cae693c61ec8940c66cea7f4ea`; `request_screening` `0xf91a54780b4bd150d8579101346d466bd38570150c038e919321fdbd9f5101a6`; `endorse` `0xfff197c3ad54e7dc51a7203e9831861ed0a390fb9687b4d5b0f45c56d9b80019`; `close_proposal` `0x03b20389b6d7b9b56794e3ef7eae4f351d73459bc43f0d20339d24a3305401aa`.
- `request_screening` returned `ABSTAINED` because the smoke evidence URL was public and retrievable but not specific to the sidewalk claim; this verifies abstention and nondeterministic evidence evaluation rather than a fake positive.
- `npm install` was attempted in normal and escalated modes but hung without creating `node_modules`; frontend `npm run typecheck` and `npm run build` remain unverified on this machine until npm can complete.
- GitHub push remains blocked until Git Credential Manager is allowed to prompt for the correct account. The local repo origin is `https://github.com/BeatyXO/CIVEC.git`.
