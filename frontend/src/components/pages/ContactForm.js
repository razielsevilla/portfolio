import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contactData from '../../data/contactData';
import QuillSVG from './QuillSVG';
import PaperAirplane from './PaperAirplane';

const { email } = contactData;

/**
 * ContactForm component — Handles the message-sending logic and UI.
 * Features an animated transition between writing, sending, and success states.
 */
const ContactForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [phase, setPhase] = useState('writing');

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setPhase('sending');

    setTimeout(() => {
      const subject = encodeURIComponent(
        `A message from your portfolio reader${name ? ` — ${name}` : ''}`
      );
      const body = encodeURIComponent(`${name ? `From: ${name}\n\n` : ''}${message}`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
      setPhase('sent');
    }, 1500);
  };

  const handleReset = () => {
    setPhase('writing');
    setName('');
    setMessage('');
  };

  return (
    <div className="page-flex-col" style={{ position: 'relative' }}>
      <div className="form-title-container">
        <p className="chapter-label">Chapter IV</p>
        <h2 className="chapter-title" style={{ fontSize: '1.5rem' }}>
          <span className="chapter-title-italic">[Your Name Here]</span>
        </h2>
        <p className="form-subtitle">Write the next chapter.</p>
      </div>

      <AnimatePresence>
        {phase === 'sending' && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
            initial={{ x: 0, y: 0, rotate: -10, opacity: 0, scale: 0.6 }}
            animate={{
              x: 200,
              y: -350,
              rotate: -35,
              opacity: [0, 1, 1, 0],
              scale: [0.6, 0.8, 0.5, 0.2],
            }}
            transition={{ duration: 1.3, ease: [0.4, 0, 0.6, 1] }}
          >
            <PaperAirplane />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {(phase === 'writing' || phase === 'sending') && (
          <motion.form
            key="form"
            className="invitation-form"
            onSubmit={handleSend}
            onMouseDownCapture={(e) => e.stopPropagation()}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onPointerDownCapture={(e) => e.stopPropagation()}
            exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3 } }}
          >
            <div>
              <div className="invitation-field-label">Your name</div>
              <input
                type="text"
                className="invitation-name-input"
                placeholder="e.g. Maria Santos"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                disabled={phase === 'sending'}
                aria-label="Your name"
              />
            </div>

            <div className="page-flex-col" style={{ minHeight: 0 }}>
              <div className="invitation-field-label">Your message</div>
              <textarea
                className="invitation-textarea"
                placeholder="Begin writing…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={phase === 'sending'}
                aria-label="Your message"
              />
            </div>

            <div
              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
            >
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

            <p className="form-footer-hint">// opens your email client with message pre-filled</p>
          </motion.form>
        )}

        {phase === 'sent' && (
          <motion.div
            key="success"
            className="send-success-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="stamp-seal-anim" role="img" aria-label="Wax seal">
              🔖
            </span>
            <div className="success-headline">Letter Sent.</div>
            <p className="success-sub">
              The next chapter is already in motion. Thank you for writing.
            </p>
            <button onClick={handleReset} className="success-reset-btn">
              Write another ↺
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
