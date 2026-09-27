import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Page, Btn, SectionTitle } from '../components/Layout';
import PageHero from '../components/PageHero';
import { Tabs, Fact, ImageCard } from '../components/Cards';
import Photo from '../components/Photo';
import { MONUMENTS, monumentBySlug } from '../data/monuments';
import { CULTURES } from '../data/culture';
import Museum3DViewer from '../components/museum/Museum3DViewer';
import MuseumAudioPlayer from '../components/museum/MuseumAudioPlayer';

const TAB_ITEMS = ['Overview', 'History', 'Architecture', 'Gallery', 'Location', 'Related Culture'];

const RELATED_CULTURE_BY_STYLE = {
  'Mughal Architecture': 'banarasi-weaving',
  'Indo-Islamic Architecture': 'chhau',
  'Vijayanagara Architecture': 'pattachitra',
  'Kalinga Architecture': 'odissi',
  'Rajput–Mughal Architecture': 'blue-pottery',
};

export default function HeritageDetail({ openChat, onSearch }) {
  const { slug = 'taj-mahal' } = useParams();
  const item = monumentBySlug(slug);
  const [active, setActive] = useState('Overview');
  const relatedCultureSlug = RELATED_CULTURE_BY_STYLE[item.style] || 'kathak';
  const relatedCulture = CULTURES.find((c) => c.slug === relatedCultureSlug);
  const others = MONUMENTS.filter((h) => h.slug !== item.slug).slice(0, 3);

  const galleryText = `Explore selected views and architectural detail of ${item.title} — from its overall silhouette down to individual carved surfaces and material texture.`;
  const locationText = `${item.title} is located in ${item.place}. Use the interactive map to see it alongside every other Dharohar X heritage site.`;
  const relatedText = `${item.title} connects to ${item.related}, a broader architectural and cultural tradition spanning several monuments across this region.`;

  const bodies = {
    Overview: item.desc,
    History: item.history || item.desc,
    Architecture: item.architecture || `${item.title} expresses the regional architectural vocabulary of ${item.category || item.style}.`,
    Gallery: galleryText,
    Location: locationText,
    'Related Culture': relatedText,
  };

  return (
    <Page onSearch={onSearch}>
      <PageHero title={item.title} subtitle={`${item.place}  •  ${item.category || item.style}`} image={item.image} />
      <main className="shell detailPage">
        <div className="breadcrumb"><Link to="/heritage">Heritage Monuments</Link> / {item.title}</div>
        <div className="detailActions">
          <Btn to="#monument-model">View 3D Model</Btn>
          <Btn to={`/webar?model=${slugToModel(item.slug)}`} outline>View in AR</Btn>
          <Btn to="/explore#map" outline>Explore Map</Btn>
          <Btn onClick={() => openChat(item.title)} outline>Ask about this Monument</Btn>
        </div>

        <Tabs items={TAB_ITEMS} active={active} setActive={setActive} />

        <div className="detailGrid">
          <div>
            <div className="eyebrow">{active.toUpperCase()}</div>
            <h2>{active === 'Overview' ? `About ${item.title}` : active}</h2>
            <p>{bodies[active]}</p>
            {active === 'Gallery' && (
              <div className="cards3" style={{ marginTop: '1.4rem' }}>
                <Photo src={item.image} alt={item.title} style={{ borderRadius: 'var(--r-sm)', aspectRatio: '4/3', objectFit: 'cover' }} />
                <Photo src={others[0]?.image} alt="" style={{ borderRadius: 'var(--r-sm)', aspectRatio: '4/3', objectFit: 'cover' }} />
                <Photo src={others[1]?.image} alt="" style={{ borderRadius: 'var(--r-sm)', aspectRatio: '4/3', objectFit: 'cover' }} />
              </div>
            )}
            <div className="facts">
              <Fact a="Built" b={item.built || 'Contemporary'} />
              <Fact a="Style" b={item.style || item.category} />
              <Fact a="Location" b={item.place} />
              <Fact a="Recognition" b={item.recognition} />
            </div>
          </div>
          <Photo className="detailPhoto" src={item.image} alt={item.title} />
        </div>

        <section className="monumentExperience" id="monument-model">
          <SectionTitle eyebrow="EXPLORE IN 3D" title="A closer look at the monument" />
          {item.model ? <Museum3DViewer artifact={{ model: item.model }} /> : <p className="museumAudioError">A 3D model for this monument is being prepared.</p>}
          <MuseumAudioPlayer narration={{ en: item.en, hi: item.hi }} />
        </section>

        <blockquote style={{ marginBottom: '3rem' }}>
          {item.quote}
          <small>{item.quoteAuthor}</small>
        </blockquote>

        <section className="related">
          <SectionTitle eyebrow="RELATED CULTURE & TRADITIONS" title={item.related} />
          <div className="cards3">
            {relatedCulture && <ImageCard img={relatedCulture.image} title={relatedCulture.title} sub={`${relatedCulture.category} · Explore connected traditions`} to={`/culture/${relatedCulture.slug}`} />}
            {others.map((o) => (
              <ImageCard key={o.slug} img={o.image} title={o.title} sub={o.place} to={`/heritage/${o.slug}`} />
            ))}
          </div>
        </section>
      </main>
    </Page>
  );
}

// The 5 AR temple models are Odisha-specific; Konark is the one heritage
// monument with a matching AR model, everything else opens the AR hub.
function slugToModel(slug) {
  if (slug === 'konark-sun-temple') return 'konark';
  return 'jagannath';
}
