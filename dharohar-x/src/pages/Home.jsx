import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Landmark, Sparkles, Globe2, Camera, Download, Rotate3D, BookOpen, ScanLine, Languages,
} from 'lucide-react';
import { Page, Btn, SectionTitle } from '../components/Layout';
import { ImageCard, Feature, Promo, Way, Story } from '../components/Cards';
import Photo from '../components/Photo';
import { IMG } from '../data/images';
import { assetUrl } from '../data/r2Assets';
import { HERITAGE } from '../data/heritage';
import { CULTURES } from '../data/culture';
import { STORIES } from '../data/misc';

export default function Home({ openAI, openChat, onSearch }) {
  const featuredHeritage = HERITAGE.filter((h) => h.slug !== 'amer-fort').concat(HERITAGE.filter((h) => h.slug === 'amer-fort'));
  const featuredCulture = CULTURES.slice(0, 5);

  return (
    <Page onSearch={onSearch}>
      <main>
        {/* ---------- HERO ---------- */}
        <section className="heroHome">
          <video className="heroHomeVideo" autoPlay muted loop playsInline preload="metadata" aria-label="Dharohar X heritage preview">
            <source src={assetUrl('/videos/homepagehero.mp4')} type="video/mp4" />
          </video>
          <div className="heroContent">
            <div className="eyebrow lightText">MUGHAL ARCHITECTURE • DHAROHAR X</div>
            <h1>India's Heritage,<br /><span>Reimagined.</span></h1>
            <p>Discover historic places, untold stories and immersive AR experiences — where technology meets tradition.</p>
            <div className="heroButtons">
              <Btn to="/explore">Explore Heritage</Btn>
              <Btn to="/ar" light>Experience AR</Btn>
            </div>
          </div>
        </section>

        {/* ---------- FEATURE STRIP ---------- */}
        <section className="featureStrip shell">
          <Feature icon={<Landmark />} title="Discover Heritage" text="Monuments, sites, architecture" to="/explore" />
          <Feature icon={<Sparkles />} title="Experience Culture" text="Traditions, arts, festivals" to="/culture" />
          <Feature icon={<Globe2 />} title="Explore AR Experiences" text="3D models, WebAR, immersive" to="/ar" />
          <Feature icon={<Camera />} title="Identify a Monument with AI" text="Supported heritage recognition" onClick={openAI} />
        </section>

        {/* ---------- FEATURED HERITAGE ---------- */}
        <section className="section shell">
          <SectionTitle eyebrow="FEATURED HERITAGE" title="Discover India's Rich Heritage" link="View All" to="/explore" />
          <div className="cards5">
            {featuredHeritage.map((h) => (
              <ImageCard key={h.slug} img={h.image} title={h.title} sub={h.place} to={`/heritage/${h.slug}`} desc="Explore history, architecture and cultural significance." />
            ))}
          </div>
        </section>

        {/* ---------- CULTURE ---------- */}
        <section className="section washMist">
          <div className="shell">
            <SectionTitle eyebrow="CULTURE & TRADITIONS" title="Explore Living Traditions" link="View All" to="/culture" tone="clay" />
            <div className="cards5">
              {featuredCulture.map((c) => (
                <ImageCard key={c.slug} img={c.image} title={c.title} sub={c.category} to={`/culture/${c.slug}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- PROMOS ---------- */}
        <section className="twoPromo shell" style={{ marginTop: '5.5rem' }}>
          <Promo dark title="Meet Your AI Heritage Guide" text="Ask questions about monuments, traditions, festivals and cultural history." button="Ask Dharohar →" onClick={openChat} />
          <Promo image={IMG.taj} title="Can't identify a monument?" text="Upload or take a photo to identify a supported heritage monument." button="Identify Now →" onClick={openAI} />
        </section>

        {/* ---------- THREE WAYS ---------- */}
        <section className="section shell">
          <SectionTitle eyebrow="EXPERIENCE HERITAGE YOUR WAY" title="Three Ways to Experience" />
          <div className="threeWays">
            <Way n="01" title="Before You Visit" text="Explore information, 3D previews and plan your journey with AI-guided insights." image={IMG.hampi} to="/explore" />
            <Way n="02" title="Cannot Visit" text="Explore monuments remotely through images, narration and virtual stories." image={IMG.taj} to="/heritage/taj-mahal" />
            <Way n="03" title="On-Site AR Experience" text="Point your camera, place a 3D heritage model and explore it on a real surface." image={IMG.konark} to="/ar" />
          </div>
        </section>

        {/* ---------- FEATURED HERITAGE SITE (Virupaksha) ---------- */}
        <section className="featureHeritage shell">
          <div className="featureImage">
            <Photo src={IMG.hampi} alt="Virupaksha Temple" />
            <div className="thumbs">
              <img src={IMG.hampi} alt="" />
              <img src={IMG.konark} alt="" />
              <img src={IMG.taj} alt="" />
            </div>
          </div>
          <div className="featureCopy">
            <div className="eyebrow">FEATURED HERITAGE SITE</div>
            <h2>Virupaksha Temple</h2>
            <div className="location"><MapPin size={15} /> Hampi, Karnataka</div>
            <p>A living testament to India's rich cultural and architectural legacy. Discover its history, architecture and enduring cultural significance.</p>
            <div className="tags"><span>14th Century</span><span>Dravidian Architecture</span><span>UNESCO Site</span></div>
            <div className="featureBtns">
              <Btn to="/heritage/hampi">View Heritage Detail</Btn>
              <Btn to="/ar" outline>Try WebAR</Btn>
            </div>
          </div>
          <blockquote>
            “Heritage is not just about the past, it gives meaning to our present and shape to our future.”
            <small>— Dr. A.P.J. Abdul Kalam</small>
          </blockquote>
        </section>

        {/* ---------- STORIES ---------- */}
        <section className="section shell stories">
          <SectionTitle eyebrow="STORIES THAT KEEP INDIA ALIVE" title="People. Places. Perspectives." link="Explore All Stories" to="/explore#stories" />
          <p className="intro">Read real stories, untold histories and the people who preserve our heritage.</p>
          <div className="storyGrid">
            {STORIES.map((s) => (
              <Story key={s.slug} img={s.slug === 'living-traditions-varanasi' ? CULTURES.find((c) => c.slug === 'banarasi-weaving').image
                : s.slug === 'art-and-science-of-hampi' ? IMG.hampi
                : s.slug === 'women-keepers-of-heritage' ? CULTURES.find((c) => c.slug === 'blue-pottery').image
                : IMG.konark} title={s.title} blurb={s.blurb} to={s.to} />
            ))}
          </div>
        </section>

        {/* ---------- APP BAND ---------- */}
        <section className="appBand">
          <div className="shell appInner">
            <div>
              <div className="eyebrow onDark">THE DHAROHAR X APP</div>
              <h2>History in Your Hands</h2>
              <p>Scan. Explore. Listen. Experience. Use the current Unity AR prototype for surface detection and anchored heritage models.</p>
              <div className="storeBtns">
                <Link to="/ar"><Download size={14} /> Download Android App</Link>
                <Link to="/ar"><Rotate3D size={14} /> Explore AR</Link>
              </div>
            </div>
            <div className="phoneMock"><Photo src={IMG.konark} alt="AR heritage preview" /></div>
            <div className="appFeatures">
              <span><Rotate3D /> 3D Heritage Models</span>
              <span><BookOpen /> Audio Narration</span>
              <span><ScanLine /> Surface-Anchored AR</span>
              <span><Sparkles /> AI-assisted discovery</span>
              <span><Languages /> Multilingual roadmap</span>
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}
