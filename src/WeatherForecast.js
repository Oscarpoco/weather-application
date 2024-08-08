// WeatherForecast.js
import React from 'react';
import './WeatherForecast.css'

const WeatherForecast = ({ daily, hourly }) => {
  return (
    <div className="weather-forecast">
      {/* Daily Forecast */}
      <div className="daily-forecast">
        <p>Daily Forecast</p>
        <ul>
          {daily.map((day, index) => (
            <li key={index}>
              <span>{new Date(day.dt * 1000).toLocaleDateString()}</span>
              <span>{Math.round(day.temp.day)}°C</span>
              <span>{day.weather[0].main}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hourly Forecast */}
      <div className="hourly-forecast">
        <p>Hourly Forecast</p>
        <ul>
          {hourly.map((hour, index) => (
            <li key={index}>
              <span>{new Date(hour.dt * 1000).toLocaleTimeString()}</span>
              <span>{Math.round(hour.temp)}°C</span>
              <span>{hour.weather[0].main}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherForecast;
