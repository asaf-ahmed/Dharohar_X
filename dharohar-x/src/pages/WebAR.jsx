import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle, Smartphone, ScanLine, MousePointerClick, Camera } from 'lucide-react';
import { Page, SectionTitle } from '../components/Layout';
import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import ModelWorkspace from '../components/three/ModelWorkspace';
import { MODELS } from '../data/models';

export default function WebAR({ onSearch }) {
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState(MODELS.find((m) => m.id === params.get('model'))?.id || MODELS[0].id);

  const choose = (id) => {
    setActive(id);
    setParams({ model: id });
  };

  return (
    <Page onSearch={onSearch}>
      <PageHero
        title="WebAR"
        subtitle="Place a heritage temple in your own space using your phone's camera — no app install required."
        image={MODELS[1].image}
        className="pageHeroTall"
      />
      <main className="shell webARPage">
        <div className="webarNotice">
          <div>
            <AlertTriangle size={22} />
            <p>WebXR AR currently works best on <strong>Android + Chrome</strong> over HTTPS (or localhost). iOS Safari does not yet support the WebXR AR module — use the live 3D preview there instead, or try the native Android app from the AR Experiences page.</p>
          </div>
        </div>

        <SectionTitle eyebrow="CHOOSE A MODEL" title="Pick a Temple to Place in AR" />
        <div className="webarChoices">
          {MODELS.map((m) => (
            <a key={m.id} href={`#stage`} onClick={() => choose(m.id)} style={active === m.id ? { borderColor: 'var(--indigo)' } : undefined}>
              <Photo src={m.image} alt={m.title} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
              <span>{m.title}</span>
            </a>
          ))}
        </div>

        <section className="inlinePreviewSection" id="stage">
          <SectionTitle eyebrow="AR STAGE" title="Point, Scan, Place" />
          <ModelWorkspace initialId={active} showRail={false} />
        </section>

        <section className="section" style={{ paddingBottom: 0 }}>
          <SectionTitle eyebrow="QUICK GUIDE" title="Three Steps to Place a Model" />
          <div className="webarSteps">
            <div><Smartphone size={20} color="var(--indigo)" /><span>Tap “View in AR” on a supported phone</span></div>
            <div><ScanLine size={20} color="var(--indigo)" /><span>Slowly move your phone to scan the floor</span></div>
            <div><MousePointerClick size={20} color="var(--indigo)" /><span>Tap the highlighted ring to place the temple</span></div>
            <div><Camera size={20} color="var(--indigo)" /><span>Walk around it — it stays anchored in place</span></div>
          </div>
        </section>
      </main>
    </Page>
  );
}
