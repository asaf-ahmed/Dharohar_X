import React from 'react';
import { Search } from 'lucide-react';

export default function PageHero({ title, subtitle, image, video, search, onSubmitSearch, className = '' }) {
  return (
    <section className={`pageHero${video ? ' pageHeroVideo' : ''}${className ? ` ${className}` : ''}`} style={image ? { backgroundImage: `url(${image})` } : undefined}>
      {video && <video className="pageHeroMedia" autoPlay muted loop playsInline preload="metadata" aria-label={`${title} introductory video`}><source src={video} type="video/mp4" /></video>}
      <div className="shell">
        <div className="eyebrow onDark">DHAROHAR X • EXPLORE • EXPERIENCE</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {search && (
          <form
            className="heroSearch"
            onSubmit={(e) => { e.preventDefault(); onSubmitSearch?.(new FormData(e.target).get('q')); }}
          >
            <Search size={18} />
            <input name="q" placeholder="Search monuments, traditions, festivals, crafts..." />
          </form>
        )}
      </div>
    </section>
  );
}
