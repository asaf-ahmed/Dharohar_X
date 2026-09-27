import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Page, SectionTitle, Btn } from '../components/Layout';
import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { MONUMENTS } from '../data/monuments';
import { assetUrl } from '../data/r2Assets';

export default function HeritageIndex({ onSearch }) {
  // The AR-available Odisha temples that aren't already one of the 5
  // full heritage write-ups (Konark overlaps both, so it's excluded here).
  return (
    <Page onSearch={onSearch}>
      <PageHero
        title="Heritage Monuments"
        subtitle="Five landmark sites with full history, architecture and 3D detail — plus every Odisha temple available to explore live in AR."
        image="/assets/hero/konark-hero.jpg"
        video={assetUrl('/videos/monument-hero.mp4')}
        className="pageHeroTall pageHeroLightOverlay"
      />
      <main className="shell pageBody">
        <SectionTitle eyebrow="FULL HERITAGE PROFILES" title="Explore Each Monument" tone="clay" />
        <p className="intro">History, architecture, bilingual narration and a live 3D model for every monument in the collection.</p>
        <div className="cards5" style={{ marginBottom: '3.5rem' }}>
          {MONUMENTS.map((h) => (
            <Link key={h.slug} to={`/heritage/${h.slug}`} className="imageCard">
              <Photo src={h.image} alt={h.title} />
              <div className="cardBody">
                <b>{h.title}</b>
                <small>{h.place}</small>
                <p>{h.place} · {h.category}</p>
                <span className="cardArrow"><ArrowUpRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="cultureCallout" style={{ marginTop: '3.5rem' }}>
          <div>
            <div className="eyebrow">EXPLORE ON A MAP</div>
            <h3 style={{ marginBottom: '.4rem' }}>See every site plotted across India</h3>
            <p style={{ marginBottom: 0 }}>All five heritage monuments and all five AR temple sites, filterable alongside festivals and craft centres.</p>
          </div>
          <Btn to="/explore#map" clay>Open the Map</Btn>
        </div>
      </main>
    </Page>
  );
}
