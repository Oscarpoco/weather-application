// import React, { useState } from 'react';
// import './Popup.css';
// import { LiaFacebookMessenger } from "react-icons/lia";
// import { SlSocialTwitter } from "react-icons/sl";
// import { RxDiscordLogo } from "react-icons/rx";
// import { IoLogoReddit } from "react-icons/io5";
// import { FaChevronDown } from "react-icons/fa";
// import { MdOutlineDeleteForever } from "react-icons/md";

// const Popup = ({ isOpen, onClose, settings, handleUnitChange, citiesHistory, onCitySelect }) => {
//   const [isDeveloperPopupOpen, setIsDeveloperPopupOpen] = useState(false);
//   const [isNewsPopupOpen, setIsNewsPopupOpen] = useState(false);

//   const handleNewsClick = () => {
//     setIsNewsPopupOpen(true);
//   };

//   const closeNewsPopup = () => {
//     setIsNewsPopupOpen(false);
//   };

//   const handleDeveloperClick = () => {
//     setIsDeveloperPopupOpen(true);
//   };

//   const closeDeveloperPopup = () => {
//     setIsDeveloperPopupOpen(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="popup-overlay" onClick={onClose}>
//         <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//           {/* MANAGING YOUR CITIES */}
//           <div className='manage-cities'>
//             <h3>Manage Cities</h3>
//             <p><span>My Visited Cities:</span></p>
//             <ul>
//                 {citiesHistory.map((city, index) => (
//                     <li key={index} onClick={() => onCitySelect(city)}>{city}<button><MdOutlineDeleteForever className='del-icon'/></button></li>
//               ))}
//             </ul>
//           </div>
//           {/* ENDS */}

//           {/* SETTINGS */}
//           <div className='settings'>
//             <h3>Settings</h3>
//             <div>
//               <p><span>Temperature Unit:</span></p>
//               <button
//                 className={settings.temperatureUnit === 'metric' ? 'active' : ''}
//                 onClick={() => handleUnitChange('metric')}
//               >
//                 Celcius
//               </button>
//               <button
//                 className={settings.temperatureUnit === 'imperial' ? 'active' : ''}
//                 onClick={() => handleUnitChange('imperial')}
//               >
//                 Fahrenheit
//               </button>
//             </div>
//           </div>
//           {/* ENDS */}

//           {/* MORE */}
//           <div className='more'>
//             <h3>More</h3>
//             <ul>
//               <li onClick={handleNewsClick}>News</li>
//               <li onClick={handleNewsClick}>Maps</li>
//               <li onClick={handleDeveloperClick}>Developer</li>
//             </ul>
//           </div>
//           {/* ENDS */}

//           {/* BUTTON FOR CLOSING THE POPUP */}
//           <button className="popup-close" onClick={onClose}>+</button>
//           {/* ENDS */}
//         </div>
//       </div>

//       {/* DEVELOPER ABOUT POPUP */}
//       {isDeveloperPopupOpen && (
//         <div className="devloper-overlay" onClick={closeDeveloperPopup}>
//           <div className="developer-content developer-popup" onClick={(e) => e.stopPropagation()}>
//             <h3><span>About the Developer</span></h3>
//             <p>This application was developed by GameFusion under the auspices of mLab. GameFusion is dedicated to creating innovative and user-friendly applications, and mLab provides the necessary tools and support to turn creative ideas into reality. We strive to deliver exceptional digital experiences through meticulous design and development. For any inquiries or feedback, please feel free to reach out to us at <br></br> <span><FaChevronDown className='arrow'/></span> </p>
//             <div className='social-icons'>
//                 <LiaFacebookMessenger />
//                 <SlSocialTwitter />
//                 <RxDiscordLogo />
//                 <IoLogoReddit />
//             </div>
//             <h6>© 2024 GameFusion. All rights reserved. <br></br>Version 1.0.</h6>
//             <button className="devloper-popup-close" onClick={closeDeveloperPopup}>+</button>
//           </div>
//         </div>
//       )}
//       {/* ENDS */}

//       {/* NEWS & MAPS POPUP */}
//       {isNewsPopupOpen && (
//         <div className="devloper-overlay" onClick={closeNewsPopup}>
//           <div className="developer-content developer-popup" onClick={(e) => e.stopPropagation()}>
//             <h3><span>THIS FEATURE IS STILL UNDER DEVELOPMENT <br></br> IT WILL BE LIVE TO YOU SOON</span></h3>
//             <button className="devloper-popup-close" onClick={closeNewsPopup}>+</button>
//           </div>
//         </div>
//       )}
//       {/* ENDS */}
//     </>
//   );
// };

// export default Popup;


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

  // HANDLE THE OPENING OF NEWS
  const handleNewsClick = () => {
    setIsNewsPopupOpen(true);
  };

   // HANDLE THE CLOSING OF NEWS
  const closeNewsPopup = () => {
    setIsNewsPopupOpen(false);
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
    onCitySelect(''); // Clear the selection if the deleted city was the active one
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
