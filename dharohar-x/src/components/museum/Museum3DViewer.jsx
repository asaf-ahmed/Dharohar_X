import React, { useRef, useState } from 'react';
import { Maximize2, RotateCw, ScanLine } from 'lucide-react';
import { useModelStage } from '../three/useModelStage';

export default function Museum3DViewer({ artifact }) {
  const mountRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const { status, progress, arReady, arActive, startAR } = useModelStage({ mountRef, modelUrl: artifact.model, autoRotate });
  const fullscreen = () => mountRef.current?.parentElement?.requestFullscreen?.();
  return <div className="museumViewer" id="viewer">
    <div ref={mountRef} className="museumViewerMount" />
    <div className="museumViewerStatus">{status}</div>
    {progress < 100 && <div className="museumViewerProgress"><span style={{ width: `${progress}%` }} /></div>}
    <div className="museumViewerHint">Drag to rotate · Scroll to zoom</div>
    <div className="museumViewerControls">
      <button type="button" className={autoRotate ? 'active' : ''} onClick={() => setAutoRotate((v) => !v)} aria-label="Toggle auto rotate"><RotateCw size={16} /> Auto rotate</button>
      <button type="button" onClick={fullscreen} aria-label="View 3D model fullscreen"><Maximize2 size={16} /> Fullscreen</button>
      {arReady && <button type="button" onClick={startAR} className="museumArButton"><ScanLine size={16} /> {arActive ? 'Scan a surface' : 'View in AR'}</button>}
    </div>
    {!arReady && <p className="museumArNote">AR needs a supported browser, HTTPS and camera permission. You can still explore this artifact in 3D.</p>}
  </div>;
}
