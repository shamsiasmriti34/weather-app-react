export async function fetchGeoData({ city }) {
    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    return await geoResponse.json();

}
export async function fetchWeather({ geoData }) {

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not Found! Please try another name.');
      }

    const { latitude, longitude, name, country, timezone } = geoData.results[0];

      const now = new Date();
      
      const localTimeStr = getLocalTime({timezone,now});

      const localDayStr = getLocalDay({timezone,now});

    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const weatherData = await weatherResponse.json();

    const weather = {
        cityName: name,
        countryName: country,
        time:localTimeStr,
        day:localDayStr,
        temp: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weatherCode: weatherData.current_weather.weathercode,
        forecast: weatherData.daily.time.map((date, index) => ({
            date,
            maxTemp: weatherData.daily.temperature_2m_max[index],
            minTemp: weatherData.daily.temperature_2m_min[index],
            weatherCode: weatherData.daily.weathercode[index]
        }))
    }
    return weather;
}

function getLocalTime({timezone,now}){
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,     
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true           
      }).format(now);
}

function getLocalDay({timezone,now}){
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long'
      }).format(now);

}