
import { useState, useEffect } from 'react';
import './Css/style.css';
import SearchForm from './component/SearchForm';
import Header from './component/Header'
import WeatherCard from './component/WeatherCard';
import ForecastCard from './component/ForecastList';
import FavoriteCity from './component/FavoriteCity';
import SearchHistory from './component/SearchHistory';
import { fetchGeoData, fetchWeather, fetchCityName, fetchFavoriteCityData } from './Services/weatherService';


function App() {
  const [city, setCity] = useState("");
  const [localCityName, setLocalCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("weather_history")) || [];
    setHistory(saved);

    
    async function initializeData() {

      
      const savedFav = JSON.parse(localStorage.getItem("favorite_cities")) || [];
      try {
        const weatherPromises = savedFav.map(city => fetchFavoriteCityData(city));
        const results = await Promise.all(weatherPromises);
        const validResults = results.filter(data => data !== undefined);
        setFavorite(validResults);
        //console.log(validResults);
      } catch (err) {
        console.error("Failed to load favorite cities weather:", err);
      }

    
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      setLoading(true);
      setError("");
      setWeather(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const geoResponse = await fetchCityName(lat, lon);
            const geoData = await geoResponse.json();

            const cityName = geoData.address.city || geoData.address.town || geoData.address.village || "Unknown Location";
            setLocalCityName(cityName);

            const geoDataForWeather = await fetchGeoData(cityName);
            const weatherData = await fetchWeather({ geoData: geoDataForWeather });

            setWeather(weatherData);
          } catch (err) {
            setError("Failed to determine city name from location.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
          if (error.code === 1) {
            setError("Location access denied. Please type your city manually.");
          } else {
            setError("Unable to retrieve your location.");
          }
        }
      );
    }

    initializeData();
  }, []);

  
  async function addToFavorite(cityToAdd) {
    const favCityName = cityToAdd.trim();

   
    const isDuplicate = favorite.some(
      (item) => item.cityName.toUpperCase() === favCityName.toUpperCase()
    );
    if (isDuplicate) return;

    try {
     
      const favWeatherData = await fetchFavoriteCityData(favCityName);
      if (!favWeatherData) return;

     
      const newFavoriteState = [favWeatherData, ...favorite].slice(0, 5);
      setFavorite(newFavoriteState);

      
      const namesToSave = newFavoriteState.map(item => item.cityName);
      localStorage.setItem("favorite_cities", JSON.stringify(namesToSave));
    } catch (err) {
      console.error("Could not add city to favorites:", err);
    }
  }

  async function handleSearch(e, passedCity = null) {
    if (e) {
      e.preventDefault();
    }

    const targetCity = passedCity || city;
    if (loading || !targetCity?.trim()) return;

    const normalizedQuery = targetCity.trim();
    const cleanHistory = history.filter((item) => item.toUpperCase() !== normalizedQuery.toUpperCase());
    const newHistory = [normalizedQuery, ...cleanHistory].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("weather_history", JSON.stringify(newHistory));

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoData = await fetchGeoData(targetCity);
      const weatherData = await fetchWeather({ geoData });
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setCity("");
    }
  }
  const handleCitySelect = (cityName) => {
  handleSearch(null, cityName);
};

  return (
    <div className="container App">
      <Header cityName={localCityName} />
      <div className='row'>
        <div className='col-md-9'>
          <SearchForm 
            state={{ city, loading, error }}
            actions={{ setCity, handleSearch }} 
          />
          {weather && (
            <WeatherCard weather={weather} favorite={favorite} addToFavorite={addToFavorite} />
          )}
          {weather && (
            <ForecastCard forecast={weather.forecast} />
          )}
        </div>
        <div className='col-md-3'>
          <FavoriteCity favorite={favorite} setFavorite={setFavorite} onCitySelect={handleCitySelect} />
          <SearchHistory history={history} setHistory={setHistory} onCitySelect={handleCitySelect} />
        </div>
      </div>
    </div>
  );
}

export default App;