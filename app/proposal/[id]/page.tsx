'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProposal } from '../../../src/lib/contract';
import type { Proposal } from '../../../src/lib/types';
export default function ProposalPage({ params }: { params: { id: string } }) {
  const [p, setP] = useState<Proposal | null>(null); const [error, setError] = useState('');
  useEffect(() => { getProposal(params.id).then(setP).catch(e => setError(e.message)); }, [params.id]);
  if (error) return <main><header className="topbar"><Link className="wordmark" href="/">CIVEC</Link></header><div className="empty"><h3>Record unavailable</h3><p>{error}</p></div></main>;
  if (!p) return <main><div className="empty"><p>Reading canonical record…</p></div></main>;
  return <main><header className="topbar"><Link className="wordmark" href="/">CIVEC<span> / DOSSIER {p.id}</span></Link><Link href="/">← Proposal wall</Link></header><section className="form-wrap"><p className="eyebrow">DOSSIER / {p.status}</p><h1>{p.title}</h1><p className="lede">{p.neighborhood} · filed by <code>{p.owner}</code></p><div className="rule"/><p className="eyebrow">THE NEED</p><p className="lede">{p.description}</p><div className="review"><span>ASSESSMENT</span><strong>{p.criteria}</strong><span>ENDORSEMENTS</span><strong>{p.endorsements}</strong><span>DECISION</span><strong>{p.decision || 'Not screened'}</strong></div><Link className="text-link" href="/create">File another proposal →</Link></section></main>;
}
