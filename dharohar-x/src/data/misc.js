import { IMG } from './images';
import { HERITAGE } from './heritage';

export const HEROES = HERITAGE.filter((h) => h.slug !== 'amer-fort').map((h) => ({
  title: h.title, place: h.place, image: h.image, eyebrow: h.eyebrow, slug: h.slug,
}));

export const APK_URL = 'https://github.com/asaf-ahmed/Dharohar--X/releases/latest/download/DharoharX.apk';

export const FEATURED_LOCATIONS = [
  ['Taj Mahal', IMG.taj, 'Agra, Uttar Pradesh', '/heritage/taj-mahal'],
  ['Qutub Minar', IMG.qutub, 'Delhi', '/heritage/qutub-minar'],
  ['Konark Sun Temple', IMG.konark, 'Odisha', '/heritage/konark-sun-temple'],
  ['Hampi', IMG.hampi, 'Karnataka', '/heritage/hampi'],
];

export const STORIES = [
  { slug: 'living-traditions-varanasi', title: 'The Living Traditions of Varanasi', to: '/culture/banarasi-weaving',
    blurb: 'Faith, culture and continuity on the ghats — and in the looms that still weave Banarasi silk by hand.' },
  { slug: 'art-and-science-of-hampi', title: 'Art and Science of Hampi', to: '/heritage/hampi',
    blurb: 'A city of ruins still full of life, and the stonework that shows how precisely the Vijayanagara empire built.' },
  { slug: 'women-keepers-of-heritage', title: 'Women Keepers of Heritage', to: '/culture/blue-pottery',
    blurb: "Stories of the artisans, mostly women in many craft clusters today, preserving techniques passed down for generations." },
  { slug: 'konark-sun-in-stone', title: 'Konark: The Sun in Stone', to: '/heritage/konark-sun-temple',
    blurb: 'Engineering, art and astronomy united in twelve pairs of stone wheels.' },
];

export const SEARCH_INDEX = [
  ['Taj Mahal', '/heritage/taj-mahal'],
  ['Qutub Minar', '/heritage/qutub-minar'],
  ['Hampi', '/heritage/hampi'],
  ['Konark Sun Temple', '/heritage/konark-sun-temple'],
  ['Amer Fort', '/heritage/amer-fort'],
  ['Kathak', '/culture/kathak'],
  ['Bharatanatyam', '/culture/bharatanatyam'],
  ['Odissi', '/culture/odissi'],
  ['Diwali', '/culture/diwali'],
  ['Holi', '/culture/holi'],
  ['AR Experiences', '/ar'],
  ['WebAR', '/webar'],
  ['Explore Map', '/explore#map'],
  ['About Dharohar X', '/about'],
  ['Mughlai Cuisine', '/explore#cuisine'],
  ['Odia Cuisine', '/explore#cuisine'],
  ['Rajasthani Cuisine', '/explore#cuisine'],
  ['South Indian Cuisine', '/explore#cuisine'],
];
