import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import Photo from './Photo';

export function ImageCard({ img, title, sub, to = '#', desc }) {
  return (
    <Link className="imageCard" to={to}>
      <Photo src={img} alt={title} />
      <div className="cardBody">
        <b>{title}</b>
        {sub && <small>{sub}</small>}
        {desc && <p>{desc}</p>}
        <span className="cardArrow"><ArrowUpRight size={15} /></span>
      </div>
    </Link>
  );
}

export function Feature({ icon, title, text, onClick, to = '/explore' }) {
  const navigate = useNavigate();
  return (
    <button className="feature" onClick={onClick || (() => navigate(to))}>
      {icon}
      <div><b>{title}</b><small>{text}</small></div>
      <ArrowRight size={16} />
    </button>
  );
}

export function Promo({ dark, title, text, button, image, onClick }) {
  return (
    <div
      className={'promo ' + (dark ? 'dark' : '')}
      style={image ? { backgroundImage: `url(${image})` } : {}}
    >
      <div className="promoIcon"><MessageCircle /></div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <button className="promoBtn" onClick={onClick}>{button}</button>
      </div>
    </div>
  );
}

export function Way({ n, title, text, image, to = '/explore' }) {
  return (
    <Link to={to} className="way">
      <Photo src={image} alt={title} />
      <div className="wayOverlay">
        <span>{n}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <ArrowRight />
      </div>
    </Link>
  );
}

export function Story({ img, title, blurb, to = '/explore' }) {
  return (
    <article className="story">
      <Photo src={img} alt={title} />
      <div>
        <b>{title}</b>
        <p>{blurb || 'Read a story connecting people, places and living traditions.'}</p>
        <Link to={to}>Read More <ArrowRight size={11} /></Link>
      </div>
    </article>
  );
}

export function Tabs({ items, active, setActive }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((x) => (
        <button key={x} role="tab" aria-selected={active === x} className={active === x ? 'active' : ''} onClick={() => setActive(x)}>
          {x}
        </button>
      ))}
    </div>
  );
}

export function Fact({ a, b }) {
  return <div className="fact"><small>{a}</small><b>{b}</b></div>;
}
