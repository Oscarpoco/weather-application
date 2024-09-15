import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { MdLocationSearching } from 'react-icons/md';
import { IoMenuSharp } from 'react-icons/io5';
import CookieConsent from './CookieConsent';
import PrivacySecurityConsent from './PrivacySecurityConsent';
import WeatherForecast from './WeatherForecast';
import Popup from './Popup';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [citiesHistory, setCitiesHistory] = useState([]);
  const [settings, setSettings] = useState({
    temperatureUnit: 'metric' 
  });

  // LOAD WEATHER DATA FROM LOCAL STORAGE
  useEffect(() => {
    const savedData = localStorage.getItem('weatherData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    const savedForecastData = localStorage.getItem('forecast');
    if (savedForecastData) {
      setForecastData(JSON.parse(savedForecastData));
    }

    const savedHistory = localStorage.getItem('citiesHistory');
    if (savedHistory) {
      setCitiesHistory(JSON.parse(savedHistory));
    }
  }, []);

  // SAVE WEATHER DATA TO LOCAL STORAGE
  useEffect(() => {
    if (data.name) {
      setTimeout(()=>{
      localStorage.setItem('weatherData', JSON.stringify(data));
      }, 1);
    }
  }, [data]);

  // SAVE CITIES HISTORY TO LOCAL STORAGE
  useEffect(() => {
    setTimeout(()=>{
    localStorage.setItem('citiesHistory', JSON.stringify(citiesHistory));
    }, 1);

  }, [citiesHistory]);

  // SAVE forecast TO LOCAL STORAGE
  useEffect(() => {
    setTimeout(()=>{
    localStorage.setItem('forecast', JSON.stringify(forecastData));
    }, 1);

  }, [forecastData]);

  // FETCH WEATHER DATA FUNCTION
const fetchWeatherData = useCallback((selectedCity) => {
  const query = selectedCity || location;

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=25160517a2420597ecea94ef0c801eb8&units=${settings.temperatureUnit}`)
    .then((response) => {
      const fetchedData = response.data;
      setData(fetchedData);

      // Add the searched city to the history
      setCitiesHistory((prevHistory) => {
        const newHistory = prevHistory.filter(city => city !== fetchedData.name);
        return [fetchedData.name, ...newHistory];
      });

      return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${fetchedData.name}&appid=25160517a2420597ecea94ef0c801eb8&units=${settings.temperatureUnit}`);
    })
    .then((response) => {
      setForecastData(response.data.list);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}, [location, settings.temperatureUnit]);
// ENDS




  // SEARCH LOCATION FUNCTION
  const SearchLocation = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
      setLocation(''); 
    }
  };

  // AUTO UPDATE WEATHER EVERY 1 MINUTE
  useEffect(() => {
    if (data.name) {
      const interval = setInterval(() => {
        fetchWeatherData();
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [data.name, settings.temperatureUnit, fetchWeatherData]);

  // TOGGLE POPUP MENU
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // HANDLE TEMPERATURE UNIT CHANGE
  const handleUnitChange = (unit) => {
    setSettings({ ...settings, temperatureUnit: unit });
  };

  // HANDLE CITY SELECTION FROM HISTORY
  const handleCitySelect = (city) => {
    setLocation(city);
    fetchWeatherData(city);
  };

  return (
    <div className="App">

      {/* HEADER FOR SEARCH BAR */}
      <header>
        <MdLocationSearching className='search-icon' />
        <input
          type='text'
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder='Search Location'
          onKeyPress={SearchLocation}
        />
        <div className='hamburger' onClick={togglePopup}>
          <IoMenuSharp className='menu-icon'/>
        </div>
      </header>
      {/* ENDS */}

      {/* BODY */}
      {data.name && (
      <main>
        <div className='main-wrapper'>

          {/* TOP CONTAINER */}
          <div className='top'>
            <div className='location' style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <p><FaLocationDot className='icon' style={{ fontSize: '1.18rem', color: 'red' }} /></p>
              <p>{data.name}</p>
              <div className='weather-icons'>
                {data.weather && data.weather[0] && (
                  <img 
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                    alt={data.weather[0].description} 
                  />
                )}
              </div>
            </div>

            <div className='temperature'>
              {data.main ? <h1>{Math.round(settings.temperatureUnit === 'metric' ? data.main.temp : data.main.temp * 9/5 + 32)}°{settings.temperatureUnit === 'metric' ? 'C' : 'F'}</h1> : null}
              <p>Last updated: {new Date().toLocaleTimeString()}</p>
            </div>

            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {/* ENDS */}


          {/* MIDDLE CONTAINER */}
          <div className='middle'>
            <div className='weather'>
              <WeatherForecast forecastData={forecastData} unit={settings.temperatureUnit} />
            </div>
          </div>
          {/* ENDS */}

          {/* BOTTOM CONTAINER */}
          <div className='bottom'>
            <div className='feels' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Feels-like</span></p>
              {data.main ? <p>{Math.round(settings.temperatureUnit === 'metric' ? data.main.feels_like : data.main.feels_like * 9/5 + 32)}°{settings.temperatureUnit === 'metric' ? 'C' : 'F'}</p> : null}
            </div>

            <div className='humidity' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Humidity</span></p>
              {data.main ? <p>{data.main.humidity}%</p> : null}
            </div>

            <div className='wind' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Wind speed</span></p>
              {data.wind ? <p>{Math.round(settings.temperatureUnit === 'metric' ? data.wind.speed : data.wind.speed * 2.237)} mph</p> : null}
            </div>
          </div>
          {/* ENDS */}

        </div>
      </main>
      )}

      {/* POPUPS */}
      <CookieConsent /> 
      <PrivacySecurityConsent />
      <Popup 
        isOpen={isPopupOpen} 
        onClose={togglePopup} 
        settings={settings} 
        handleUnitChange={handleUnitChange} 
        citiesHistory={citiesHistory} 
        onCitySelect={handleCitySelect} 
        setCitiesHistory={setCitiesHistory}
      />
      {/* ENDS  */}

    </div>
  );
}

export default App;
