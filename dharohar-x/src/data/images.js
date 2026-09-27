import { assetUrl } from './r2Assets';

// R2 is used only for verified entries in the generated inventory; all other
// images remain local and continue to work offline.
export const IMG = {
  taj: assetUrl('/assets/hero/taj-hero-ai.jpg'),
  tajClassic: assetUrl('/assets/hero/taj-hero.jpg'),
  qutub: assetUrl('/assets/hero/qutub-hero.jpg'),
  hampi: assetUrl('/assets/hero/hampi-hero.jpg'),
  konark: assetUrl('/assets/hero/konark-hero.jpg'),

  jagannath: assetUrl('/assets/ar/Jagannath-Temple.webp'),
  konarkAr: assetUrl('/assets/ar/Konark-Sun-Temple.webp'),
  lingaraj: assetUrl('/assets/ar/Lingaraj-Temple.webp'),
  mukteshwar: assetUrl('/assets/ar/Mukteshwar-Temple.webp'),
  rajarani: assetUrl('/assets/ar/Raja-Rani-Temple.webp'),

  logo: assetUrl('/assets/brand/dharohar-x-logo-cropped.png'),
  icon: assetUrl('/assets/brand/dharohar-x-icon.png'),
};
