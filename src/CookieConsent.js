// CookieConsent.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css'

const CookieConsent = () => {
  const [consent, setConsent] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent or declined
    const cookieConsent = Cookies.get('cookieConsent');
    const cookieDecline = Cookies.get('cookieDecline');
    if (cookieConsent || cookieDecline) {
      setConsent(true);
      setDeclined(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 }); // Expires in 365 days
    setConsent(true);
  };

  const handleDecline = () => {
    Cookies.set('cookieDecline', 'true', { expires: 365 }); // Expires in 365 days
    setDeclined(true);
  };

  if (consent || declined) return null;

  return (
    <div className="cookie-consent">
      <p>
        We use cookies to improve your experience on our site. <br></br>
        By continuing, you agree to our use of cookies.
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default CookieConsent;
