import React, { useRef, useState } from 'react';
import { Rotate3D, ScanLine, Download, X, RotateCw, Maximize2 } from 'lucide-react';
import Photo from '../Photo';
import { MODELS } from '../../data/models';
import { useModelStage } from './useModelStage';

/**
 * Full workspace: a rail of every supplied temple model plus one live
 * WebGL/WebXR stage. Switching the rail swaps the loaded geometry in
 * place — all five models are reachable without leaving the page.
 */
export default function ModelWorkspace({ initialId = MODELS[0].id, onClose, showRail = true }) {
  const [activeId, setActiveId] = useState(initialId);
  const active = MODELS.find((m) => m.id === activeId) || MODELS[0];
  const mountRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const { status, progress, arReady, arActive, startAR } = useModelStage({
    mountRef, modelUrl: active.model, autoRotate,
  });

  return (
    <div className={'modelWorkspace' + (showRail ? '' : ' single')}>
      {showRail && (
        <div className="modelRail" role="listbox" aria-label="Choose a heritage model">
          {MODELS.map((m) => (
            <button
              key={m.id}
              role="option"
              aria-selected={m.id === activeId}
              className={'modelRailItem' + (m.id === activeId ? ' active' : '')}
              onClick={() => setActiveId(m.id)}
            >
              <Photo src={m.image} alt="" />
              <span>
                <b>{m.title}</b>
                <small>{m.place}</small>
              </span>
            </button>
          ))}
        </div>
      )}
      <div>
        <div className="modelTop">
          <div>
            <div className="eyebrow">INTERACTIVE MODEL PREVIEW</div>
            <h2>{active.title}</h2>
            <p>{active.place} · {active.built} · {active.deity}</p>
          </div>
          {onClose && <button onClick={onClose} aria-label="Close"><X size={18} /></button>}
        </div>
        <div className="modelStage">
          <div ref={mountRef} className="threeMount" />
          <div className="modelHint"><Rotate3D size={15} /> Drag to rotate · Scroll to zoom</div>
          <div className="modelStatus">{status}</div>
          {progress < 100 && (
            <div className="modelLoadBar"><span style={{ width: progress + '%' }} /></div>
          )}
          <div className="modelStageControls">
            <button
              className={autoRotate ? 'on' : ''}
              onClick={() => setAutoRotate((a) => !a)}
              aria-label="Toggle auto-rotate"
              title="Toggle auto-rotate"
            >
              <RotateCw size={16} />
            </button>
          </div>
        </div>
        <div className="modelControls">
          <button className="modelBtn" onClick={() => window.open(active.model, '_blank', 'noopener,noreferrer')}>
            <Download size={15} /> Model file
          </button>
          {arReady ? (
            <button className="modelBtn primary" onClick={startAR}>
              <ScanLine size={15} /> {arActive ? 'AR Active — Tap Surface' : 'View in AR'}
            </button>
          ) : (
            <span className="compatibility">
              WebAR needs HTTPS, camera permission and a device/browser with immersive WebXR AR. Otherwise, use the Android app.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
