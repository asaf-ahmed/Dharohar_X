import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';

export function Page({ children, onSearch, className = '' }) {
  return (
    <div className={className}>
      <Nav onSearch={onSearch} />
      {children}
      <Footer />
    </div>
  );
}

export function Btn({ to = '#', children, light = false, outline = false, clay = false, onClick, href, ...rest }) {
  const cls = ['btn', light && 'light', outline && 'outline', clay && 'clay'].filter(Boolean).join(' ');
  const content = <>{children}<ArrowRight size={15} /></>;
  if (href) return <a className={cls} href={href} onClick={onClick} {...rest}>{content}</a>;
  if (onClick && to === '#') return <button className={cls} onClick={onClick} {...rest}>{content}</button>;
  return <Link className={cls} to={to} onClick={onClick} {...rest}>{content}</Link>;
}

export function SectionTitle({ eyebrow, title, link, to = '#', tone }) {
  return (
    <div className="sectionTitle">
      <div>
        <div className={'eyebrow' + (tone ? ' ' + tone : '')}>{eyebrow}</div>
        {title && <h2>{title}</h2>}
      </div>
      {link && <Link to={to} className="viewAll">{link}<ArrowRight size={14} /></Link>}
    </div>
  );
}
