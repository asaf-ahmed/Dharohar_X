import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ScanLine } from 'lucide-react';
import { Page, Btn } from '../components/Layout';
import Museum3DViewer from '../components/museum/Museum3DViewer';
import MuseumAudioPlayer from '../components/museum/MuseumAudioPlayer';
import { MUSEUM_ARTIFACTS } from '../data/museumArtifacts';
import '../styles/museum.css';

export default function MuseumDetail({ onSearch }) {
  const { id } = useParams();
  const artifact = MUSEUM_ARTIFACTS.find((x) => x.id === id);
  if (!artifact) return <Page onSearch={onSearch}><main className="museumPage shell museumNotFound"><div className="eyebrow">CULTURAL DIGITAL MUSEUM</div><h1>Artifact Not Found</h1><p>The requested cultural artifact could not be found.</p><Btn to="/museum">Back to Museum</Btn></main></Page>;
  return <Page onSearch={onSearch}><main className="museumDetail shell">
    <Link to="/museum" className="museumBack"><ArrowLeft size={15} /> Back to Museum</Link>
    <div className="museumDetailGrid"><section><Museum3DViewer artifact={artifact} /><div className="museumHotspots"><span className="eyebrow">LOOK CLOSER</span><div>{artifact.hotspots.map((h) => <details key={h.id}><summary>{h.title}</summary><p>{h.description}</p></details>)}</div></div></section>
    <aside className="museumInfo"><div className="eyebrow">{artifact.category}</div><h1>{artifact.name}</h1><p className="museumLead">{artifact.description}</p><div className="museumFacts"><span><small>Region</small><b>{artifact.region}</b></span><span><small>Tradition</small><b>{artifact.tradition}</b></span><span><small>Material</small><b>{artifact.material}</b></span></div><div className="museumActions"><a href="#story" className="btn">Listen to Story</a><a href="#viewer" className="btn outline"><ScanLine size={15} /> View in AR</a></div>{artifact.associatedHeritage && <p className="museumHeritage">Associated heritage · {artifact.associatedHeritage}</p>}<MuseumAudioPlayer narration={artifact.narration} /></aside>
    </div>
    <section className="museumSections" id="story">{Object.entries({ 'ABOUT THE ARTIFACT': artifact.sections.about, 'CULTURAL SIGNIFICANCE': artifact.sections.culturalSignificance, 'CRAFT & TRADITION': artifact.sections.craftAndTradition, 'SYMBOLISM': artifact.sections.symbolism, 'DID YOU KNOW?': artifact.sections.didYouKnow, 'WHAT TO NOTICE': artifact.sections.whatToNotice }).map(([title, text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}</section>
  </main></Page>;
}
