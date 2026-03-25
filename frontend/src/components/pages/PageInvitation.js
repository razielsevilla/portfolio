import React from 'react';
import ContactForm from './ContactForm';
import InvitationProse from './InvitationProse';

/**
 * PageInvitation component — Chapter IV: "The Next Chapter".
 * Handles both the left (Contact Form) and right (Prose/Socials) sides of the final spread.
 *
 * @param {Object} props - Component props.
 * @param {string} props.side - The side of the spread being rendered ('left' | 'right').
 */
const PageInvitation = ({ side }) => {
  return (
    <div className="book-page-inner">
      {side === 'left' ? <ContactForm /> : <InvitationProse />}
    </div>
  );
};

export default PageInvitation;
