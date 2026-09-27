import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Globe2, ShieldCheck, Heart, BookOpen, Sparkles, HandHeart } from 'lucide-react';
import { Page, Btn, SectionTitle } from '../components/Layout';
import PageHero from '../components/PageHero';
import { IMG } from '../data/images';

const PILLARS = [
  [<Target />, 'Our Mission', 'Make India\'s heritage discoverable, understandable and vivid for anyone, anywhere — using technology in service of preservation, not spectacle.'],
  [<Globe2 />, 'Our Reach', 'Five heritage monuments, twelve living traditions and five Odisha temple 3D/AR reconstructions, with more sites planned every release.'],
  [<ShieldCheck />, 'Our Standard', 'Every fact is sourced, every model is documented, and every image credit is listed openly in our sources file.'],
  [<Users />, 'Our Community', 'Built with contributions from historians, developers, archivists and everyday people who care about what gets remembered.'],
];

const PRINCIPLES = [
  [<Heart />, 'Respect for context'],
  [<BookOpen />, 'Sourced, honest content'],
  [<Sparkles />, 'Technology in service of culture'],
  [<HandHeart />, 'Open to contribution'],
];

export default function About({ openChat, onSearch }) {
  return (
    <Page onSearch={onSearch}>
      <PageHero title="About Dharohar X" subtitle="India lives on — through story, structure and now, augmented reality." image={IMG.konark} />
      <main className="shell aboutPage">
        <section>
          <div className="eyebrow">WHY DHAROHAR X</div>
          <h2>Heritage, carried forward</h2>
          <p>Dharohar X exists to bring India's monuments and living traditions to people who may never stand in front of them in person — and to give people who can visit a richer, technology-assisted way of seeing what's already there. We combine documented heritage content with 3D reconstruction and AR placement, so history stops being something you read about and starts being something you can walk around.</p>
        </section>

        <div className="aboutIconGrid">
          {PILLARS.map(([icon, t, d]) => (
            <div key={t}>{icon}<b>{t}</b><small>{d}</small></div>
          ))}
        </div>

        <div className="aboutCols">
          <article>
            <div className="eyebrow clay">HOW IT WORKS</div>
            <h3>From archive to augmented reality</h3>
            <p>Each heritage site begins as documented research — history, architectural style, and cultural significance — cross-checked against public sources. Selected temple sites are additionally captured and rebuilt as optimised 3D models, compressed for the web, and made explorable through both a live browser preview and mobile WebAR, with a native Android app in active development for more stable on-site tracking.</p>
            <p>Everything on this site — including every image credit and model source — is documented in our public sources file, linked from the footer.</p>
          </article>
          <article className="aboutQuote">
            <div className="quoteMark">“</div>
            <h3>Heritage is not just about the past, it gives meaning to our present and shape to our future.</h3>
            <p>— Dr. A.P.J. Abdul Kalam</p>
          </article>
        </div>

        <SectionTitle eyebrow="WHAT WE STAND FOR" title="" />
        <div className="principles">
          {PRINCIPLES.map(([icon, t]) => <div key={t}>{icon}{t}</div>)}
        </div>

        <section className="cultureCallout" style={{ marginTop: '3.2rem' }} id="privacy">
          <div>
            <div className="eyebrow">GET INVOLVED</div>
            <h3 style={{ marginBottom: '.4rem' }}>Contribute a story, correction or new site</h3>
            <p style={{ marginBottom: 0 }}>We welcome heritage research, photography, 3D capture and translation help. Reach out and tell us what you'd like to add.</p>
          </div>
          <Btn href="mailto:hello@dharoharx.in" clay>Email the Team</Btn>
        </section>

        <div className="sectionCompact" id="terms">
          <p style={{ fontSize: '.82rem', color: 'var(--muted)' }}>
            Terms & Privacy: Dharohar X is a heritage documentation project. Content is provided for educational purposes;
            sources and image credits are listed in <Link to="/SOURCES-AND-LICENSES.txt" style={{ color: 'var(--indigo)', fontWeight: 700 }}>our sources file</Link>.
            No personal data is collected beyond an optional newsletter email, which is never shared with third parties.
          </p>
        </div>
      </main>
    </Page>
  );
}
