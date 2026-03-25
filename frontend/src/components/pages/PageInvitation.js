// src/components/pages/PageInvitation.js — v2
// Final spread with interactive message form + flying paper airplane send animation.
// Left: viewer types a name + message on ruled paper, sends it
// Right: the open invitation prose + social links

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contactData from '../../data/contactData';

const { email, socialLinks } = contactData;

/* ── Animated SVG Quill (drawing itself) ─────────────────────── */
const QuillSVG = ({ size = 50 }) => {
  const pathRef = useRef(null);
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray  = len;
    path.style.strokeDashoffset = len;
    const t = setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)';
      path.style.strokeDashoffset = '0';
    }, 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <svg viewBox="0 0 60 100" width={size * 0.6} height={size} style={{ overflow: 'visible' }} aria-hidden="true">
      <path d="M30,8 C44,8 52,20 48,38 C44,56 30,72 26,86 C24,92 27,98 30,100" fill="none" stroke="var(--accent-rust)" strokeWidth="1.5" strokeLinecap="round" />
      <path ref={pathRef} d="M30,8 L28,100" fill="none" stroke="var(--ink-muted)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="28" cy="102" r="1.5" fill="var(--accent-rust)" opacity="0.7" />
      <path d="M30,16 C40,18 46,26 41,33" fill="none" stroke="var(--accent-rust)" strokeWidth="0.6" opacity="0.5" />
      <path d="M29,28 C39,30 44,38 39,45" fill="none" stroke="var(--accent-rust)" strokeWidth="0.6" opacity="0.38" />
      <path d="M28,42 C38,44 42,52 37,59" fill="none" stroke="var(--accent-rust)" strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
};

/* ── Paper Airplane SVG ──────────────────────────────────────── */
const PaperAirplane = ({ style }) => (
  <svg viewBox="0 0 48 48" width="38" height="38" style={style} aria-hidden="true">
    <polygon points="2,24 46,4 30,44" fill="var(--bg-page)" stroke="var(--accent-rust)" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="30" y1="44" x2="20" y2="26" stroke="var(--accent-rust)" strokeWidth="1" opacity="0.5" />
    <line x1="2" y1="24" x2="30" y2="44" stroke="var(--accent-rust)" strokeWidth="0.8" opacity="0.35" strokeDasharray="3 2" />
  </svg>
);

/* ── Interactive Left Page ───────────────────────────────────── */
const LeftPage = () => {
  const [name,    setName]    = useState('');
  const [message, setMessage] = useState('');
  const [phase,   setPhase]   = useState('writing'); // writing | sending | sent

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setPhase('sending');

    // After airplane flies off, open mailto and show success
    setTimeout(() => {
      const subject = encodeURIComponent(`A message from your portfolio reader${name ? ` — ${name}` : ''}`);
      const body    = encodeURIComponent(`${name ? `From: ${name}\n\n` : ''}${message}`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
      setPhase('sent');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>

      {/* Chapter heading */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <p className="chapter-label">Chapter V</p>
        <h2 className="chapter-title" style={{ fontSize: '1.5rem' }}>
          <span className="chapter-title-italic">[Your Name Here]</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 4 }}>
          Write the next chapter.
        </p>
      </div>

      {/* Flying airplane animation overlay */}
      <AnimatePresence>
        {phase === 'sending' && (
          <motion.div
            style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20, pointerEvents: 'none' }}
            initial={{ x: 0, y: 0, rotate: -10, opacity: 0, scale: 0.6 }}
            animate={{ x: 200, y: -350, rotate: -35, opacity: [0, 1, 1, 0], scale: [0.6, 0.8, 0.5, 0.2] }}
            transition={{ duration: 1.3, ease: [0.4, 0, 0.6, 1] }}
          >
            <PaperAirplane />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content: writing phase */}
      <AnimatePresence mode="wait">
        {(phase === 'writing' || phase === 'sending') && (
          <motion.form
            key="form"
            className="invitation-form"
            onSubmit={handleSend}
            exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3 } }}
          >
            {/* Name field */}
            <div>
              <div className="invitation-field-label">Your name</div>
              <input
                type="text"
                className="invitation-name-input"
                placeholder="e.g. Maria Santos"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={60}
                disabled={phase === 'sending'}
                aria-label="Your name"
              />
            </div>

            {/* Message field — ruled paper */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div className="invitation-field-label">Your message</div>
              <textarea
                className="invitation-textarea"
                placeholder="Begin writing…"
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={phase === 'sending'}
                aria-label="Your message to Raziel"
                style={{ flex: 1 }}
              />
            </div>

            {/* Small quill icon */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <QuillSVG size={32} />
              <button
                type="submit"
                className="invitation-send-btn"
                disabled={!message.trim() || phase === 'sending'}
                aria-label="Send your message"
              >
                <i className="fas fa-paper-plane" aria-hidden="true" />
                {phase === 'sending' ? 'Sending…' : 'Send Letter'}
              </button>
            </div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--ink-muted)', textAlign: 'center' }}>
              // opens your email client with message pre-filled
            </p>
          </motion.form>
        )}

        {/* Success state */}
        {phase === 'sent' && (
          <motion.div
            key="success"
            className="send-success-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="stamp-seal-anim" role="img" aria-label="Wax seal">🔖</span>
            <div className="success-headline">Letter Sent.</div>
            <p className="success-sub">
              The next chapter is already in motion. Thank you for writing.
            </p>
            <button
              onClick={() => { setPhase('writing'); setName(''); setMessage(''); }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Write another ↺
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Right Page — the invitation prose ───────────────────────── */
const RightPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 16 }}>
    <div style={{ textAlign: 'center' }}>
      <div className="chapter-ornament" aria-hidden="true">❦</div>
    </div>

    {/* Pull quote as the hook */}
    <div className="pull-quote" style={{ fontSize: '1.25rem', margin: '0 0 8px' }}>
      Every great story is a collaboration.
    </div>

    <div className="prose" style={{ textAlign: 'center', fontSize: '0.88rem' }}>
      <p>
        This one is no different. If you think our stories intersect —
        if you have a problem worth solving, a team worth joining,
        or simply a thought worth sharing —
      </p>
      <p style={{ marginTop: '1em' }}>
        <span className="ink-highlight">the next page is waiting to be written.</span>
      </p>
    </div>

    <div className="chapter-divider"><span className="chapter-divider-symbol">✉</span></div>

    {/* Direct email */}
    <div style={{ textAlign: 'center' }}>
      <a href={`mailto:${email}`} className="invitation-seal">
        <i className="fas fa-envelope" aria-hidden="true" />
        Write to the Author
      </a>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--ink-muted)', marginTop: 8, letterSpacing: '0.1em' }}>
        {email}
      </p>
    </div>

    {/* Socials */}
    <div className="invitation-social-row">
      {socialLinks.map((link) => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
          className="invitation-social-link" aria-label={link.name}>
          {link.iconClass && <i className={link.iconClass} style={{ marginRight: 4 }} aria-hidden="true" />}
          {link.name}
        </a>
      ))}
    </div>

    <p style={{ marginTop: 'auto', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.72rem', color: 'var(--ink-muted)', textAlign: 'center' }}>
      — End of Draft. Beginning of Story. —
    </p>
  </div>
);

/* ── Export ──────────────────────────────────────────────────── */
const PageInvitation = ({ side }) =>
  side === 'left' ? <LeftPage /> : <RightPage />;

export default PageInvitation;
