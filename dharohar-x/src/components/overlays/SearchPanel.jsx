import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, ArrowUpRight } from 'lucide-react';
import { SEARCH_INDEX } from '../../data/misc';

export default function SearchPanel({ onClose }) {
  const [q, setQ] = useState('');
  const filtered = q.trim()
    ? SEARCH_INDEX.filter((r) => r[0].toLowerCase().includes(q.toLowerCase()))
    : SEARCH_INDEX.slice(0, 6);
  return (
    <div className="searchOverlay" onClick={onClose}>
      <div className="searchPanel" onClick={(e) => e.stopPropagation()}>
        <button className="close darkClose" style={{ background: '#eef3fa', color: '#0f2a3d' }} onClick={onClose} aria-label="Close search"><X /></button>
        <div className="eyebrow">SEARCH DHAROHAR X</div>
        <h2>What would you like to explore?</h2>
        <div className="bigSearch">
          <Search />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search monuments, traditions, stories..." />
        </div>
        <div className="searchResults">
          {filtered.length === 0 && <p style={{ padding: '.5rem 1rem' }}>No results for “{q}”. Try Explore instead.</p>}
          {filtered.map((r) => (
            <Link key={r[0]} to={r[1]} onClick={onClose}>{r[0]}<ArrowUpRight size={15} /></Link>
          ))}
        </div>
      </div>
    </div>
  );
}
