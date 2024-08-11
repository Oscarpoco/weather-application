// import React from 'react';
// import './WeatherForecast.css'

// const WeatherForecast = ({ forecastData, unit }) => {
//   // Split forecast data into daily and hourly
//   const dailyForecast = [];
//   const hourlyForecast = [];

//   forecastData.forEach((item) => {
//     const date = new Date(item.dt * 1000);
//     const hour = date.getHours();
//     const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

//     // Group by day, limit to 7 days
//     if (!dailyForecast.some(forecast => forecast.day === day) && dailyForecast.length < 7) {
//       dailyForecast.push({ day, temp: item.main.temp, weather: item.weather[0].description });
//     }

//         // Group by hours, limit to 12 hours from 00:00 to 23:00
//         if (hourlyForecast.length < 12 && hour % 1 === 0) {
//           hourlyForecast.push({
//             time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//             temp: item.main.temp,
//             weather: item.weather[0].description
//           });
//         }
//       });
    
//       return (
//         <div className="weather-forecast">
//           <div className="daily-forecast">
//           <p><span>Daily forecast</span></p>
//             {dailyForecast.length > 0 ? (
//               <div className="forecast-row">
//                 {dailyForecast.map((day, index) => (
//                   <div key={index} className="daily-item">
//                     <p>Date: {day.day}</p>
//                     <p>Temp: {Math.round(day.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
//                     <p>Weather: {day.weather}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No daily forecast data available.</p>
//             )}
//           </div>
    
//           <div className="hourly-forecast">
//           <p><span>Hourly forecast</span></p>
//             {hourlyForecast.length > 0 ? (
//               <div className="forecast-row">
//                 {hourlyForecast.map((hour, index) => (
//                   <div key={index} className="hourly-item">
//                     <p>Time: {hour.time}</p>
//                     <p>Temp: {Math.round(hour.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
//                     <p>Weather: {hour.weather}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No hourly forecast data available.</p>
//             )}
//           </div>
//         </div>
//       );
//     };
    
//     export default WeatherForecast;
    




import React from 'react';
import './WeatherForecast.css';

// Function to interpolate hourly data from 3-hour intervals to 1-hour intervals
const interpolateHourlyData = (forecastData) => {
  const hourlyForecast = [];

  for (let i = 0; i < forecastData.length - 1; i++) {
    const current = forecastData[i];
    const next = forecastData[i + 1];

    const currentDate = new Date(current.dt * 1000);
    const nextDate = new Date(next.dt * 1000);

    const currentHour = currentDate.getHours();
    const nextHour = nextDate.getHours();

    const hourDifference = (nextHour - currentHour + 24) % 24 || 1;
    const tempDifference = (next.main.temp - current.main.temp) / hourDifference;
    const weather = current.weather[0].description;

    for (let j = 0; j < hourDifference; j++) {
      hourlyForecast.push({
        time: new Date(currentDate.getTime() + j * 3600 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(current.main.temp + tempDifference * j),
        weather: weather,
      });
    }
  }

  return hourlyForecast;
};

const WeatherForecast = ({ forecastData, unit }) => {
  const dailyForecast = [];
  const hourlyForecast = interpolateHourlyData(forecastData);

  forecastData.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    if (!dailyForecast.some(forecast => forecast.day === day) && dailyForecast.length < 7) {
      dailyForecast.push({ day, temp: item.main.temp, weather: item.weather[0].description });
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
