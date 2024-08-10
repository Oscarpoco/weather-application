import React from 'react';
import './WeatherForecast.css'

const WeatherForecast = ({ forecastData, unit }) => {
  // Split forecast data into daily and hourly
  const dailyForecast = [];
  const hourlyForecast = [];

  forecastData.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // Group by day, limit to 7 days
    if (!dailyForecast.some(forecast => forecast.day === day) && dailyForecast.length < 7) {
      dailyForecast.push({ day, temp: item.main.temp, weather: item.weather[0].description });
    }

        // Group by hours, limit to 12 hours from 00:00 to 23:00
        if (hourlyForecast.length < 12 && hour % 1 === 0) {
          hourlyForecast.push({
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            temp: item.main.temp,
            weather: item.weather[0].description
          });
        }
      });
    
      return (
        <div className="weather-forecast">
          <div className="daily-forecast">
          <p><span>Daily forecast</span></p>
            {dailyForecast.length > 0 ? (
              <div className="forecast-row">
                {dailyForecast.map((day, index) => (
                  <div key={index} className="daily-item">
                    <p>Date: {day.day}</p>
                    <p>Temp: {Math.round(day.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Weather: {day.weather}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No daily forecast data available.</p>
            )}
          </div>
    
          <div className="hourly-forecast">
          <p><span>Hourly forecast</span></p>
            {hourlyForecast.length > 0 ? (
              <div className="forecast-row">
                {hourlyForecast.map((hour, index) => (
                  <div key={index} className="hourly-item">
                    <p>Time: {hour.time}</p>
                    <p>Temp: {Math.round(hour.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Weather: {hour.weather}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hourly forecast data available.</p>
            )}
          </div>
        </div>
      );
    };
    
    export default WeatherForecast;
    