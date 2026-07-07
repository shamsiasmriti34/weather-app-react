import { getLocalTime, getLocalDay } from '../Utils/dateUtil';

export async function fetchCityName(lat, lon) {
    return await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
    );
}

export async function fetchGeoData(city) {
    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    return await geoResponse.json();

}

export async function fetchWeather(city) {
    const geoData = await fetchGeoData(city);
    if (!geoData.results || geoData.results.length === 0) {
        return;
    }

    const { latitude, longitude, name, country, timezone } = geoData.results[0];
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const weatherData = await weatherResponse.json();
        const now = new Date();

        const localTimeStr = getLocalTime(timezone, now);

        const localDayStr = getLocalDay(timezone, now);
        const weather = {
            cityName: name,
            countryName: country,
            time: localTimeStr,
            day: localDayStr,
            latitude: latitude,
            longitude: longitude,
            temp: weatherData.current_weather.temperature,
            windspeed: weatherData.current_weather.windspeed,
            weatherCode: weatherData.current_weather.weathercode,
            todayHigh: weatherData.daily.temperature_2m_max[0],
            todayLow: weatherData.daily.temperature_2m_min[0],
            forecast: weatherData.daily.time.map((date, index) => ({
                date,
                maxTemp: weatherData.daily.temperature_2m_max[index],
                minTemp: weatherData.daily.temperature_2m_min[index],
                weatherCode: weatherData.daily.weathercode[index]
            }))
        }
         return weather;
}

export function getLocalStorage(itemTitle){
    return  JSON.parse(localStorage.getItem(itemTitle)) || []
}
export function setLocalStorage(itemTitle, item){
    const data=JSON.stringify(item)
   localStorage.setItem(itemTitle,data);

}