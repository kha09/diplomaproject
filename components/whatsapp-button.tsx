import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the next/image component

const WhatsAppButton = () => {
  const phoneNumber = '966505568884';
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      // Adjusted styles: removed bg, text color, padding. Kept positioning, shadow, rounded. Added hover scale.
      className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/static/images/whatsapp.png" // Path relative to the public directory
        alt="WhatsApp Icon"
        width={120} // Increased size to 72x72 pixels
        height={120}
        className="rounded-full" // Ensure image itself is rounded if it's not already
      />
    </Link>
  );
};

export default WhatsAppButton;
