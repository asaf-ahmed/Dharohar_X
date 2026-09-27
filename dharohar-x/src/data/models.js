import { IMG } from './images';
import { assetUrl } from './r2Assets';

// Source FBX files (25–28MB each, untextured-in-scene) were converted to
// welded, simplified, WebP-textured GLB (~4.3–4.8MB each) so all five
// models load reliably together in the browser and on mobile WebXR.
// See /public/models-glb — originals kept under /public/models for reference.
export const MODELS = [
  { id: 'jagannath', title: 'Jagannath Temple', place: 'Puri, Odisha', built: '12th Century', deity: 'Lord Jagannath',
    model: assetUrl('/models-glb/jagannath.glb'), image: IMG.jagannath,
    blurb: 'Famed for the annual Rath Yatra chariot festival, one of the largest religious processions in the world.' },
  { id: 'konark', title: 'Konark Sun Temple', place: 'Konark, Odisha', built: '13th Century', deity: 'Surya, the Sun God',
    model: assetUrl('/models-glb/konark.glb'), image: IMG.konarkAr,
    blurb: 'Designed as a colossal stone chariot with twelve carved wheels, each functioning as a working sundial.' },
  { id: 'lingaraj', title: 'Lingaraj Temple', place: 'Bhubaneswar, Odisha', built: '11th Century', deity: 'Harihara (Shiva–Vishnu)',
    model: assetUrl('/models-glb/lingaraj.glb'), image: IMG.lingaraj,
    blurb: 'One of the oldest and largest temples in Bhubaneswar, a defining example of Kalinga temple architecture.' },
  { id: 'mukteshwar', title: 'Mukteshwar Temple', place: 'Bhubaneswar, Odisha', built: '10th Century', deity: 'Lord Shiva',
    model: assetUrl('/models-glb/mukteshwar.glb'), image: IMG.mukteshwar,
    blurb: 'Known as the "gem of Odishan architecture" for its ornate torana gateway and refined stone carving.' },
  { id: 'rajarani', title: 'Raja Rani Temple', place: 'Bhubaneswar, Odisha', built: '11th Century', deity: 'None (no presiding deity)',
    model: assetUrl('/models-glb/rajarani.glb'), image: IMG.rajarani,
    blurb: 'Named for the local reddish-gold sandstone, celebrated for its clustered, rhythmically tiered spire.' },
];

export const modelById = (id) => MODELS.find((m) => m.id === id) || MODELS[0];
