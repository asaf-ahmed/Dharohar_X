import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Search, PlayCircle, X } from 'lucide-react';
import { Page, Btn } from '../components/Layout';
import Photo from '../components/Photo';
import { CULTURES, CATEGORIES, CULTURE_REGIONS } from '../data/culture';
import { assetUrl } from '../data/r2Assets';

export default function CultureIndex({ openChat, onSearch }) {
  const [params, setParams] = useSearchParams();
  const initial = params.get('category') || 'All';
  const [category, setCategory] = useState(CATEGORIES.includes(initial) ? initial : 'All');
  const [region, setRegion] = useState(params.get('region') || 'All regions');
  const [query, setQuery] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const list = useMemo(() => CULTURES.filter((c) => {
    const hay = [c.title, c.category, c.type, c.region, c.state, c.summary].join(' ').toLowerCase();
    return (category === 'All' || c.category === category) &&
      (region === 'All regions' || c.state === region || c.region === region) &&
      (!query.trim() || hay.includes(query.trim().toLowerCase()));
  }), [category, region, query]);

  const pick = (next) => {
    setCategory(next);
    setParams({ ...(next === 'All' ? {} : { category: next }), ...(region === 'All regions' ? {} : { region }) });
  };
  const pickRegion = (next) => {
    setRegion(next);
    setParams({ ...(category === 'All' ? {} : { category }), ...(next === 'All regions' ? {} : { region: next }) });
  };

  const cuisine = CULTURES.filter((c) => c.category === 'Cuisine');
  const featured = CULTURES.filter((c) => ['Kathak', 'Chhau', 'Pattachitra', 'Diwali', 'Banarasi Weaving', 'Awadhi Cuisine'].includes(c.title));

  return (
    <Page onSearch={onSearch}>
      <section className="cultureHero">
        <div className="cultureHeroVideo" aria-hidden="true">
          <video
            className="cultureHeroMedia"
            src={assetUrl('/assets/hero/culture-heritage-hero.mp4')}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/hero/taj-hero.jpg"
          />
        </div>
        <div className="cultureHeroShade" />
        <div className="cultureHeroContent shell">
          <div className="eyebrow onDark">DHAROHAR X · LIVING HERITAGE</div>
          <div className="heroKicker">INDIA'S LIVING CULTURE</div>
          <h1>Culture &<br /><em>Traditions</em></h1>
          <p>Dance, music, festivals, food, crafts, textiles, theatre and everyday traditions that keep India's cultural memory alive.</p>
          <div className="detailActions">
            <a className="btn heroPrimary" href="#explore">Explore Culture <ArrowRight size={15} /></a>
            <button className="btn heroGhost" onClick={() => setShowVideo(true)}><PlayCircle size={16} /> Watch India Culture Film</button>
          </div>
        </div>
      </section>

      <main className="shell cultureIndex" id="explore">
        <section className="cultureIntro">
          <div><div className="eyebrow clay">LIVING HERITAGE</div><h2>People. Practice. Perspective.</h2><p>Culture is not only displayed in museums. It is performed, cooked, woven, painted, celebrated and passed from one generation to the next.</p></div>
          <div className="cultureStat"><b>{CULTURES.length}</b><span>traditions documented</span></div>
        </section>

        <section className="cultureExplorer" id="categories">
          <div className="sectionTitleRow"><div><div className="eyebrow clay">EXPLORE BY FORM</div><h2>Find a tradition</h2></div><p>Search by tradition, filter by cultural form, or narrow the collection by region.</p></div>
          <div className="cultureToolbar">
            <label className="cultureSearch"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search traditions, regions or practices" aria-label="Search culture and traditions" /></label>
            <select value={region} onChange={(e) => pickRegion(e.target.value)} aria-label="Filter by region">{CULTURE_REGIONS.map((item) => <option key={item}>{item}</option>)}</select>
          </div>
          <div className="cultureFilters" aria-label="Filter by culture type">{CATEGORIES.map((c) => <button key={c} className={category === c ? 'active' : ''} onClick={() => pick(c)}>{c}</button>)}</div>
          <div className="cultureResultLabel"><span>{list.length} traditions</span><span>{category === 'All' ? 'All cultural forms' : category}</span></div>
          <div className="cultureGrid">{list.map((c) => <Link key={c.slug} to={`/culture/${c.slug}`} className="cultureCard"><div className="cultureImageWrap"><Photo src={c.image} alt={c.title} /><span className="imageTag">{c.category}</span></div><div><div className="cultureMeta"><MapPin size={12} /> {c.state || c.region}</div><h3>{c.title}</h3><p>{c.summary}</p><span className="cardLink">Explore tradition <ArrowRight size={13} /></span></div></Link>)}</div>
        </section>

        <section className="cultureFeatureRail"><div className="featureRailCopy"><div className="eyebrow onDark">START HERE</div><h2>Six ways into India's living heritage</h2><p>Move from performance to food, from craft to festival, and follow each tradition into its story and practice.</p></div><div className="featureRailGrid">{featured.slice(0, 6).map((c) => <Link key={c.slug} to={`/culture/${c.slug}`}><Photo src={c.image} alt="" /><span>{c.title}</span></Link>)}</div></section>

        <section className="cultureCuisineLane" id="cuisine">
          <div className="sectionTitleRow"><div><div className="eyebrow clay">FLAVOURS OF INDIA</div><h2>Cuisine is living heritage</h2></div><p>Regional ingredients, techniques, family knowledge and shared meals are part of the cultural story.</p></div>
          <div className="cultureGrid">{cuisine.map((c) => <Link key={c.slug} to={`/culture/${c.slug}`} className="cultureCard cuisineCard"><div className="cultureImageWrap"><Photo src={c.image} alt={c.title} /><span className="imageTag">CUISINE</span></div><div><div className="cultureMeta"><MapPin size={12} /> {c.state || c.region}</div><h3>{c.title}</h3><p>{c.summary}</p><span className="cardLink">Discover the food story <ArrowRight size={13} /></span></div></Link>)}</div>
        </section>

        <section className="cultureRegionExplorer" id="regions">
          <div className="cultureRegionMap"><div className="eyebrow clay">EXPLORE INDIA</div><h2>Choose a region</h2><p>Use a region as your starting point, then open a tradition to continue the story.</p><div className="regionButtons">{['Rajasthan','Odisha','Kerala','West Bengal','Tamil Nadu','Uttar Pradesh','Gujarat'].map((r) => <button key={r} type="button" onClick={() => pickRegion(r)} className={region === r ? 'active' : ''}><MapPin size={14} />{r}</button>)}</div></div>
          <div className="cultureRegionResults"><div className="cultureMeta">CURRENT REGION</div><h3>{region === 'All regions' ? 'Across India' : region}</h3>{list.filter((x) => region === 'All regions' || x.state === region || x.region === region).slice(0, 5).map((x) => <Link key={x.slug} to={`/culture/${x.slug}`}><span><b>{x.title}</b><small>{x.category}</small></span><ArrowRight size={15} /></Link>)}{region !== 'All regions' && !list.some((x) => x.state === region || x.region === region) && <p>No filtered tradition is visible. Choose “All regions” or another region.</p>}</div>
        </section>

        <section className="cultureJourney"><div><div className="eyebrow onDark">THE DHAROHAR JOURNEY</div><h2>Culture → Story → Practice → Museum → AR</h2><p>Each step appears only when the project has something real to show. No fake AR or empty experiences.</p></div><div className="journeySteps"><span>01 Discover</span><ArrowRight/><span>02 Understand</span><ArrowRight/><span>03 Listen</span><ArrowRight/><span>04 Experience</span></div></section>

        <section className="cultureCallout"><div><div className="eyebrow">ASK DHAROHAR</div><h3>Curious about a specific tradition?</h3><p>Ask the AI heritage guide about a dance, festival, craft or food tradition.</p></div><Btn onClick={openChat} clay>Start a Conversation</Btn></section>
      </main>

      {showVideo && <div className="videoOverlay" onClick={() => setShowVideo(false)}><div className="videoModal" onClick={(e) => e.stopPropagation()}><button className="videoClose" onClick={() => setShowVideo(false)} aria-label="Close"><X /></button><iframe src="https://www.youtube.com/embed/pL2mtjTagHI?autoplay=1&rel=0" title="Indian Culture & Heritage" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div></div>}
    </Page>
  );
}
