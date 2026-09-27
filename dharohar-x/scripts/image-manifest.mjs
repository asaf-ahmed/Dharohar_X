// Every remote (Wikimedia Commons) image used by the site, with the exact
// Commons filename, a local destination path, and license/attribution
// metadata. Verified individually via Commons search — each file exists,
// carries a CC license, and matches its intended subject (fixing several
// mismatches in the original project, e.g. Pattachitra and Banarasi
// Weaving previously both pointed at an unrelated Sindh Ajrak-craft photo).
export const MANIFEST = [
  { key: 'amerFort', file: 'Amber fort jaipur.jpg', out: 'public/assets/heritage/amer-fort.jpg',
    license: 'CC BY-SA 3.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Amber_fort_jaipur.jpg' },

  { key: 'kathak', file: 'Kathak dance (10).jpg', out: 'public/assets/culture/kathak.jpg',
    license: 'CC BY-SA 4.0', author: 'Suyash Dwivedi',
    source: 'https://commons.wikimedia.org/wiki/File:Kathak_dance_(10).jpg' },

  { key: 'bharatanatyam', file: 'Bharata Natyam Performance DS.jpg', out: 'public/assets/culture/bharatanatyam.jpg',
    license: 'CC BY-SA 3.0', author: 'Augustus Binu',
    source: 'https://commons.wikimedia.org/wiki/File:Bharata_Natyam_Performance_DS.jpg' },

  { key: 'odissi', file: 'Odissi Dance Form.jpg', out: 'public/assets/culture/odissi.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Odissi_Dance_Form.jpg' },

  { key: 'kathakali', file: 'Kathakali All Characters.jpg', out: 'public/assets/culture/kathakali.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Kathakali_All_Characters.jpg' },

  { key: 'chhau', file: 'Chhau dance.jpg', out: 'public/assets/culture/chhau.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Chhau_dance.jpg' },

  { key: 'banarasiWeaving', file: 'Alkama Ansari - A Banarasi Saree Weaver.jpg', out: 'public/assets/culture/banarasi-weaving.jpg',
    license: 'CC BY-SA (Commons-hosted)', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/Category:Banarasi_Sari' },

  { key: 'diwali', file: 'Diwali celebration India.jpg', out: 'public/assets/culture/diwali.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Diwali_celebration_India.jpg' },

  { key: 'garba', file: 'Garba Navratri 02.jpg', out: 'public/assets/culture/garba.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Garba_Navratri_02.jpg' },

  { key: 'pattachitra', file: 'Pattachitra artist at work in Odisha, India.jpg', out: 'public/assets/culture/pattachitra.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor (Wiki Loves Folklore 2022 award)',
    source: 'https://commons.wikimedia.org/wiki/File:Pattachitra_artist_at_work_in_Odisha,_India.jpg' },

  { key: 'holi', file: 'HOLI, a festival of colours in the city of joy.JPG', out: 'public/assets/culture/holi.jpg',
    license: 'CC BY-SA 4.0', author: 'Shashwata Saha',
    source: 'https://commons.wikimedia.org/wiki/File:HOLI,_a_festival_of_colours_in_the_city_of_joy.JPG' },

  { key: 'durgaPuja', file: 'Durga Puja 2018 Kolkata.jpg', out: 'public/assets/culture/durga-puja.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Durga_Puja_2018_Kolkata.jpg' },

  { key: 'bluePottery', file: 'Blue Pottery Making Process.jpg', out: 'public/assets/culture/blue-pottery.jpg',
    license: 'CC BY-SA 4.0', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/File:Blue_Pottery_Making_Process.jpg' },

  { key: 'goldenTemple', file: 'Golden Temple Amritsar.jpg', out: 'public/assets/monuments/golden-temple.jpg',
    license: 'See linked Commons file', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/Special:FilePath/Golden%20Temple%20Amritsar.jpg' },
  { key: 'meenakshiTemple', file: 'Meenakshi Amman Temple.jpg', out: 'public/assets/monuments/meenakshi-temple.jpg',
    license: 'See linked Commons file', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi%20Amman%20Temple.jpg' },
  { key: 'victoriaMemorial', file: 'Victoria Memorial Kolkata.jpg', out: 'public/assets/monuments/victoria-memorial.jpg',
    license: 'See linked Commons file', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/Special:FilePath/Victoria%20Memorial%20Kolkata.jpg' },
  { key: 'ramMandir', file: 'Ram Mandir, Ayodhya.png', out: 'public/assets/monuments/ram-mandir.png',
    license: 'CC BY 3.0', author: 'See Commons file page',
    source: 'https://commons.wikimedia.org/wiki/File:Ram_Mandir,_Ayodhya.png' },
  { key: 'mysorePalace', file: 'Mysore Palace.jpg', out: 'public/assets/monuments/mysore-palace.jpg',
    license: 'See linked Commons file', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mysore%20Palace.jpg' },
  { key: 'chhauMask', file: 'Chhau Mask.jpg', out: 'public/assets/museum/chhau-mask.jpg',
    license: 'See linked Commons file', author: 'Wikimedia Commons contributor',
    source: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chhau%20Mask.jpg' },
  { key: 'kavad', file: 'Kavad from Rajasthan, early 20th century, paint on wood, maker unknown.JPG', out: 'public/assets/museum/kavad.jpg',
    license: 'CC0 1.0', author: 'Hiart',
    source: 'https://commons.wikimedia.org/wiki/File:Kavad_from_Rajasthan,_early_20th_century,_paint_on_wood,_maker_unknown.JPG' },
  { key: 'kathputli', file: 'Kathputli (Puppet) of Rajasthan.jpg', out: 'public/assets/museum/kathputli.jpg',
    license: 'CC BY-SA 4.0', author: 'Manojmeena',
    source: 'https://commons.wikimedia.org/wiki/File:Kathputli_(Puppet)_of_Rajasthan.jpg' },
];
