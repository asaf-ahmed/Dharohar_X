import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Box } from 'lucide-react';
import { Page } from '../components/Layout';
import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { MUSEUM_ARTIFACTS, museumCategories, museumRegions } from '../data/museumArtifacts';
import { assetUrl } from '../data/r2Assets';
import '../styles/museum.css';

export default function Museum({ onSearch }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const results = useMemo(() => MUSEUM_ARTIFACTS.filter((a) => {
    const haystack = [a.name, a.region, a.category, a.subcategory, a.tradition, a.material, a.associatedHeritage, ...a.tags].join(' ').toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (!category || a.category === category) && (!region || a.region === region);
  }), [query, category, region]);
  return <Page onSearch={onSearch}><PageHero title="Cultural Digital Museum" subtitle="Explore traditional arts, craft, performance and cultural objects in 3D." image="/assets/hero/konark-hero.jpg" video={assetUrl('/videos/monument-hero.mp4')} className="pageHeroTall pageHeroLightOverlay" /><main className="museumPage shell">
    <header className="museumIntro"><div className="eyebrow">CULTURAL DIGITAL MUSEUM</div><h1>Cultural Digital Museum</h1><p className="museumSubtitle">Experience India's Living Culture in 3D</p><p>Discover the objects, stories and traditions that keep India’s cultural memory in motion.</p></header>
    <section className="museumFilters" aria-label="Museum filters">
      <label className="museumSearch"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artifacts, regions, traditions…" aria-label="Search cultural artifacts" /></label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category"><option value="">All categories</option>{museumCategories.map((x) => <option key={x}>{x}</option>)}</select>
      <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Filter by region"><option value="">All regions</option>{museumRegions.map((x) => <option key={x}>{x}</option>)}</select>
    </section>
    {results.length ? <div className="museumGrid">{results.map((a) => <article className="museumCard" key={a.id}>
      <Photo className="museumCardImage" src={a.image} alt={a.name} /><div className="museumCardBody"><div className="museumCardMeta">{a.category} · {a.region}</div><h2>{a.name}</h2><p>{a.shortDescription}</p><div className="museumCardFoot"><span><Box size={15} /> 3D artifact</span><Link to={`/museum/${a.id}`} className="btn">Explore in 3D</Link></div></div>
    </article>)}</div> : <div className="museumEmpty"><h2>No cultural artifacts found.</h2><button type="button" className="btn outline" onClick={() => { setQuery(''); setCategory(''); setRegion(''); }}>Reset filters</button></div>}
  </main></Page>;
}
