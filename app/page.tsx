'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listProposals, type Proposal } from '../src/lib/contract';
import { WalletButton } from '../src/lib/wallet';

export default function Home() {
  const [items, setItems] = useState<Proposal[]>([]); const [state, setState] = useState<'loading'|'empty'|'ready'|'unavailable'>('loading');
  useEffect(() => { listProposals().then(v => { setItems(v); setState(v.length ? 'ready' : 'empty'); }).catch(() => setState('unavailable')); }, []);
  return <main><header className="topbar"><Link className="wordmark" href="/">CIVEC<span> / PUBLIC WORKS</span></Link><nav><Link href="#explore">Explore</Link><Link href="/create">Submit a proposal</Link><WalletButton /></nav></header>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">CIVIC EVIDENCE · CONSENSUS REGISTRY</p><h1>Make the need visible.<br/><em>Make the record durable.</em></h1><p className="lede">CIVEC gives residents a shared public noticeboard for local infrastructure proposals. Evidence is attached, screening is settled by GenLayer consensus, and the result stays inspectable on chain.</p><Link className="button vermilion" href="/create">Start a proposal <span>↗</span></Link></div><aside className="field-note"><span className="stamp">WHY CONSENSUS?</span><p>Eligibility and evidence are not just database fields. Validators compare public sources and return a bounded screening result—without turning a model answer into truth.</p><div className="rule"/><p className="small">Read-only browsing is open to everyone. A wallet is only needed to write.</p></aside></section>
    <section id="explore" className="workspace"><div className="section-head"><div><p className="eyebrow">01 / PROPOSAL WALL</p><h2>Open records in {state === 'ready' ? 'the district' : 'CIVEC'}</h2></div><span className="status-line">CHAIN 61999 · STUDIONET</span></div>
      {state === 'loading' && <div className="empty"><div className="loader"/><p>Reading the public registry…</p></div>}
      {state === 'unavailable' && <div className="empty"><h3>Registry unavailable</h3><p>Connect CIVEC to a deployed contract with NEXT_PUBLIC_CIVEC_CONTRACT_ADDRESS to read live records.</p></div>}
      {state === 'empty' && <div className="empty"><p className="eyebrow">FIRST NOTICE</p><h3>No proposals have been filed yet.</h3><p>The wall is empty by design. Submit the first public works proposal and it will appear here after the transaction settles.</p><Link href="/create" className="text-link">File a proposal →</Link></div>}
      {state === 'ready' && <div className="proposal-list">{items.map(p => <Link className="proposal-row" href={`/proposal/${p.id}`} key={p.id}><span className="pin">{String(p.id).padStart(2,'0')}</span><span className="proposal-main"><strong>{p.title}</strong><small>{p.neighborhood} · {p.status}</small></span><span className="endorse">{p.endorsements} endorsements <b>↗</b></span></Link>)}</div>}
    </section><footer><span>CIVEC / PUBLIC INFRASTRUCTURE REGISTRY</span><span>Evidence first. State on chain.</span></footer></main>;
}
