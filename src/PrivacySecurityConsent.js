// PrivacySecurityConsent.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './privary.css'

const PrivacySecurityConsent = () => {
    const [consentGiven, setConsentGiven] = useState(false);
    const [declined, setDeclined] = useState(false);

    useEffect(() => {
        const privacyConsent = Cookies.get('privacyConsent');
        const privacyDecline = Cookies.get('privacyDecline');
        if (privacyConsent || privacyDecline) {
            setConsentGiven(true);
            setDeclined(true);
        }
    }, []);

    const handleAcceptAll = () => {
        Cookies.set('privacyConsent', 'true', { expires: 365 });
        Cookies.set('securityConsent', 'true', { expires: 365 });
        setConsentGiven(true);
    };

    const handleDeclineAll = () => {
        Cookies.set('privacyDecline', 'true', { expires: 365 });
        setDeclined(true);
    };



    if (consentGiven || declined) return null;

    return (
        <div className="privacy-security-consent">
            <h2>Privacy and Security Settings</h2>
            <p>
                When using our weather app, your privacy and security are our top priorities. To provide accurate weather updates, we may collect and use your location data. This data allows us to deliver real-time forecasts and personalized weather insights tailored to your specific area. Rest assured, your location information is handled with the utmost care and used solely to enhance your experience with our app. We employ industry-standard security measures to protect your data, ensuring that your personal information remains confidential and secure. By using our app, you consent to the safe and responsible use of your location data, enabling us to provide you with the most accurate and timely weather information.
            </p>
            <div className="consent-buttons">
                <button onClick={handleAcceptAll}>Accept All</button>
                <button onClick={handleDeclineAll}>Decline All</button>
            </div>
        </div>
    );
};

export default PrivacySecurityConsent;
