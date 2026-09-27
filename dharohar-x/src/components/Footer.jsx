import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Github, Youtube, Instagram, Linkedin, Archive, HeartHandshake, Share2, Sparkles,
  ExternalLink, Send, CheckCircle2,
} from 'lucide-react';
import { IMG } from '../data/images';

export function PreserveBand() {
  return (
    <section className="preserve">
      <div className="shell preserveInner">
        <div>
          <div className="eyebrow onDark">PRESERVE TODAY</div>
          <h2>FOR TOMORROW</h2>
          <p>Be a part of the movement to document, protect and celebrate our heritage.</p>
        </div>
        <Link className="joinBtn" to="/about">Join the Community <ArrowRight size={18} /></Link>
        <div className="preserveActions">
          <Link to="/about"><Archive />Document Heritage</Link>
          <Link to="/about"><HeartHandshake />Support Conservation</Link>
          <Link to="/explore"><Share2 />Share Stories</Link>
          <Link to="/about"><Sparkles />Inspire Change</Link>
        </div>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <div>
      <b>Subscribe for updates</b>
      <form className="footerNewsletter" onSubmit={submit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button type="submit" aria-label="Subscribe">
          {sent ? <CheckCircle2 size={17} /> : <Send size={15} />}
        </button>
      </form>
      <p className="newsletterNote">{sent ? 'Subscribed — welcome to Dharohar X.' : 'Heritage stories, new AR drops, no spam.'}</p>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <PreserveBand />
      <footer>
        <div className="footerTop shell">
          <div className="footerBrand">
            <div className="footerLogo"><img src={IMG.icon} alt="" /><span>Dharohar X</span></div>
            <p>Heritage, technology, people. For a richer, more inclusive tomorrow.</p>
            <div className="socials">
              <a href="https://github.com/asaf-ahmed/Dharohar--X" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={16} /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
            </div>
          </div>
          <div>
            <b>Explore</b>
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/heritage">Heritage</Link>
            <Link to="/culture">Culture & Traditions</Link>
            <Link to="/ar">AR Experiences</Link>
          </div>
          <div>
            <b>Support</b>
            <Link to="/about">About Us</Link>
            <a href="mailto:hello@dharoharx.in">Contact</a>
            <Link to="/about#contribute">Contribute</Link>
            <Link to="/about#privacy">Privacy Policy</Link>
            <Link to="/about#terms">Terms</Link>
            <a href="/SOURCES-AND-LICENSES.txt">Sources & Credits <ExternalLink size={11} /></a>
          </div>
          <NewsletterForm />
        </div>
        <div className="copyright shell">
          <span>© 2026 Dharohar X. All rights reserved.</span>
          <span>Made with ♥ for India's heritage.</span>
        </div>
      </footer>
    </>
  );
}
