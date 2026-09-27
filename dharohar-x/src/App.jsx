import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import HeritageIndex from './pages/HeritageIndex';
import HeritageDetail from './pages/HeritageDetail';
import CultureIndex from './pages/CultureIndex';
import CultureDetail from './pages/CultureDetail';
import AR from './pages/AR';
import WebAR from './pages/WebAR';
import About from './pages/About';
import SearchPanel from './components/overlays/SearchPanel';
import AIRecognition from './components/overlays/AIRecognition';
import ChatPanel from './components/overlays/ChatPanel';
import Museum from './pages/Museum';
import MuseumDetail from './pages/MuseumDetail';

export default function App() {
  const [overlay, setOverlay] = useState(null); // 'search' | 'ai' | 'chat' | null
  const [overlaySite, setOverlaySite] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const close = () => setOverlay(null);

  useEffect(() => { window.__navigate = navigate; }, [navigate]);
  useEffect(() => { setOverlay(null); window.scrollTo(0, 0); }, [location.pathname]);
  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [location.pathname, location.hash]);
  // Defensive: several call sites do `onClick={openAI}` directly (no
  // wrapper arrow function), which means the browser's click event object
  // — not a site name — gets passed as the first argument. Only accept
  // real strings as heritage-site context.
  const shared = {
    onSearch: () => setOverlay('search'),
    openAI: (site) => { setOverlaySite(typeof site === 'string' ? site : ''); setOverlay('ai'); },
    openChat: (site) => { setOverlaySite(typeof site === 'string' ? site : ''); setOverlay('chat'); },
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home {...shared} />} />
        <Route path="/explore" element={<Explore {...shared} />} />
        <Route path="/heritage" element={<HeritageIndex {...shared} />} />
        <Route path="/heritage/:slug" element={<HeritageDetail {...shared} />} />
        <Route path="/culture" element={<CultureIndex {...shared} />} />
        <Route path="/culture/:slug" element={<CultureDetail {...shared} />} />
        <Route path="/ar" element={<AR {...shared} />} />
        <Route path="/webar" element={<WebAR {...shared} />} />
        <Route path="/about" element={<About {...shared} />} />
        <Route path="/museum" element={<Museum {...shared} />} />
        <Route path="/museum/:id" element={<MuseumDetail {...shared} />} />
        <Route path="*" element={<Home {...shared} />} />
      </Routes>
      {overlay === 'search' && <SearchPanel onClose={close} />}
      {overlay === 'ai' && <AIRecognition onClose={close} heritageSite={overlaySite} />}
      {overlay === 'chat' && (
        <ChatPanel onClose={close} heritageSite={overlaySite} />
      )}
    </>
  );
}
