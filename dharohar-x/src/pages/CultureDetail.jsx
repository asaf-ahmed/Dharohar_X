import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Clock3, MapPin, Pause, Play, RotateCcw, Volume2, X } from 'lucide-react';
import { Page } from '../components/Layout';
import Photo from '../components/Photo';
import { CULTURES, cultureBySlug } from '../data/culture';
import { MUSEUM_ARTIFACTS } from '../data/museumArtifacts';

function AudioPlayer({ narration }) {
  const [lang, setLang] = useState('en');
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const src = narration?.[lang];
  const isSample = lang === 'en' ? !!narration?.sampleEn : !!narration?.sampleHi;

  useEffect(() => { setLang('en'); setPlaying(false); }, [narration]);

  const changeLang = (next) => {
    audio.current?.pause();
    if (audio.current) audio.current.currentTime = 0;
    setPlaying(false);
    setLang(next);
  };

  const toggle = async () => {
    if (!audio.current) return;
    if (audio.current.paused) await audio.current.play();
    else audio.current.pause();
  };

  return (
    <div className="humanAudio">
      <div className="audioTop">
        <div className="languagePills">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>English</button>
          <button className={lang === 'hi' ? 'active' : ''} onClick={() => changeLang('hi')}>हिन्दी</button>
        </div>
        <span><Volume2 size={14} /> {isSample ? 'Sample audio' : 'Human narration'}</span>
      </div>
      {isSample && <div className="audioDemoNote"><b>Sample audio</b> — a neutral placeholder sound is used because a tradition-specific recording was not supplied. No other tradition's narration is being used.</div>}
      <audio ref={audio} src={src} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} controls preload="metadata" />
      <div className="audioActions">
        <button className="audioMain" onClick={toggle}>{playing ? <Pause size={17} /> : <Play size={17} />}{playing ? 'Pause' : 'Play'}</button>
        <button onClick={() => { if (audio.current) { audio.current.currentTime = 0; audio.current.play(); } }}><RotateCcw size={15} /> Restart</button>
      </div>
    </div>
  );
}

function VideoPanel({ item, onOpen }) {
  if (!item.video) return <div className="mediaUnavailable"><div><div className="eyebrow clay">VIDEO</div><h3>No verified video attached yet</h3><p>This section is intentionally kept unavailable until a real source is configured.</p></div></div>;
  return <div className="videoPanel"><button onClick={onOpen} className="videoPreview"><Photo src={item.images[0]} alt={`${item.title} video preview`} /><span><Play size={18} fill="currentColor" /> Watch verified video</span></button><small>Verified video source for {item.title}</small></div>;
}

export default function CultureDetail({ onSearch }) {
  const { slug = 'kathak' } = useParams();
  const item = cultureBySlug(slug);
  const [stage, setStage] = useState(0);
  const [tab, setTab] = useState('Story');
  const [showVideo, setShowVideo] = useState(false);
  const related = CULTURES.filter(c => c.slug !== item.slug && c.category === item.category).slice(0, 3);
  const museum = item.museumArtifactId ? MUSEUM_ARTIFACTS.find(a => a.id === item.museumArtifactId) : null;
  const process = item.process?.length ? item.process : ['Observe', 'Practice', 'Pass it on'];
  const stageText = [
    item.story,
    `The tradition is carried through teaching, repetition and community practice. Notice ${item.features[0].toLowerCase()} and ${item.features[1].toLowerCase()}.`,
    `The visible form is connected to people, place, materials and memory. ${item.features.slice(2).join(' and ')} help define its character.`
  ];
  const tabs = ['Story', 'Images', ...(item.video ? ['Video'] : []), 'Significance'];

  return <Page onSearch={onSearch}>
    <main className="shell culturePage">
      <div className="breadcrumb"><Link to="/culture">Culture & Traditions</Link><span>/</span><span>{item.category}</span><span>/</span><strong>{item.title}</strong></div>

      <section className="cultureLead">
        <div className="cultureLeadCopy">
          <div className="eyebrow clay">{item.category.toUpperCase()}</div>
          <h1>{item.title}</h1>
          <div className="location"><MapPin size={15} />{item.region}</div>
          <p className="leadSummary">{item.summary}</p>
          <div className="detailActions"><Link className="btn outline" to="/culture">Back to Culture <ArrowRight size={15} /></Link></div>
        </div>
        <Photo src={item.images[0]} alt={item.title} className="cultureLeadPhoto" />
      </section>

      <nav className="cultureTabs" aria-label="Tradition sections">
        {tabs.map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </nav>

      {tab === 'Story' && <section className="cultureStory">
        <div><div className="eyebrow clay">THE STORY</div><h2>Where the tradition lives</h2><p>{item.story}</p><div className="storyFacts">{item.features.map((f,i)=><div key={f}><span>0{i+1}</span><b>{f}</b></div>)}</div></div>
        <Photo src={item.images[1] || item.images[0]} alt={`${item.title} detail`} />
      </section>}

      {tab === 'Images' && <section className="imageGallery imageGalleryExpanded">{item.images.map((src,i)=><figure key={src}><Photo src={src} alt={`${item.title} — image ${i+1}`} /><figcaption>{i === 0 ? 'Featured view' : `Detail view ${i}`}</figcaption></figure>)}</section>}

      {tab === 'Video' && <section className="singleVideo"><VideoPanel item={item} onOpen={() => setShowVideo(true)} /></section>}

      {tab === 'Significance' && <section className="cultureStory">
        <div><div className="eyebrow clay">WHY IT MATTERS</div><h2>Living knowledge, not a static object</h2><p>{item.story}</p><p>As a living cultural practice, {item.title} connects skills, community participation and regional identity. The experience separates documented information from optional media so every control has a clear purpose.</p></div>
        <Photo src={item.images[item.images.length - 1]} alt={`${item.title} significance`} />
      </section>}

      <section className="motionExperience">
        <div className="motionHeader"><div><div className="eyebrow clay">TRADITION IN MOTION</div><h2>Watch, listen and discover</h2><p>Three short stages keep the story clear and easy to explore.</p></div><span className="motionBadge"><Volume2 size={15} /> Narration below</span></div>
        <div className="motionGrid">
          <div className="motionVisual"><Photo src={item.images[stage % item.images.length]} alt={`${item.title} stage ${stage+1}`} /><span className="motionCounter">0{stage+1} / 03</span></div>
          <div className="motionStages">
            {['Origins','Practice','Meaning'].map((name,i)=><button key={name} className={stage===i?'active':''} onClick={()=>setStage(i)}>
              <span className="stageNumber">0{i+1}</span><div className="stageCopy"><b>{name}</b><strong>{i===0?`Where ${item.title} comes from`:i===1?'How people carry it forward':'What to notice'}</strong><p>{stageText[i]}</p></div>
            </button>)}
          </div>
        </div>
      </section>

      <section className="cultureImmersion">
        <div className="mediaCard"><div className="eyebrow clay">WATCH</div><h2>See the practice</h2><VideoPanel item={item} onOpen={() => setShowVideo(true)} /></div>
        <div className="mediaCard"><div className="eyebrow clay">LISTEN</div><h2>Hear its story</h2><AudioPlayer narration={item.narration} /></div>
      </section>

      <section className="processBlock">
        <div className="processHeading"><div><div className="eyebrow clay">HOW IT IS PRACTISED</div><h2>From knowledge to practice</h2><p>Follow the process one stage at a time.</p></div></div>
        <div className="processSteps">{process.map((x,i)=><button className={stage === i % 3 ? 'active' : ''} onClick={()=>setStage(i%3)} key={x}><span>0{i+1}</span><b>{x}</b></button>)}</div>
        <div className="processReveal"><Clock3 size={17} /><div><b>{process[stage % process.length]}</b><p>{item.features[stage % item.features.length]} is one of the details that makes the practice recognisable and teachable.</p></div></div>
      </section>

      {museum && <section className="cultureBridge"><div><div className="eyebrow clay">TAKE THE STORY FURTHER</div><h2>From living tradition to museum object</h2><p>{museum.shortDescription}</p></div><Link className="btn" to={`/museum/${museum.id}`}>Explore in Museum <ArrowRight size={15} /></Link></section>}

      {related.length > 0 && <section className="cultureRelated"><div className="sectionTitleRow"><div><div className="eyebrow clay">CONTINUE EXPLORING</div><h2>Related traditions</h2></div><Link className="textLink" to="/culture">View all <ArrowRight size={14} /></Link></div><div className="cultureGrid">{related.map(c=><Link key={c.slug} to={`/culture/${c.slug}`} className="cultureCard"><div className="cultureImageWrap"><Photo src={c.images[0]} alt={c.title}/><span className="imageTag">{c.category}</span></div><div><div className="cultureMeta"><MapPin size={12}/>{c.region}</div><h3>{c.title}</h3><p>{c.summary}</p><span className="cardLink">Explore tradition <ArrowRight size={13}/></span></div></Link>)}</div></section>}
    </main>
    {showVideo && item.video && <div className="videoOverlay" onClick={()=>setShowVideo(false)}><div className="videoModal" onClick={e=>e.stopPropagation()}><button className="videoClose" onClick={()=>setShowVideo(false)} aria-label="Close"><X/></button><iframe src={`${item.video}?autoplay=1&rel=0`} title={`${item.title} cultural video`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div></div>}
  </Page>;
}
