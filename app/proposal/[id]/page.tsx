'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { addEvidence, closeProposal, endorse, getProposal, requestScreening } from '../../../src/lib/contract';
import type { Proposal } from '../../../src/lib/types';
import { WalletButton, useWallet } from '../../../src/lib/wallet';

export default function ProposalPage({ params }: { params: { id: string } }) {
  const { address } = useWallet();
  const [p, setP] = useState<Proposal | null>(null); const [error, setError] = useState(''); const [notice, setNotice] = useState(''); const [reference, setReference] = useState('');
  const load = () => getProposal(params.id).then(setP).catch(e => setError(e instanceof Error ? e.message : 'Record unavailable.'));
  useEffect(() => { void load(); }, [params.id]);
  const act = async (label: string, action: () => Promise<unknown>) => { try { setError(''); setNotice(`${label} is settling through GenLayer…`); await action(); setNotice(`${label} completed.`); await load(); } catch (e) { setNotice(''); setError(e instanceof Error ? e.message : `${label} failed.`); } };
  if (error && !p) return <main><header className="topbar"><Link className="wordmark" href="/">CIVEC</Link></header><div className="empty"><h3>Record unavailable</h3><p>{error}</p></div></main>;
  if (!p) return <main><div className="empty"><p>Reading canonical record…</p></div></main>;
  const owner = p.owner?.toLowerCase() === address?.toLowerCase(); const editable = owner && p.status === 'OPEN';
  return <main><header className="topbar"><Link className="wordmark" href="/">CIVEC<span> / DOSSIER {p.id}</span></Link><span><Link href="/">← Proposal wall</Link> <WalletButton /></span></header><section className="form-wrap"><p className="eyebrow">DOSSIER / {p.status}</p><h1>{p.title}</h1><p className="lede">{p.neighborhood} · filed by <code>{p.owner}</code></p><div className="rule"/><p className="eyebrow">THE NEED</p><p className="lede">{p.description}</p><div className="review"><span>ASSESSMENT</span><strong>{p.criteria}</strong><span>ENDORSEMENTS</span><strong>{p.endorsements}</strong><span>DECISION</span><strong>{p.decision || 'Not screened'}</strong></div><p className="eyebrow">EVIDENCE ({p.evidence.length}/3)</p>{p.evidence.length ? <ul>{p.evidence.map((e, i) => <li key={`${e}-${i}`}><a href={e} target="_blank" rel="noreferrer">{e}</a></li>)}</ul> : <p>No evidence attached yet.</p>}{editable && <><label>Add public evidence<input value={reference} onChange={e => setReference(e.target.value)} placeholder="https://…" maxLength={400}/></label><button className="button" disabled={!reference.trim() || !address} onClick={() => act('Evidence submission', () => addEvidence(p.id, reference.trim()))}>Add evidence ↗</button><button className="button" disabled={!p.evidence.length || !address} onClick={() => act('Screening request', () => requestScreening(p.id))}>Request screening ↗</button></>}{p.status !== 'CLOSED' && <><button className="button" disabled={!address} onClick={() => act('Endorsement', () => endorse(p.id))}>Endorse this proposal ↗</button>{owner && <button className="button vermilion" onClick={() => act('Closure', () => closeProposal(p.id))}>Close proposal ↗</button>}</>}{(notice || error) && <p className="notice" aria-live="polite">{notice || error}</p>}<Link className="text-link" href="/create">File another proposal →</Link></section></main>;
}
