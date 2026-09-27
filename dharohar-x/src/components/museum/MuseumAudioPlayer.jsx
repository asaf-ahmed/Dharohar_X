import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Volume2 } from 'lucide-react';

export default function MuseumAudioPlayer({ narration }) {
  const ref = useRef(null);
  const [lang, setLang] = useState('en');
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => { const a = ref.current; if (!a) return; a.pause(); a.currentTime = 0; setPlaying(false); setTime(0); setError(false); }, [lang, narration]);
  const fmt = (v) => `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, '0')}`;
  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
      return;
    }
    ref.current.play().then(() => setPlaying(true)).catch(() => setError(true));
  };
  const changeLanguage = (next) => setLang(next);
  return <div className="museumAudio">
    <audio ref={ref} src={narration?.[lang]} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)} onEnded={() => setPlaying(false)} onError={() => setError(true)} />
    <div className="museumAudioHeading"><div><span className="eyebrow">LISTEN TO STORY</span><h3>Hear the living tradition</h3></div><Volume2 size={20} /></div>
    <div className="museumLanguage"><button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>English</button><button type="button" className={lang === 'hi' ? 'active' : ''} onClick={() => changeLanguage('hi')}>हिन्दी</button></div>
    {error ? <p className="museumAudioError">Narration is unavailable for this artifact right now.</p> : <><input aria-label="Narration progress" type="range" min="0" max={duration || 0} step=".1" value={time} onChange={(e) => { ref.current.currentTime = e.target.value; setTime(e.target.value); }} /><div className="museumAudioControls"><button type="button" onClick={toggle} aria-label={playing ? 'Pause narration' : 'Play narration'}>{playing ? <Pause size={17} /> : <Play size={17} />}</button><button type="button" onClick={() => { ref.current.currentTime = 0; setTime(0); }} aria-label="Restart narration"><RotateCcw size={16} /></button><span>{fmt(time)} / {fmt(duration)}</span></div></>}
  </div>;
}
