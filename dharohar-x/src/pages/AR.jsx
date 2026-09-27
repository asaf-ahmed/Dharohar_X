import React from 'react';
import { ExternalLink, ScanLine, Smartphone } from 'lucide-react';
import { Page, Btn, SectionTitle } from '../components/Layout';
import PageHero from '../components/PageHero';
import { APK_URL } from '../data/misc';
import { assetUrl } from '../data/r2Assets';
import '../styles/ar.css';

function ARExperience({ eyebrow, title, video, text, steps, action, href }) {
  return (
    <article className="arProduct">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <video className="arProductVideo" controls playsInline preload="metadata" aria-label={`${title} demonstration`}>
        <source src={video} type="video/mp4" />
        Your browser does not support this video.
      </video>
      <p>{text}</p>
      <Btn href={href}>{action} <ExternalLink size={14} /></Btn>
      <div className="arProductSteps">{steps.map((step) => <span key={step}><Smartphone size={15} />{step}</span>)}</div>
    </article>
  );
}

export default function AR({ onSearch }) {
  return (
    <Page onSearch={onSearch} className="arPage">
      <div className="arPageBackground" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src={assetUrl('/videos/monument-hero.mp4')} type="video/mp4" />
        </video>
      </div>
      <PageHero title="AR Experiences" subtitle="Bring India’s heritage into your own space through interactive models and narrated augmented reality." className="pageHeroTall pageHeroLightOverlay" />
      <main className="shell pageBody arProductsPage">
        <SectionTitle eyebrow="EXPERIENCE HERITAGE IN YOUR SPACE" title="Two ways to explore with AR" />
        <p className="intro">Watch how each experience works, then open the existing Dharohar application from the button below.</p>
        <div className="arProductsGrid">
          <ARExperience
            eyebrow="TEMPLE VIEWER"
            title="Place a temple in your space"
            video={assetUrl('/videos/temple-viewer.mp4')}
            text="Place a life-like heritage temple in your surroundings and inspect its architecture from every angle."
            steps={['Open on a supported phone', 'Scan a flat surface', 'Tap to place the model']}
            action="Open Temple Viewer"
            href="/webar"
          />
          <ARExperience
            eyebrow="AR NARRATION"
            title="See the story as you explore"
            video={assetUrl('/videos/ar-narration.mp4')}
            text="Explore a heritage model in your space while listening to guided cultural information about its key details."
            steps={['Start the AR experience', 'Point at the heritage model', 'Listen and discover']}
            action="Open AR Narration"
            href="https://github.com/asaf-ahmed/Dharohar--X/releases/download/v1.0.0/TempleViewer.apk"
          />
        </div>
        <div className="arAccessNote"><ScanLine size={20} /><p>WebAR works best on Android Chrome over HTTPS. For the full native experience, use the existing Dharohar X Android application.</p><Btn href={APK_URL} outline>Download Android APK</Btn></div>
      </main>
    </Page>
  );
}
