import React from 'react';

const WeatherForecast = ({ daily, hourly }) => {
  return (
    <div className="weather-forecast">
      <div className="daily-forecast">
        {daily && daily.length > 0 ? (
          daily.map((day, index) => (
            <div key={index} className="daily-item">
              <p>Date: {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <p>Temp: {Math.round(day.temp.day)}°C</p>
              <p>Weather: {day.weather[0].description}</p>
            </div>
          ))
        ) : (
          <p>No daily forecast data available.</p>
        )}
      </div>

      <div className="hourly-forecast">
        {hourly && hourly.length > 0 ? (
          hourly.slice(0, 12).map((hour, index) => (
            <div key={index} className="hourly-item">
              <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              <p>Temp: {Math.round(hour.temp)}°C</p>
              <p>Weather: {hour.weather[0].description}</p>
            </div>
          ))
        ) : (
          <p>No hourly forecast data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
