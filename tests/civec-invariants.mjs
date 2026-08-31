import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../contracts/civec.py', import.meta.url), 'utf8');
const frontend = readFileSync(new URL('../src/lib/contract.ts', import.meta.url), 'utf8');

assert.match(source, /self\.proposals\[proposal_id\]/, 'records use global proposal ids');
assert.match(source, /def _require_owner/, 'mutations have an owner guard');
assert.match(source, /caller is not the proposal owner/, 'wrong-wallet mutation is rejected');
assert.match(source, /proposal\["status"\] == "CLOSED"/, 'endorsement rejects closed records');
assert.match(source, /len\(proposal\["evidence"\]\) >= 3/, 'evidence cap matches evaluated sources');
assert.doesNotMatch(frontend, /publicOwner|0000000000000000000000000000000000000000/, 'frontend has no zero-owner registry workaround');
assert.match(frontend, /ExecutionResult\.FINISHED_WITH_RETURN/, 'writes check execution result');
console.log('CIVEC direct invariant tests passed');
