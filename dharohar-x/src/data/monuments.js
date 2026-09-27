import { IMG } from './images';
import { HERITAGE } from './heritage';
import { assetUrl } from './r2Assets';

const audio = (name) => assetUrl(`/audio/monuments/${name}`);
const model = (name) => assetUrl(`/models/monuments/${name}`);

const supplied = [
  {
    slug: 'jagannath-temple', title: 'Jagannath Temple', place: 'Puri, Odisha',
    category: 'Kalinga architecture', image: IMG.jagannath, model: assetUrl('/models-glb/jagannath.glb'),
    en: audio('JagganathTempleEnglish.mp3'), hi: audio('JagganathTempleHindi.mp3'),
    desc: 'One of India’s most important pilgrimage centres, the Jagannath Temple anchors the living Rath Yatra tradition in Puri.',
  },
  {
    slug: 'lingaraj-temple', title: 'Lingaraj Temple', place: 'Bhubaneswar, Odisha',
    category: 'Kalinga architecture', image: IMG.lingaraj, model: assetUrl('/models-glb/lingaraj.glb'),
    en: audio('LingrajTempleEnglish.mp3'), hi: audio('LingrajTempleHindi.mp3'),
    desc: 'Lingaraj Temple is one of Bhubaneswar’s defining medieval temples and a landmark of mature Kalinga architecture.',
  },
  {
    slug: 'mukteshwar-temple', title: 'Mukteshwar Temple', place: 'Bhubaneswar, Odisha',
    category: 'Kalinga architecture', image: IMG.mukteshwar, model: assetUrl('/models-glb/mukteshwar.glb'),
    en: audio('MukteshwarTempleEnglish.mp3'), hi: audio('MukteshwarTempleHindi.mp3'),
    desc: 'Known as the gem of Odishan architecture, Mukteshwar Temple is celebrated for its ornate torana and refined carving.',
  },
  {
    slug: 'raja-rani-temple', title: 'Raja Rani Temple', place: 'Bhubaneswar, Odisha',
    category: 'Kalinga architecture', image: IMG.rajarani, model: assetUrl('/models-glb/rajarani.glb'),
    en: audio('RajaRaniTempleEnglish.mp3'), hi: audio('RajaRaniTempleHindi.mp3'),
    desc: 'Raja Rani Temple is named for its warm sandstone and admired for the rhythmically tiered forms of its spire.',
  },
  {
    slug: 'golden-temple', title: 'Golden Temple', place: 'Amritsar, Punjab',
    category: 'Sacred architecture', image: '/assets/monuments/golden-temple.jpg',
    model: model('Golden Temple.glb'), en: audio('GoldenTempleEnglish.mp3'), hi: audio('GoldenTempleHindi.mp3'),
    desc: 'The Harmandir Sahib, popularly known as the Golden Temple, is a living centre of Sikh faith and one of India’s most recognisable sacred spaces.',
  },
  {
    slug: 'meenakshi-amman-temple', title: 'Meenakshi Amman Temple', place: 'Madurai, Tamil Nadu',
    category: 'Dravidian architecture', image: '/assets/monuments/meenakshi-temple.jpg',
    model: model('Meenakshi Amman Temple.glb'), en: audio('MeenakshiAmmanEnglish.mp3'), hi: audio('MeenakshiAmmanHindi.mp3'),
    desc: 'A monumental temple complex in Madurai, celebrated for its sculpted gopurams, ritual courtyards and enduring role in the city’s cultural life.',
  },
  {
    slug: 'victoria-memorial', title: 'Victoria Memorial', place: 'Kolkata, West Bengal',
    category: 'Colonial-era monument', image: '/assets/monuments/victoria-memorial.jpg',
    model: model('Victoria Memorial.glb'), en: audio('VictoriaMemorialEnglish.mp3'), hi: audio('VictoriaMemorialHindi.mp3'),
    desc: 'Built in white Makrana marble, the Victoria Memorial is now a museum and landmark set within one of Kolkata’s most important public gardens.',
  },
  {
    slug: 'ram-mandir', title: 'Ram Mandir', place: 'Ayodhya, Uttar Pradesh',
    category: 'Temple architecture', image: '/assets/monuments/ram-mandir.png',
    model: model('Ram Mandir.glb'), en: audio('RamMandirEnglish.mp3'), hi: audio('RamMandirHindi.mp3'),
    desc: 'The Ram Mandir is a contemporary sacred landmark in Ayodhya, shaped by a long architectural and devotional tradition.',
  },
  {
    slug: 'taj-mahal-model', title: 'Taj Mahal', place: 'Agra, Uttar Pradesh',
    category: 'Mughal architecture', image: IMG.taj,
    model: model('Taj Mahal.glb'), en: audio('TajMahalEnglishNarration.mp3'), hi: audio('TajMahalHindiNarration.mp3'),
    desc: HERITAGE.find((item) => item.slug === 'taj-mahal').desc,
  },
  {
    slug: 'mysore-palace', title: 'Mysore Palace', place: 'Mysuru, Karnataka',
    category: 'Royal architecture', image: '/assets/monuments/mysore-palace.jpg',
    model: model('Mysore Palace.glb'), en: audio('MysorePalaceEnglish.mp3'), hi: audio('MysorePalaceHindi.mp3'),
    desc: 'Mysore Palace is a richly ornamented royal residence known for its Indo-Saracenic design, ceremonial interiors and illuminated festivals.',
  },
];

const existing = HERITAGE.map((item) => {
  const ar = {
    'konark-sun-temple': ['konark', 'KonarkTempleEnglish.mp3', 'KonarkTempleHindi.mp3'],
    'taj-mahal': ['Taj Mahal', 'TajMahalEnglishNarration.mp3', 'TajMahalHindi.mp3'],
  }[item.slug];
  return {
    ...item,
    category: item.style,
    model: ar ? (item.slug === 'taj-mahal' ? model('Taj Mahal.glb') : assetUrl(`/models-glb/${ar[0]}.glb`)) : null,
    en: ar ? audio(ar[1]) : null,
    hi: ar ? audio(ar[2]) : null,
  };
});

export const MONUMENTS = [...existing, ...supplied.filter((item) => !['taj-mahal-model'].includes(item.slug))];
export const monumentBySlug = (slug) => MONUMENTS.find((item) => item.slug === slug) || MONUMENTS[0];
