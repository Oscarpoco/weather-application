import React, { useState } from 'react';
import './Popup.css';
import { LiaFacebookMessenger } from "react-icons/lia";
import { SlSocialTwitter } from "react-icons/sl";
import { RxDiscordLogo } from "react-icons/rx";
import { IoLogoReddit } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const Popup = ({ isOpen, onClose, settings, handleUnitChange }) => {
  const [isDeveloperPopupOpen, setIsDeveloperPopupOpen] = useState(false);
  const [isNewsPopupOpen, setIsNewsPopupOpen] = useState(false);

  const handleNewsClick = () => {
    setIsNewsPopupOpen(true);
  };

  const closeNewsPopup = () => {
    setIsNewsPopupOpen(false);
  };

  const handleDeveloperClick = () => {
    setIsDeveloperPopupOpen(true);
  };

  const closeDeveloperPopup = () => {
    setIsDeveloperPopupOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          {/* MANAGING YOUR CITIES */}
          <div className='manage-cities'>
            <h3>Manage Cities</h3>
            <p><span>My Visited Cities:</span></p>
            <ul>
              
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
                °C
              </button>
              <button
                className={settings.temperatureUnit === 'imperial' ? 'active' : ''}
                onClick={() => handleUnitChange('imperial')}
              >
                °F
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
            <h6>© 2024 GameFusion. All rights reserved. <br></br>Version 1.0.</h6>
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
    </>
  );
};

export default Popup;
