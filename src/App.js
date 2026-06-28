
import { useState } from 'react';
import './Css/bootstrap.min.css';
import './Css/style.css';
import SearchForm from './component/SearchForm';
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
    <div className="App">

      <SearchForm state={{
        city,
        loading,
        error,
        weather,
      }}
        actions={{
          setCity,
          handleSearch,
        }} />

    </div>
  );
}

export default App;
