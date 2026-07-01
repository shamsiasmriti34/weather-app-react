
import { useState } from 'react';
import './Css/style.css';
import SearchForm from './component/SearchForm';
import Header from './component/Header'
import WeatherCard from "./component/WeatherCard";
import ForecastList from "./component/ForecastList";
import { fetchGeoData, fetchWeather } from './Services/weatherService';


function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);



  async function handleSearch(e) {
    e.preventDefault();
    if (loading || !city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {

      const geoData = await fetchGeoData({ city });

      const weatherData = await fetchWeather({ geoData });

      setWeather(weatherData);

    } catch (err) {
      setError(err.message);

    }
    finally {
      setLoading(false);
      setCity("");
    }
  }
  return (
    <div className="container App">
      <Header />
      <div className='row'>
        <div className='col-md-8'>

          <SearchForm state={{
            city,
            loading,
            error,
          }}
            actions={{
              setCity,
              handleSearch,
            }} />

          {weather && (
            <WeatherCard weather={weather} />
          )}

        </div>
        <div className='col-md-4'>
          {weather && (
            <ForecastList forecast={weather.forecast} />
          )}

        </div>
      </div>


    </div>
  );
}

export default App;
