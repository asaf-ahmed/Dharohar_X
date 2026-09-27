import { IMG } from './images';

// Regional food traditions — a lighter-weight sibling to the Culture &
// Traditions data, surfaced through the Explore page's "Cuisine" category.
export const CUISINE = [
  { slug: 'mughlai', title: 'Mughlai Cuisine', region: 'Delhi & Uttar Pradesh', image: IMG.taj,
    summary: 'Rich, slow-cooked dishes built on Mughal-court kitchen traditions — kebabs, biryanis and korma-style gravies finished with dried fruit and whole spice.' },
  { slug: 'odia', title: 'Odia Cuisine', region: 'Odisha', image: IMG.konark,
    summary: 'Temple-kitchen traditions centred on rice, dal and mustard-oil-tempered vegetables, alongside the famous mahaprasad offered at Puri\'s Jagannath Temple.' },
  { slug: 'rajasthani', title: 'Rajasthani Cuisine', region: 'Rajasthan', image: '/assets/culture/rajasthani-cuisine-1.jpg',
    summary: 'Desert-adapted cooking favouring lentils, gram flour and preserved vegetables — dal-baati-churma and gatte ki sabzi among its best-known dishes.' },
  { slug: 'south-indian', title: 'South Indian Cuisine', region: 'Tamil Nadu & Karnataka', image: '/assets/culture/south-indian-cuisine-1.jpg',
    summary: 'Rice- and lentil-based cooking built around fermentation — dosa, idli and sambar — alongside temple-town filter coffee culture.' },
];

export const cuisineBySlug = (slug) => CUISINE.find((c) => c.slug === slug) || CUISINE[0];
