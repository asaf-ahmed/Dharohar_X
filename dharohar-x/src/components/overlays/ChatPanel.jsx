import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Camera, Loader2, WifiOff, RotateCcw, MapPin } from 'lucide-react';
import { HERITAGE } from '../../data/heritage';
import { CULTURES } from '../../data/culture';
import { chatWithAI, analyzeImageWithAI } from '../../lib/aiApi';

// Local, always-available fallback so the chat still answers something
// useful when the optional AI backend (see /server) isn't running.
function localAnswer(text) {
  const lower = text.toLowerCase();
  const monument = HERITAGE.find((h) => lower.includes(h.title.toLowerCase()) || lower.includes(h.slug.replace(/-/g, ' ')));
  if (monument) return `${monument.title} (${monument.place}) — ${monument.desc}`;
  const tradition = CULTURES.find((c) => lower.includes(c.title.toLowerCase()));
  if (tradition) return `${tradition.title} is a ${tradition.category.toLowerCase()} from ${tradition.region}. ${tradition.summary}`;
  if (lower.includes('rajasthan')) return 'Rajasthan is known for festivals like Teej and desert fairs, Rajput-era forts such as Amer Fort, and craft traditions in textiles, pottery and jewellery.';
  if (lower.includes('kalinga')) return 'Kalinga architecture is the temple style of ancient Odisha — seen at Konark, Lingaraj and Mukteshwar — marked by a curved deul tower, pyramidal jagamohana hall and richly carved stone surfaces.';
  if (lower.includes('ar') || lower.includes('webar')) return 'Dharohar X offers a live 3D preview and mobile WebAR for five supplied temple models — open the AR Experiences page to try one.';
  if (lower.includes('what to see') || lower.includes('what should i see')) return "Prioritise the main gateway or facade, the central hall or sanctum with its carved detail, and any on-site museum. Allow at least two hours for an unhurried visit.";
  if (lower.includes('plan') || lower.includes('trip') || lower.includes('hour')) return "A simple 3-hour plan: Hour 1 the entrance and outer structure, Hour 2 the main hall and carved detail, Hour 3 any on-site museum and a slower second look in better light.";
  return "I can help you explore monuments, traditions, festivals, architecture and Dharohar X's AR experiences. Try one of the suggestions below, or ask about a specific place.";
}

export default function ChatPanel({ onClose, heritageSite = '' }) {
  const greeting = heritageSite
    ? `Namaste! I'm your Dharohar Heritage Guide. How can I help you explore ${heritageSite} today?`
    : "Hello! I'm your AI Heritage Guide. Ask me about monuments, traditions, festivals, culture and more — or attach a photo and I'll take a look.";

  const [messages, setMessages] = useState([{ from: 'bot', text: greeting }]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [backendOffline, setBackendOffline] = useState(false);
  const [pendingImage, setPendingImage] = useState(null); // { file, previewUrl }
  const endRef = useRef(null);
  const fileInput = useRef(null);

  const suggestions = [
    heritageSite ? `Tell me about ${heritageSite}` : 'Tell me about the Taj Mahal',
    heritageSite ? 'What should I see there?' : 'What is Kathak?',
    heritageSite ? "What's nearby?" : 'Which festivals are celebrated in Rajasthan?',
    heritageSite ? 'Plan a 3-hour visit' : 'Explain Kalinga architecture',
  ];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, busy]);

  const pushBot = (text) => setMessages((m) => [...m, { from: 'bot', text }]);
  const pushUser = (text, image) => setMessages((m) => [...m, { from: 'user', text, image }]);

  const resetChat = () => { setMessages([{ from: 'bot', text: greeting }]); setPendingImage(null); };

  const send = async (text = q) => {
    if (!text.trim() && !pendingImage) return;
    const image = pendingImage;
    pushUser(text || (image ? 'What is this?' : ''), image?.previewUrl);
    setQ('');
    setPendingImage(null);
    setBusy(true);

    if (image) {
      const res = await analyzeImageWithAI({ file: image.file, question: text || 'What is this? Tell me about it.', heritageSite });
      setBusy(false);
      if (res.ok) {
        setBackendOffline(false);
        const r = res.result;
        pushBot(r.text || r.identification || 'Analysis complete.');
      } else if (res.offline) {
        setBackendOffline(true);
        pushBot("The AI image service isn't running right now, so I can't analyse photos at the moment — try the text chat instead, or start the backend (see /server in the project).");
      } else {
        pushBot(`I couldn't analyse that image: ${res.message}`);
      }
      return;
    }

    const history = messages.slice(-8).map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    const res = await chatWithAI(text, history, heritageSite);
    setBusy(false);
    if (res.ok) {
      setBackendOffline(!!res.fallback);
      pushBot(res.fallback ? localAnswer(text) : res.result);
    } else if (res.offline) {
      setBackendOffline(true);
      pushBot(localAnswer(text));
    } else {
      pushBot(`${localAnswer(text)}\n\n(AI service error: ${res.message})`);
    }
  };

  const handleFile = (f) => {
    if (!f) return;
    setPendingImage({ file: f, previewUrl: URL.createObjectURL(f) });
  };

  return (
    <div className="chatDock" role="complementary" aria-label="Dharohar AI Heritage Guide">
      <div className="chatPanel" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close"><X /></button>
        <div className="modalEyebrow">ASK DHAROHAR</div>
        <h2>Ask Dharohar</h2>
        <p>
          {heritageSite ? <><MapPin size={12} style={{ verticalAlign: '-1px' }} /> Context: {heritageSite}</> : 'Your AI Heritage Guide'}
          {backendOffline && <span className="offlineBadge"><WifiOff size={11} /> local mode</span>}
        </p>
        <button className="chatReset" onClick={resetChat} type="button"><RotateCcw size={12} /> Reset conversation</button>
        <div className="chatMessages" role="log" aria-live="polite" aria-label="Chat conversation">
          {messages.map((m, i) => (
            <div key={i} className={m.from === 'bot' ? 'chatMsg' : 'chatUser'}>
              {m.image && <img src={m.image} alt="" className="chatImg" />}
              {m.text}
            </div>
          ))}
          {busy && <div className="chatMsg"><Loader2 size={14} className="spin" /> Thinking…</div>}
          <div ref={endRef} />
        </div>
        {pendingImage && (
          <div className="chatPendingImage">
            <img src={pendingImage.previewUrl} alt="" />
            <span>Photo attached — ask a question or just send.</span>
            <button onClick={() => setPendingImage(null)} aria-label="Remove photo"><X size={13} /></button>
          </div>
        )}
        <div className="suggestions">
          {suggestions.map((x) => (
            <button className="suggest" key={x} onClick={() => send(x)} disabled={busy}>{x}</button>
          ))}
        </div>
        <form className="chatInput" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={(e) => { handleFile(e.target.files?.[0] || null); e.target.value = ''; }}
          />
          <button type="button" className="chatAttach" onClick={() => fileInput.current?.click()} aria-label="Attach photo" disabled={busy}>
            <Camera size={17} />
          </button>
          <input aria-label="Type your question" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type your question..." disabled={busy} />
          <button aria-label="Send" disabled={busy}><Send size={15} /></button>
        </form>
      </div>
    </div>
  );
}
