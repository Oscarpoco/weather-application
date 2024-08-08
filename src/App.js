// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { MdLocationSearching } from 'react-icons/md';
import { IoMenuSharp } from 'react-icons/io5';
import CookieConsent from './CookieConsent';
import PrivacySecurityConsent from './PrivacySecurityConsent';
import WeatherForecast from './WeatherForecast';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

  // LOAD WEATHER DATA
  useEffect(() => {
    const savedData = localStorage.getItem('weatherData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, [setData]);

  // SAVE WEATHER DATA TO LOCALSTORAGE AFTER FETCHING IT
  useEffect(() => {
    if (data.name) {
      localStorage.setItem('weatherData', JSON.stringify(data));
    }
  }, [data]);

  // SEARCH FUNCTION
  const SearchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25160517a2420597ecea94ef0c801eb8&units=metric`)
        .then((response) => {
          setData(response.data);
          return axios.get(url); // Fetch forecast data
        })
        .then((response) => {
          setDailyForecast(response.data.daily);
          setHourlyForecast(response.data.hourly);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  };

  return (
    <div className="App">
      {/* SEARCH */}
      <header>
        <MdLocationSearching className='search-icon' />
        <input
          type='text'
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder='Search Location'
          onKeyPress={SearchLocation}
        />
        <div className='hamburger'>
          <IoMenuSharp className='menu-icon'/>
        </div>
      </header>
      {/* ENDS */}

      {/* CONDITION TO CHECK IF THERE'S NAME IN DATA TO DISPLAY */}
      {data.name && (
        <main>
          {/* TOP CONTAINER INSIDE MAIN */}
          <div className='top'>
            {/* LOCATION INSIDE TOP CONTAINER */}
            <div className='location' style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <p><FaLocationDot className='icon' style={{ fontSize: '1.18rem', color: 'red' }} /></p>
              <p>{data.name}</p>
            </div>
            {/* ENDS */}

            {/* TEMPERATURE INSIDE TOP CONTAINER */}
            <div className='temperature'>
              {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
              <p>Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
            {/* ENDS */}

            {/* DESCRIPTION OF THE CURRENT WEATHER INSIDE TOP CONTAINER */}
            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            {/* ENDS */}
          </div>
          {/* TOP CONTAINER ENDS */}

          {/* MIDDLE CONTAINER */}
          <div className='middle'>
            <div className='weather'>
              <WeatherForecast daily={dailyForecast} hourly={hourlyForecast} />
            </div>
          </div>
          {/* ENDS */}

          {/* BOTTOM CONTAINER INSIDE MAIN */}
          <div className='bottom'>
            {/* FEELS LIKE INSIDE BOTTOM CONTAINER */}
            <div className='feels' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Feels-like</span></p>
              {data.main ? <p>{Math.round(data.main.feels_like)}°C</p> : null}
            </div>
            {/* ENDS */}

            {/* HUMIDITY INSIDE BOTTOM CONTAINER */}
            <div className='humidity' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Humidity</span></p>
              {data.main ? <p>{data.main.humidity}%</p> : null}
            </div>
            {/* ENDS */}

            {/* WIND INSIDE BOTTOM CONTAINER */}
            <div className='wind' style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <p><span>Wind speed</span></p>
              {data.wind ? <p>{Math.round(data.wind.speed)} mph</p> : null}
            </div>
            {/* ENDS */}
          </div>
          {/* BOTTOM CONTAINER ENDS */}
        </main>
      )}
      <CookieConsent /> 
      <PrivacySecurityConsent />
    </div>
  );
}

export default App;
