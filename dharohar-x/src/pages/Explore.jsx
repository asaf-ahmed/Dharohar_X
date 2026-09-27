import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search, MapPin, Navigation, Sparkles, Landmark, ArrowUpRight, X,
  ExternalLink, Compass, RotateCcw, ListFilter, LocateFixed, Info,
  ChevronRight, Layers3, BookOpen, Map as MapIcon
} from 'lucide-react';
import { Page } from '../components/Layout';
import { IMG } from '../data/images';
import Photo from '../components/Photo';

const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14017.522841018641!2d77.1370109!3d28.558328449999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1790397864377!5m2!1sen!2sin';
const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();
const hasGoogleMapsApiKey = GOOGLE_MAPS_API_KEY && !/^your(?:_|-)?.*key/i.test(GOOGLE_MAPS_API_KEY);

const PLACES = [
  { id:'taj', title:'Taj Mahal', place:'Agra, Uttar Pradesh', image:IMG.taj, lat:27.1751, lng:78.0421, type:'monuments', tag:'UNESCO', story:'A marble masterpiece of Mughal architecture and one of India’s most recognised heritage landmarks.' },
  { id:'konark', title:'Konark Sun Temple', place:'Konark, Odisha', image:IMG.konark, lat:19.8876, lng:86.0945, type:'monuments', tag:'Temple', story:'A monumental 13th-century temple designed as the chariot of the Sun God.' },
  { id:'hampi', title:'Hampi Ruins', place:'Hampi, Karnataka', image:IMG.hampi, lat:15.3350, lng:76.4600, type:'monuments', tag:'UNESCO', story:'The atmospheric ruins of Vijayanagara, spread across boulders, temples and ancient market streets.' },
  { id:'amer', title:'Amer Fort', place:'Jaipur, Rajasthan', image:'/assets/heritage/amer-fort.jpg', lat:26.9855, lng:75.8513, type:'monuments', tag:'Fort', story:'A hilltop fort known for its courtyards, gateways, mirrored halls and Rajput-Mughal architecture.' },
  { id:'qutub', title:'Qutub Minar', place:'Delhi', image:IMG.qutub, lat:28.5245, lng:77.1855, type:'monuments', tag:'UNESCO', story:'A soaring medieval minaret and archaeological complex in Mehrauli, Delhi.' },
  { id:'ajanta', title:'Ajanta Caves', place:'Aurangabad, Maharashtra', image:'/assets/explore/ajanta-caves.jpg', lat:20.5519, lng:75.7033, type:'monuments', tag:'UNESCO', story:'Rock-cut Buddhist caves celebrated for their murals, sculptures and ancient monastic spaces.' },
  { id:'sanchi', title:'Sanchi Stupa', place:'Sanchi, Madhya Pradesh', image:'/assets/explore/sanchi-stupa.jpg', lat:23.4793, lng:77.7397, type:'monuments', tag:'UNESCO', story:'An ancient Buddhist complex centred on the Great Stupa and its carved gateways.' },
  { id:'redfort', title:'Red Fort', place:'Delhi', image:'/assets/explore/red-fort.jpg', lat:28.6562, lng:77.2410, type:'monuments', tag:'UNESCO', story:'A Mughal-era red sandstone fort complex at the historic heart of Old Delhi.' },
  { id:'mahabali', title:'Mahabalipuram', place:'Tamil Nadu', image:'/assets/explore/mahabalipuram.jpg', lat:12.6169, lng:80.1927, type:'monuments', tag:'UNESCO', story:'A coastal group of Pallava-era temples and rock-cut monuments.' },
  { id:'brihadeeswara', title:'Brihadeeswara Temple', place:'Thanjavur, Tamil Nadu', image:'/assets/explore/brihadeeswara-temple.jpg', lat:10.7828, lng:79.1318, type:'monuments', tag:'Temple', story:'A monumental Chola temple known for its soaring vimana and granite craftsmanship.' },
];

const CATEGORIES = [
  { id:'all', label:'All Heritage', icon:Landmark },
  { id:'monuments', label:'Monuments', icon:Landmark },
  { id:'unesco', label:'UNESCO', icon:BookOpen },
  { id:'temples', label:'Temples', icon:Sparkles },
];

export default function Explore({ onSearch }){
  const mapRef = useRef(null);
  const mapObj = useRef(null);
  const mapAuthFailed = useRef(false);
  const markersRef = useRef([]);
  const infoRef = useRef(null);
  const [query,setQuery] = useState('');
  const [category,setCategory] = useState('all');
  const [selected,setSelected] = useState(PLACES[0]);
  const [showAll,setShowAll] = useState(false);
  const [mapReady,setMapReady] = useState(false);
  const [mapError,setMapError] = useState('');
  const [view,setView] = useState('map');

  const filtered = useMemo(()=>{
    const q=query.trim().toLowerCase();
    return PLACES.filter(p=>{
      const categoryMatch = category==='all' || p.type===category || (category==='unesco' && p.tag==='UNESCO') || (category==='temples' && p.tag==='Temple');
      const textMatch = !q || `${p.title} ${p.place} ${p.tag}`.toLowerCase().includes(q);
      return categoryMatch && textMatch;
    });
  },[query,category]);

  const visible = showAll ? filtered : filtered.slice(0,6);

  const selectPlace=(place, focus=true)=>{
    setSelected(place);
    if(focus && mapObj.current){
      mapObj.current.panTo({lat:place.lat,lng:place.lng});
      mapObj.current.setZoom(7);
      const marker=markersRef.current.find(m=>m.__placeId===place.id);
      if(marker) marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(()=>marker?.setAnimation(null),900);
      if(infoRef.current){
        infoRef.current.setContent(infoHTML(place));
        infoRef.current.open({map:mapObj.current,anchor:marker});
      }
    }
  };

  const infoHTML=(p)=>`<div style="font-family:Arial,sans-serif;min-width:210px;padding:4px 2px"><div style="font-size:16px;font-weight:800;color:#173246">${p.title}</div><div style="font-size:12px;color:#65717a;margin:5px 0 10px">${p.place}</div><div style="font-size:11px;color:#b85d32;font-weight:800;text-transform:uppercase;letter-spacing:.08em">${p.tag}</div></div>`;

  useEffect(()=>{
    if(!hasGoogleMapsApiKey){
      setMapError('Configure VITE_GOOGLE_MAPS_API_KEY in dharohar-x/.env.local to enable the interactive Google map.');
      return;
    }
    let cancelled=false;
    mapAuthFailed.current=false;
    const previousAuthFailure=window.gm_authFailure;
    const handleAuthFailure=()=>{
      mapAuthFailed.current=true;
      if(!cancelled){
        setMapReady(false);
        setMapError('Google Maps rejected this API key. Showing the interactive OpenStreetMap fallback.');
      }
    };
    window.gm_authFailure=handleAuthFailure;
    import('@googlemaps/js-api-loader').then(({ Loader })=>{
      if (cancelled) return;
      if (!Loader) throw new Error('Google Maps loader is unavailable.');
      const loader=new Loader({apiKey:GOOGLE_MAPS_API_KEY,version:'weekly'});
      return loader.load().then(()=>{
        if(cancelled || mapAuthFailed.current || !mapRef.current) return;
        const map=new window.google.maps.Map(mapRef.current,{
          center:{lat:22.8,lng:79.2}, zoom:5, mapTypeControl:false, streetViewControl:false,
          fullscreenControl:true, gestureHandling:'greedy', styles:[
            {elementType:'geometry',stylers:[{color:'#f4eee4'}]},
            {elementType:'labels.text.fill',stylers:[{color:'#5c5b57'}]},
            {elementType:'labels.text.stroke',stylers:[{color:'#f4eee4'}]},
            {featureType:'water',elementType:'geometry',stylers:[{color:'#d8e5e3'}]},
            {featureType:'road',elementType:'geometry',stylers:[{color:'#e6dfd3'}]},
            {featureType:'road.highway',elementType:'geometry',stylers:[{color:'#d4c5b3'}]},
            {featureType:'poi',stylers:[{visibility:'off'}]},
          ]
        });
        mapObj.current=map;
        infoRef.current=new window.google.maps.InfoWindow();
        const bounds=new window.google.maps.LatLngBounds();
        PLACES.forEach((p,i)=>{
          const marker=new window.google.maps.Marker({position:{lat:p.lat,lng:p.lng},map,title:p.title,label:{text:String(i+1),color:'#fff',fontWeight:'800'},icon:{path:window.google.maps.SymbolPath.CIRCLE,scale:15,fillColor:p.accent || '#2452b8',fillOpacity:1,strokeColor:'#fff',strokeWeight:3}});
          marker.__placeId=p.id;
          marker.addListener('click',()=>selectPlace(p,false));
          markersRef.current.push(marker); bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds,{top:45,right:45,bottom:45,left:45});
        setMapReady(true);
      });
    }).catch(err=>setMapError(err?.message || 'Google Maps could not load.'));
    return ()=>{
      cancelled=true;
      if(window.gm_authFailure===handleAuthFailure){
        if(previousAuthFailure) window.gm_authFailure=previousAuthFailure;
        else delete window.gm_authFailure;
      }
      markersRef.current.forEach(m=>m.setMap(null));
      markersRef.current=[];
    };
  },[]);

  useEffect(()=>{
    if(!mapReady) return;
    markersRef.current.forEach(marker=>{
      const p=PLACES.find(x=>x.id===marker.__placeId);
      const visible=filtered.some(x=>x.id===p.id);
      marker.setVisible(visible);
    });
    if(selected && !filtered.some(x=>x.id===selected.id) && filtered[0]) selectPlace(filtered[0]);
  },[filtered,mapReady]);

  const directions=()=>{
    if(!selected) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${selected.lat},${selected.lng}`)}`,'_blank','noopener,noreferrer');
  };

  const fallbackMapUrl = selected
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${(selected.lng-2.5).toFixed(4)}%2C${(selected.lat-1.7).toFixed(4)}%2C${(selected.lng+2.5).toFixed(4)}%2C${(selected.lat+1.7).toFixed(4)}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`
    : 'https://www.openstreetmap.org/export/embed.html?bbox=67%2C6%2C99%2C37&layer=mapnik';

  const reset=()=>{setQuery('');setCategory('all');setShowAll(false);if(mapObj.current){mapObj.current.fitBounds(new window.google.maps.LatLngBounds({lat:10,lng:68},{lat:35,lng:97}),{top:35,right:35,bottom:35,left:35});}};

  const useSelected=()=>{ if(!selected) return; selectPlace(selected); };

  return <Page onSearch={onSearch} className="explorePage">
    <main>
      <section className="hero" id="discover">
        <div className="heroPattern"/>
        <div className="heroInner">
          <div className="eyebrow light">DHAROHAR X • EXPLORE INDIA</div>
          <h1>Every place has<br/><em>a story.</em></h1>
          <p>Discover India's monuments, sacred spaces and living heritage — then follow each story on the map.</p>
          <form className="heroSearch" onSubmit={e=>{e.preventDefault();document.getElementById('map')?.scrollIntoView({behavior:'smooth'});}}>
            <Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Taj Mahal, Konark, Amer Fort…"/><button type="submit">Explore <ArrowUpRight size={17}/></button>
            {query && <button className="searchClear" type="button" onClick={()=>setQuery('')}><X size={17}/></button>}
          </form>
          <div className="heroStats"><span><b>{PLACES.length}</b> heritage places</span><i/> <span><b>28+</b> states & regions</span><i/> <span><b>1</b> living heritage journey</span></div>
        </div>
      </section>

      <section className="discoverSection" id="map">
        <div className="sectionHead">
          <div><div className="eyebrow">EXPLORE BY EXPERIENCE</div><h2>Travel from map to memory</h2><p>Choose a heritage place, watch it come alive on the map, and open its story.</p></div>
          <div className="viewToggle"><button className={view==='map'?'active':''} onClick={()=>setView('map')}><MapIcon size={15}/> Map</button><button className={view==='list'?'active':''} onClick={()=>setView('list')}><ListFilter size={15}/> Places</button></div>
        </div>

        <div className="filterRow">
          <div className="filterLabel"><Layers3 size={15}/> Filter heritage</div>
          <div className="pills">{CATEGORIES.map(({id,label,icon:Icon})=><button key={id} className={category===id?'active':''} onClick={()=>{setCategory(id);setShowAll(false);}}><Icon size={15}/>{label}</button>)}</div>
          {(query || category!=='all') && <button className="resetBtn" onClick={reset}><RotateCcw size={14}/> Reset</button>}
        </div>

        <div className={`exploreWorkspace ${view==='list'?'listMode':''}`}>
          <div className="mapPanel">
            <div className="panelTop"><div><span className="dot"/> <b>India Heritage Map</b><small>{filtered.length} places visible</small></div><a href="https://www.google.com/maps" target="_blank" rel="noreferrer"><ExternalLink size={14}/> Google Maps</a></div>
            <div className="mapCanvas"><div className="googleMapHost" ref={mapRef}/>{!mapReady && !mapError && <div className="mapLoading"><Compass className="spin" size={28}/><b>Preparing the heritage map…</b><span>Loading India's heritage locations</span></div>}{mapError && <><iframe className="mapEmbedFallback" title={`OpenStreetMap centered on ${selected?.title || 'India'}`} src={fallbackMapUrl} loading="lazy" /><div className="mapFallbackNote"><Info size={15}/><span>Google Maps key rejected. Showing an interactive OpenStreetMap. Add Maps JavaScript API access and allow <code>localhost:5173/*</code> in the key's website restrictions.</span><a href={`https://www.google.com/maps/search/?api=1&query=${selected?.lat || 22.8},${selected?.lng || 79.2}`} target="_blank" rel="noreferrer">Open Google Maps <ExternalLink size={13}/></a></div></>}</div>
            <div className="mapBottom"><span><b>●</b> Numbered markers match the places on the right.</span><button onClick={useSelected}><LocateFixed size={14}/> Focus selected</button></div>
          </div>

          <aside className="placePanel">
            <div className="placePanelHead"><div><div className="eyebrow">DISCOVER</div><h3>{filtered.length} heritage places</h3></div><span className="resultCount">{query ? `“${query}”` : 'India'}</span></div>
            <div className="placeScroller">{visible.map((p,i)=><button key={p.id} className={`placeCard ${selected?.id===p.id?'selected':''}`} onClick={()=>selectPlace(p)}><span className="number">{PLACES.indexOf(p)+1}</span><Photo src={p.image} alt={`${p.title}, ${p.place}`} /><span className="placeCopy"><b>{p.title}</b><small><MapPin size={11}/> {p.place}</small><em>{p.tag}</em></span><ChevronRight size={17}/></button>)}{!visible.length && <div className="empty">No heritage place matches your search.<button onClick={reset}>Reset filters</button></div>}</div>
            {filtered.length>6 && <button className="showAll" onClick={()=>setShowAll(v=>!v)}>{showAll?'Show fewer places':`See all ${filtered.length} places`} <ArrowUpRight size={15}/></button>}
          </aside>
        </div>
      </section>

      {selected && <section className="selectedStory" id="stories"><div className="storyVisual"><Photo src={selected.image} alt={`${selected.title}, ${selected.place}`} /><div className="storyBadge">{selected.tag}</div><div className="storyNumber">{String(PLACES.indexOf(selected)+1).padStart(2,'0')}</div></div><div className="storyCopy"><div className="eyebrow">SELECTED HERITAGE</div><h2>{selected.title}</h2><p className="location"><MapPin size={16}/> {selected.place}</p><p>{selected.story}</p><div className="storyActions"><button onClick={()=>{document.getElementById('map')?.scrollIntoView({behavior:'smooth'});selectPlace(selected)}}><MapPin size={15}/> Show on map</button><button onClick={directions}><Navigation size={15}/> Get directions</button><a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`} target="_blank" rel="noreferrer">Open Google Maps <ExternalLink size={14}/></a></div></div></section>}

      <section className="journey" id="culture"><div className="eyebrow">KEEP EXPLORING</div><h2>Heritage is more than a destination.</h2><div className="journeyGrid"><button onClick={()=>setCategory('monuments')}><span>01</span><b>Monuments</b><small>Architecture, ruins and sacred spaces.</small></button><button onClick={()=>document.getElementById('stories')?.scrollIntoView({behavior:'smooth'})}><span>02</span><b>Stories</b><small>History behind the places you discover.</small></button><button onClick={()=>setCategory('temples')}><span>03</span><b>Living traditions</b><small>Places where culture is still practiced.</small></button></div></section>
    </main>

  </Page>;
}
