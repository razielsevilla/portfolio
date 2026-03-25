import React from 'react';
import contactData from '../../data/contactData';

const { email, socialLinks } = contactData;

/**
 * InvitationProse component — Renders the closing thoughts and social links.
 * Provides a formal conclusion to the Living Codex experience.
 */
const InvitationProse = () => (
  <div className="page-flex-col" style={{ justifyContent: 'center', gap: 16 }}>
    <div style={{ textAlign: 'center' }}>
      <div className="chapter-ornament" aria-hidden="true">
        ❦
      </div>
    </div>

    <div className="pull-quote" style={{ fontSize: '1.25rem', margin: '0 0 8px' }}>
      Every great story is a collaboration.
    </div>

    <div className="prose" style={{ textAlign: 'center', fontSize: '0.88rem' }}>
      <p>
        This one is no different. If you think our stories intersect — if you have a problem worth
        solving, a team worth joining, or simply a thought worth sharing —
      </p>
      <p style={{ marginTop: '1em' }}>
        <span className="ink-highlight">the next page is waiting to be written.</span>
      </p>
    </div>

    <div className="chapter-divider">
      <span className="chapter-divider-symbol">✉</span>
    </div>

    <div style={{ textAlign: 'center' }}>
      <a href={`mailto:${email}`} className="invitation-seal">
        <i className="fas fa-envelope" aria-hidden="true" />
        Write to the Author
      </a>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'var(--ink-muted)',
          marginTop: 8,
          letterSpacing: '0.1em',
        }}
      >
        {email}
      </p>
    </div>

    <div className="invitation-social-row">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="invitation-social-link"
          aria-label={link.name}
        >
          {link.iconClass && (
            <i className={link.iconClass} style={{ marginRight: 4 }} aria-hidden="true" />
          )}
          {link.name}
        </a>
      ))}
    </div>

    <p className="prose-end-note">— End of Draft. Beginning of Story. —</p>
  </div>
);

export default InvitationProse;
