import React, { useEffect, useRef, useState } from 'react';
import {
  X, Camera, Upload, RotateCcw, Sparkles, AlertCircle, CheckCircle2,
  BookOpen, Landmark, ShieldCheck, Compass, RefreshCw, WifiOff,
} from 'lucide-react';
import { IMG } from '../../data/images';
import { analyzeImageWithAI } from '../../lib/aiApi';

const SAMPLES = [
  { title: 'Taj Mahal', site: 'Taj Mahal, Agra', url: IMG.taj },
  { title: 'Konark Sun Temple', site: 'Konark Sun Temple, Odisha', url: IMG.konark },
  { title: 'Hampi', site: 'Hampi, Karnataka', url: IMG.hampi },
];

export default function AIRecognition({ onClose, heritageSite = '' }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [camError, setCamError] = useState(null);

  const fileInput = useRef(null);
  const camInput = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => () => {
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    stopCamera();
  }, [preview]);

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamOn(false);
  }

  function pick(f) {
    if (!f) return;
    setError(null);
    setResult(null);
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    stopCamera();
  }

  async function pickSample(s) {
    try {
      const res = await fetch(s.url);
      const blob = await res.blob();
      pick(new File([blob], s.title.toLowerCase().replace(/\s+/g, '_') + '.jpg', { type: blob.type || 'image/jpeg' }));
    } catch {
      setError('Could not load that sample — try uploading your own photo instead.');
    }
  }

  async function startCamera() {
    setCamError(null);
    if (!navigator.mediaDevices?.getUserMedia) { camInput.current?.click(); return; }
    try {
      setCamOn(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setCamOn(false);
      camInput.current?.click();
    }
  }

  function capture() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => blob && pick(new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' })), 'image/jpeg', 0.92);
    stopCamera();
  }

  async function analyze() {
    if (!file) return;
    setBusy(true);
    setError(null);
    const res = await analyzeImageWithAI({ file, question: 'What is this? Tell me about it.', heritageSite });
    setBusy(false);
    if (res.ok) {
      setOffline(false);
      setResult(res.result);
    } else if (res.offline) {
      setOffline(true);
      setError("The AI backend isn't available right now. Check its deployment and Groq API key, then try again.");
    } else {
      setError(res.message || 'Analysis failed — please try again.');
    }
  }

  const reset = () => { setFile(null); setPreview(''); setResult(null); setError(null); };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sideModal aiPanel" onClick={(e) => e.stopPropagation()}>
        <button className="close darkClose" onClick={onClose} aria-label="Close"><X /></button>
        <div className="modalEyebrow" style={{ color: 'var(--gold)' }}>AI MONUMENT RECOGNITION · GROQ VISION</div>
        <h2 style={{ color: '#fff' }}>Identify a Monument with AI</h2>
        <p style={{ color: 'rgba(255,255,255,.65)' }}>
          {heritageSite ? `Exploring: ${heritageSite}` : "Upload or take a photo to understand what you're looking at."}
        </p>

        <input ref={fileInput} hidden type="file" accept="image/*" onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ''; }} />
        <input ref={camInput} hidden type="file" accept="image/*" capture="environment" onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ''; }} />

        {camOn && (
          <div className="aiCameraBox">
            <video ref={videoRef} autoPlay playsInline muted />
            <div className="aiCameraBadge"><span className="dot" /> Live Camera</div>
            <div className="aiCameraControls">
              <button className="btn" onClick={capture}><Camera size={15} /> Capture</button>
              <button className="btn outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} onClick={stopCamera}>Cancel</button>
            </div>
          </div>
        )}

        {!file && !camOn && (
          <>
            <div
              className={'uploadBox aiDropzone' + (dragging ? ' dragging' : '')}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
              onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files?.[0]); }}
              onClick={() => fileInput.current?.click()}
              role="button"
              tabIndex={0}
            >
              <Upload size={26} />
              <b>Drop a photo, or choose below</b>
              <small>JPG, PNG or WebP — up to 8MB</small>
              <div className="aiDropzoneBtns" onClick={(e) => e.stopPropagation()}>
                <button className="btn outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} onClick={startCamera} type="button">
                  <Camera size={14} /> Take Photo
                </button>
                <button className="btn" onClick={() => fileInput.current?.click()} type="button">
                  <Upload size={14} /> Upload Image
                </button>
              </div>
            </div>
            <div className="aiSamples">
              <small>Or test with a sample photo:</small>
              <div className="aiSampleGrid">
                {SAMPLES.map((s) => (
                  <button key={s.title} onClick={() => pickSample(s)} type="button">
                    <img src={s.url} alt={s.title} />
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
            {camError && <div className="aiError"><AlertCircle size={14} /> {camError}</div>}
          </>
        )}

        {file && !result && (
          <div className="aiPreviewStage">
            <div className={'aiPreviewImg' + (busy ? ' analyzing' : '')}>
              <img src={preview} alt="Selected" />
              {busy && (
                <div className="aiScanOverlay">
                  <RefreshCw size={26} className="spin" />
                  <b>Analysing heritage feature…</b>
                  <small>Consulting architectural and historical records</small>
                </div>
              )}
              {!busy && <button className="aiRemoveBtn" onClick={reset} aria-label="Remove"><X size={14} /></button>}
            </div>
            {!busy && (
              <div className="aiPreviewActions">
                <button className="btn outline" style={{ color: 'var(--ink)' }} onClick={() => fileInput.current?.click()}><RotateCcw size={14} /> Change Image</button>
                <button className="btn" onClick={analyze}><Sparkles size={14} /> Analyze Image</button>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="aiResult">
            <div className="aiResultHead">
              <img src={preview} alt="" />
              <div>
                <div className="aiResultBadge"><CheckCircle2 size={13} /> Analysis Complete{result.fallback && ' (offline mode)'}</div>
                <b>{result.identification || 'Heritage Feature Identified'}</b>
              </div>
            </div>
            {result.text && (
              <p className="aiResultIntro">{result.text}</p>
            )}
            <div className="aiResultSections">
              {result.historicalSignificance && (
                <div><div className="aiSectionLabel"><BookOpen size={14} /> Historical Significance</div><p>{result.historicalSignificance}</p></div>
              )}
              {result.architecturalDetails && (
                <div><div className="aiSectionLabel"><Compass size={14} /> Architectural Details</div><p>{result.architecturalDetails}</p></div>
              )}
              {result.culturalSignificance && (
                <div><div className="aiSectionLabel"><Sparkles size={14} /> Cultural Significance</div><p>{result.culturalSignificance}</p></div>
              )}
              {result.conservationInformation && (
                <div className="sage"><div className="aiSectionLabel"><ShieldCheck size={14} /> Conservation Information</div><p>{result.conservationInformation}</p></div>
              )}
            </div>
            <button className="btn" onClick={reset}><RotateCcw size={14} /> Analyze Another Image</button>
          </div>
        )}

        {error && (
          <div className="aiError">
            {offline ? <WifiOff size={15} /> : <AlertCircle size={15} />}
            <div>
              <b>{offline ? 'AI backend offline' : 'Identification error'}</b>
              <p>{error}</p>
              {file && !offline && <button className="aiRetry" onClick={analyze}>Retry Analysis</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
