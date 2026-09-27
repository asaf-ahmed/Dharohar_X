import { assetUrl } from './r2Assets';

const audio = (name) => assetUrl(`/audio/museum/${name}`);
const model = (name) => assetUrl(`/models/museum/${name}`);

export const MUSEUM_ARTIFACTS = [
  {
    id: 'konark-chariot-wheel', name: 'Konark Chariot Wheel', category: 'Sculpture', subcategory: 'Architectural carving',
    region: 'Odisha', tradition: 'Temple art', associatedHeritage: 'Konark Sun Temple',
    shortDescription: 'A carved stone wheel associated with the Sun Temple’s monumental chariot form.',
    description: 'The Konark wheel brings together geometry, movement and ornament in a single work of Odisha temple art.',
    material: 'Carved stone', tags: ['Odisha', 'wheel', 'temple', 'sculpture'],
    model: model('Konark-Wheel.glb'), image: '/assets/museum/konark-chariot-wheel.jpg',
    narration: { en: audio('Konark_Chariot_Wheel_English.mp3'), hi: audio('Konark_Chariot_Wheel_Hindi.mp3') },
    hotspots: [{ id: 'hub', position: [0, 1, 0], title: 'Central hub', description: 'The hub anchors the wheel’s radial composition.' }, { id: 'spokes', position: [0.6, 1.2, 0], title: 'Spokes', description: 'Repeated spokes create a rhythm of light and shadow.' }, { id: 'rim', position: [0, 2, 0], title: 'Ornamented rim', description: 'Look closely at the carved outer band.' }],
    sections: { about: 'A wheel from the visual language of the Konark Sun Temple.', culturalSignificance: 'It is often read as a poetic measure of time and the movement of the sun.', craftAndTradition: 'Stone carvers balanced structural clarity with densely patterned ornament.', symbolism: 'The circle suggests continuity, motion and the solar cycle.', didYouKnow: 'The wheel is one of Konark’s most recognisable cultural symbols.', whatToNotice: 'Compare the hub, spokes and outer rim as three nested patterns.' }
  },
  {
    id: 'nandighosa-chariot', name: 'Nandighosa Chariot', category: 'Festivals & Traditions', subcategory: 'Rath Yatra', region: 'Puri, Odisha', tradition: 'Jagannath Rath Yatra', associatedHeritage: 'Jagannath Temple / Rath Yatra',
    shortDescription: 'A richly decorated chariot form connected with the living Rath Yatra tradition.',
    description: 'Nandighosa is the principal chariot associated with Lord Jagannath during the annual Puri Rath Yatra.',
    material: 'Wood and painted fabric', tags: ['Puri', 'Odisha', 'chariot', 'festival'],
    model: model('ornate temple cart 3d model.glb'), image: '/assets/museum/nandighosha-chariot.jpg',
    narration: { en: audio('Nandighosa_Chariot_English.mp3'), hi: audio('Nandighosa_Chariot_Hindi.mp3') },
    hotspots: [{ id: 'wheels', position: [0, .3, 1], title: 'Large wheels', description: 'The wheels carry the chariot through the public procession.' }, { id: 'canopy', position: [0, 2, 0], title: 'Canopy', description: 'Layered textiles and colour make the chariot visible from afar.' }, { id: 'carving', position: [.6, 1, 0], title: 'Decorative details', description: 'Painted and carved elements turn a vehicle into a moving shrine.' }],
    sections: { about: 'A digital study of the Nandighosa chariot form.', culturalSignificance: 'Rath Yatra brings temple ritual into the public streets and shared civic space.', craftAndTradition: 'The chariots are rebuilt as a living annual craft tradition.', symbolism: 'Movement expresses divine presence and community participation.', didYouKnow: 'The chariot is made for the festival rather than preserved as a static object.', whatToNotice: 'Notice the relationship between the wheels, platform and canopy.' }
  },
  {
    id: 'purulia-chhau-mask', name: 'Purulia Chhau Mask', category: 'Folk Arts', subcategory: 'Performing arts', region: 'Purulia, West Bengal', tradition: 'Chhau',
    shortDescription: 'A vivid performance mask made for the energetic Chhau dance tradition.',
    description: 'Purulia Chhau masks transform dancers into characters from regional performance stories.',
    material: 'Paper, clay and natural fibre', tags: ['Purulia', 'West Bengal', 'mask', 'dance'],
    model: model('Chhau Mask.glb'), image: '/assets/museum/chhau-mask.jpg',
    narration: { en: audio('Purulia Chhau Mask_English.mp3'), hi: audio('Purulia Chhau Mask_Hindi.mp3') },
    hotspots: [{ id: 'eyes', position: [0, 1, 1], title: 'Eyes', description: 'Bold eyes read clearly under stage light and at a distance.' }, { id: 'crown', position: [0, 1.7, 0], title: 'Decorative crown', description: 'Layered decoration gives the character a dramatic silhouette.' }, { id: 'surface', position: [.5, .8, 1], title: 'Painted surface', description: 'Colour and pattern help communicate character and mood.' }],
    sections: { about: 'A mask designed to be animated by the dancer who wears it.', culturalSignificance: 'Chhau joins music, movement, costume and craft in a shared performance tradition.', craftAndTradition: 'Mask makers build light, expressive forms and finish them with bold colour.', symbolism: 'Facial exaggeration makes a story legible through movement.', didYouKnow: 'Purulia Chhau is known for its powerful masks and athletic movement vocabulary.', whatToNotice: 'Study how the eyes and crown frame the performer’s body.' }
  },
  {
    id: 'rajasthani-kavad', name: 'Rajasthani Kavad', category: 'Traditional Crafts', subcategory: 'Storytelling object', region: 'Rajasthan', tradition: 'Kavad storytelling', associatedHeritage: 'Rajasthani oral storytelling',
    shortDescription: 'A painted wooden storytelling shrine that unfolds through doors and panels.',
    description: 'Kavad traditions use a portable, painted object as a stage for oral histories and devotional stories.',
    material: 'Painted wood', tags: ['Rajasthan', 'kavad', 'storytelling', 'craft'],
    model: model('Kavad-Rajastham-2.glb'), image: '/assets/museum/kavad.jpg',
    narration: { en: audio('Rajasthani Kavad English.mp3'), hi: audio('Rajasthani Kavad Hindi.mp3') },
    hotspots: [{ id: 'panels', position: [0, 1, .5], title: 'Painted panels', description: 'Each panel can hold a scene, figure or visual cue for the narrator.' }, { id: 'doors', position: [.7, 1, 0], title: 'Opening doors', description: 'The unfolding structure reveals stories gradually.' }, { id: 'base', position: [0, .2, 0], title: 'Wooden body', description: 'The compact form is made to travel with the storyteller.' }],
    sections: { about: 'A portable object that brings visual art into oral storytelling.', culturalSignificance: 'Kavad performances preserve memory by bringing listeners into a shared story.', craftAndTradition: 'Painters and makers work together so the object and narration support one another.', symbolism: 'Opening a door becomes an invitation to discover another chapter.', didYouKnow: 'A Kavad can be read as both a shrine and a portable story world.', whatToNotice: 'Look for the sequence created by its doors and painted faces.' }
  },
  {
    id: 'nandi-bull', name: 'Nandi Bull', category: 'Sculpture', subcategory: 'Temple sculpture', region: 'Bhubaneswar, Odisha', tradition: 'Odisha temple sculpture', associatedHeritage: 'Lingaraj Temple',
    shortDescription: 'A devotional bull sculpture linked with the temple landscapes of Odisha.',
    description: 'Nandi, Shiva’s mount and attendant, appears in a wide range of living temple traditions across India.',
    material: 'Stone', tags: ['Bhubaneswar', 'Odisha', 'Nandi', 'temple'],
    model: model('Lingraja Bull.glb'), image: '/assets/museum/nandi-bull.jpg',
    narration: { en: audio('Nandi Bull english.mp3'), hi: audio('Nandi Bail Hindi.mp3') },
    hotspots: [{ id: 'horns', position: [0, 1, .7], title: 'Horns', description: 'The paired horns frame the face and signal the animal’s alert presence.' }, { id: 'ornaments', position: [0, .8, 0], title: 'Neck ornaments', description: 'Carved adornment brings reverence to the animal form.' }, { id: 'posture', position: [0, .3, 0], title: 'Seated posture', description: 'The calm seated pose conveys watchfulness and devotion.' }],
    sections: { about: 'A sculptural expression of Nandi’s place in Shaiva temple worship.', culturalSignificance: 'Nandi is a familiar presence at Shiva temples and a focus for devotion.', craftAndTradition: 'The sculptor gives a monumental animal a sense of calm, weight and attention.', symbolism: 'The seated bull represents devotion, strength and patient guardianship.', didYouKnow: 'Nandi is traditionally placed facing the sanctum in many Shiva temples.', whatToNotice: 'Observe the balance between the massive body and attentive face.' }
  },
  {
    id: 'kathputli', name: 'Rajasthani Kathputli', category: 'Performing Arts', subcategory: 'Traditional puppetry', region: 'Rajasthan', tradition: 'Kathputli puppetry',
    shortDescription: 'A colourful string puppet from Rajasthan’s travelling performance tradition.',
    description: 'Kathputli combines carved wood, painted features, textiles and music in a lively form of folk theatre.',
    material: 'Wood, cloth and thread', tags: ['Rajasthan', 'puppet', 'folk theatre', 'textiles'],
    model: model('kathputli-rajasthan.glb'), image: '/assets/museum/kathputli.jpg',
    narration: { en: audio('Kathputli_English.mp3'), hi: audio('Kathputli_Hindi.mp3') },
    hotspots: [{ id: 'face', position: [0, 1.2, .5], title: 'Painted face', description: 'Exaggerated features remain readable during performance.' }, { id: 'costume', position: [0, .7, 0], title: 'Costume', description: 'Bright textiles give the puppet movement and character.' }, { id: 'strings', position: [0, 1.8, 0], title: 'Strings', description: 'The puppeteer’s strings translate small gestures into dance.' }],
    sections: { about: 'A digital view of a Rajasthani string puppet.', culturalSignificance: 'Kathputli carries local stories and performance skills across generations.', craftAndTradition: 'Wood carving, painting, costume and puppetry work as one craft ecosystem.', symbolism: 'The puppet turns a simple figure into a character through motion and voice.', didYouKnow: 'Kathputli literally refers to a wooden puppet in the Rajasthani tradition.', whatToNotice: 'See how the costume, face and strings collaborate to make movement.' }
  }
];

export const museumCategories = [...new Set(MUSEUM_ARTIFACTS.map((a) => a.category))];
export const museumRegions = [...new Set(MUSEUM_ARTIFACTS.map((a) => a.region))];
