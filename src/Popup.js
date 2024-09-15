

import React, { useState } from 'react';
import './Popup.css';
import { LiaFacebookMessenger } from "react-icons/lia";
import { SlSocialTwitter } from "react-icons/sl";
import { RxDiscordLogo } from "react-icons/rx";
import { IoLogoReddit } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
// POPUP CONTAIN PROPS FROM APP.JS
const Popup = ({ isOpen, onClose, settings, handleUnitChange, citiesHistory, onCitySelect,setCitiesHistory }) => {
  const [isDeveloperPopupOpen, setIsDeveloperPopupOpen] = useState(false);
  const [isNewsPopupOpen, setIsNewsPopupOpen] = useState(false);
  const [userPrivacy, setUserPrivacy] = useState(false);

  // HANDLE THE OPENING OF NEWS
  const handleNewsClick = () => {
    setIsNewsPopupOpen(true);
  };

   // HANDLE THE CLOSING OF NEWS
  const closeNewsPopup = () => {
    setIsNewsPopupOpen(false);
  };

  // HANDLE THE OPENING OF PRIVACY
  const handlePrivacyClick = () => {
    setUserPrivacy(true);
    setIsDeveloperPopupOpen(false);
  };

   // HANDLE THE CLOSING OF PRIVACY
  const closePrivacyPopup = () => {
    setUserPrivacy(false);
    setIsDeveloperPopupOpen(true);
  };

   // HANDLE THE OPENING OF DEVELOPER
  const handleDeveloperClick = () => {
    setIsDeveloperPopupOpen(true);
  };

   // HANDLE THE CLOSING OF DEVELOPER
  const closeDeveloperPopup = () => {
    setIsDeveloperPopupOpen(false);
  };

  // HANDLES DELETE OF HISTORY
  const handleDeleteCity = (cityToDelete) => {
    const updatedCities = citiesHistory.filter(city => city !== cityToDelete);
    onCitySelect(''); 
    setCitiesHistory(updatedCities);
  };

  if (!isOpen) return null;

  // BODY
  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          {/* MANAGING YOUR CITIES */}
          <div className='manage-cities'>
            <h3>Manage Cities</h3>
            <p><span>My Visited Cities:</span></p>
            <ul>
              {citiesHistory.map((city, index) => (
                <li key={index}>
                  <span onClick={() => onCitySelect(city)}>{city}</span>
                  <button onClick={() => handleDeleteCity(city)}>
                    <MdOutlineDeleteForever className='del-icon' />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* ENDS */}

          {/* SETTINGS */}
          <div className='settings'>
            <h3>Settings</h3>
            <div>
              <p><span>Temperature Unit:</span></p>
              <button
                className={settings.temperatureUnit === 'metric' ? 'active' : ''}
                onClick={() => handleUnitChange('metric')}
              >
                Celsius
              </button>
              <button
                className={settings.temperatureUnit === 'imperial' ? 'active' : ''}
                onClick={() => handleUnitChange('imperial')}
              >
                Fahrenheit
              </button>
            </div>
          </div>
          {/* ENDS */}

          {/* MORE */}
          <div className='more'>
            <h3>More</h3>
            <ul>
              <li onClick={handleNewsClick}>News</li>
              <li onClick={handleNewsClick}>Maps</li>
              <li onClick={handleDeveloperClick}>Developer</li>
            </ul>
          </div>
          {/* ENDS */}

          {/* BUTTON FOR CLOSING THE POPUP */}
          <button className="popup-close" onClick={onClose}>+</button>
          {/* ENDS */}
        </div>
      </div>

      {/* DEVELOPER ABOUT POPUP */}
      {isDeveloperPopupOpen && (
        <div className="devloper-overlay" onClick={closeDeveloperPopup}>
          <div className="developer-content developer-popup" onClick={(e) => e.stopPropagation()}>
            <h3><span>About the Developer</span></h3>
            <p>This application was developed by GameFusion under the auspices of mLab. GameFusion is dedicated to creating innovative and user-friendly applications, and mLab provides the necessary tools and support to turn creative ideas into reality. We strive to deliver exceptional digital experiences through meticulous design and development. For any inquiries or feedback, please feel free to reach out to us at <br></br> <span><FaChevronDown className='arrow'/></span> </p>
            <div className='social-icons'>
                <LiaFacebookMessenger />
                <SlSocialTwitter />
                <RxDiscordLogo />
                <IoLogoReddit />
            </div>
            <h6>© 2024 GameFusion. All rights reserved. <br></br>Version 1.0. <br></br><span onClick={handlePrivacyClick}>Privacy and Security</span></h6>
            
            <button className="devloper-popup-close" onClick={closeDeveloperPopup}>+</button>
          </div>
        </div>
      )}
      {/* ENDS */}

      {/* NEWS & MAPS POPUP */}
      {isNewsPopupOpen && (
        <div className="devloper-overlay" onClick={closeNewsPopup}>
          <div className="developer-content developer-popup" onClick={(e) => e.stopPropagation()}>
            <h3><span>THIS FEATURE IS STILL UNDER DEVELOPMENT <br></br> IT WILL BE LIVE TO YOU SOON</span></h3>
            <button className="devloper-popup-close" onClick={closeNewsPopup}>+</button>
          </div>
        </div>
      )}
      {/* ENDS */}

      {/* PRIVAcy*/}
      {userPrivacy && (
        <div className="user-privacy-overlay">

          <div className="user-privacy-content">

              <h1>Privacy Policy</h1>
              <h2>Effective Date: 2024 July 17</h2>

              <p>This Privacy Policy explains how weather application collects, uses, and protects your information when you use our weather application. 
              By using the App, you agree to the terms described in this policy.</p>

             <h2> 1. Information We Collect</h2>
              <p>a. Personal Information <br></br>
              We do not collect personally identifiable information (PII).</p>

              <p>b. Location Data <br></br>
              To provide accurate weather information, we may collect your location data:</p>

              <p>Precise Location: When you allow location access, we collect your device’s GPS data to deliver local weather forecasts.
              Approximate Location: If precise location data is not enabled, we may use your IP address to estimate your general location.</p>
              
              <p>c. Usage Data
              We collect non-personal information about how you interact with the App. This may include:</p>

              <p> * Device information (e.g., device type, operating system) <br></br>
              * App usage statistics (e.g., features accessed, session length) <br></br>
              * Log data (e.g., IP address, time zone, error reports)</p>

              <h2>2. How We Use Your Information</h2>
              <p>We use your data for the following purposes:</p>

              <p>Weather Forecasts: To provide real-time weather forecasts based on your location.
              App Improvements: To understand how users interact with the App and improve its performance.
              Analytics: To analyze user trends and gather demographic insights for development and optimization purposes.</p>
              
              <h2>3. Sharing Your Information</h2>
              <p> We do not sell, trade, or rent your personal information to third parties. However, we may share data with:</p>

              <p>Service Providers: Third-party vendors who assist us in running the App (e.g., cloud hosting, data analytics), under strict confidentiality agreements.
              Legal Requirements: If required by law, we may disclose information to comply with legal processes, enforce our terms, or protect our rights.</p>
              
              <h2>4. Data Security</h2>
              <p>We take reasonable precautions to protect your information:</p>

              <p>Encryption: Data transmitted between your device and our servers is encrypted using SSL/TLS protocols.
              Access Controls: Only authorized personnel have access to personal data, and we employ strict data management practices.
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>

              <h2>5. Your Choices and Rights</h2>
              <p>a. Location Access
              You can control whether the App has access to your precise location by adjusting your device’s location settings.</p>

              <p>b. Data Deletion
              If you want to delete your personal data or stop using the App, you may request account deletion by contacting us at weather@application.co.za.</p>

              <h2>6. Children's Privacy</h2>
              <p>Our App is not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we discover that we have inadvertently collected data from a child under 13, we will delete it as soon as possible.</p>

              <h2>7. Third-Party Links</h2>
              <p>The App may contain links to third-party websites or services (e.g., weather maps, external APIs). We are not responsible for the privacy practices of those websites, and you should review their policies before interacting with them.</p>

              <h2>8. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically. Any changes will be reflected with an updated "Effective Date" at the top of this policy. We encourage you to review this policy regularly.</p>

              <h2>9. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>

              Email: weather@application.co.za

              <button className='return-button' onClick={closePrivacyPopup}>Return to the application</button>

          </div>

        </div>
      )}
    </>
  );
};

export default Popup;
