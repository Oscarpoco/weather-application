import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { MdLocationSearching } from 'react-icons/md';
import { FaCloudSun } from "react-icons/fa";
import { IoMenuSharp } from 'react-icons/io5';
import CookieConsent from './CookieConsent';
import PrivacySecurityConsent from './PrivacySecurityConsent';
import WeatherForecast from './WeatherForecast';
import Popup from './Popup';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [settings, setSettings] = useState({
    temperatureUnit: 'metric' 
  });


  // LOAD DATA
  useEffect(() => {
    const savedData = localStorage.getItem('weatherData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);
  // ENDS

  // SAVE DATA
  useEffect(() => {
    if (data.name) {
      localStorage.setItem('weatherData', JSON.stringify(data));
    }
  }, [data]);
  // ENDS

  // FETCH WEATHER DATA FUNCTION
  const fetchWeatherData = useCallback(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25160517a2420597ecea94ef0c801eb8&units=${settings.temperatureUnit}`)
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);

        const lat = fetchedData.coord.lat;
        const lon = fetchedData.coord.lon;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=25160517a2420597ecea94ef0c801eb8&units=${settings.temperatureUnit}`;

        return axios.get(forecastUrl);
      })
      .then((response) => {
        setDailyForecast(response.data.daily);
        setHourlyForecast(response.data.hourly);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [location, settings.temperatureUnit]);

  // SEARCH FUNCTION
  const SearchLocation = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
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
  }, [data.name, settings.temperatureUnit, fetchWeatherData]); // fetchWeatherData is now stable, so it's safe to include it as a dependency

  // TOGGLE POPUP MENU
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // HANDLE TEMPERATURE UNIT CHANGE
  const handleUnitChange = (unit) => {
    setSettings({ ...settings, temperatureUnit: unit });
  };

  return (
    <div className="App">
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

      {data.name && (
        <main>
          <div className='top'>
            <div className='location' style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <p><FaLocationDot className='icon' style={{ fontSize: '1.18rem', color: 'red' }} /></p>
              <p>{data.name}</p>
              <div className='weather-icons'>
                <FaCloudSun />
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

          <div className='middle'>
            <div className='weather'>
              <WeatherForecast daily={dailyForecast} hourly={hourlyForecast} unit={settings.temperatureUnit} />
            </div>
          </div>

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
        </main>
      )}

      <CookieConsent /> 
      <PrivacySecurityConsent />
      <Popup isOpen={isPopupOpen} onClose={togglePopup} settings={settings} handleUnitChange={handleUnitChange}/>
    </div>
  );
}

export default App;
