import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Download, Menu, X } from 'lucide-react';
import { IMG } from '../data/images';
import { APK_URL } from '../data/misc';

const LINKS = [
  ['Home', '/'],
  ['Culture & Traditions', '/culture'],
  ['Explore', '/explore'],
  ['Heritage & Monuments', '/heritage'],
  ['Experience AR Apps', '/ar'],
  ['Museum', '/museum'],
  ['About', '/about'],
];

function isActive(pathname, linkPath) {
  if (linkPath === '/') return pathname === '/';
  const section = '/' + linkPath.split('/')[1];
  return pathname.startsWith(section);
}

export default function Nav({ onSearch }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <header className="nav">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src={IMG.icon} alt="Dharohar X" />
        <span className="brandType">
          <b>Dharohar X</b>
          <small>INDIA LIVES ON</small>
        </span>
      </Link>
      <nav className={open ? 'open' : ''}>
        {LINKS.map(([t, p, children]) => children ? (
          <div className="navDropdown" key={p}>
            <Link className={isActive(loc.pathname, p) ? 'active' : ''} to={p} onClick={() => setOpen(false)}>{t}</Link>
            <div className="navDropdownMenu">{children.map(([label, path], index) => <Link key={path + label + index} to={path} onClick={() => setOpen(false)}>{label}</Link>)}</div>
          </div>
        ) : <Link key={p} className={isActive(loc.pathname, p) ? 'active' : ''} to={p} onClick={() => setOpen(false)}>{t}</Link>)}
      </nav>
      <div className="navActions">
        <button className="iconBtn" aria-label="Search" onClick={onSearch}><Search size={19} /></button>
        <a className="launch" href={APK_URL}><span>Launch AR</span> <Download size={14} /></a>
        <button className="menuBtn" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
