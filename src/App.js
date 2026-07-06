
import { useState } from 'react';
import './Css/style.css';
import SearchForm from './component/SearchForm';
import Header from './component/Header'
import WeatherCard from './component/WeatherCard';
import ForecastCard from './component/ForecastList';
import FavoriteCity from './component/FavoriteCity';
import SearchHistory from './component/SearchHistory';
import useWeather from './hooks/useWeather';
import useHistory from './hooks/useHistory';
import useFavorite from './hooks/useFavorite';


function App() {
  const [city, setCity] = useState("");
  const { history, addToHistory, deleteHistoryItem, clearHistory } = useHistory();
  const { weather, loading, error, localCityName, searchWeather } = useWeather();
  const { favorite, addToFavorite, deleteFavoriteItem, clearFavorite } = useFavorite();

  async function handleSearch(e, passedCity = null) {
    if (e) {
      e.preventDefault();
    }

    const targetCity = passedCity || city;
    if (loading || !targetCity?.trim()) return;

    if(await searchWeather(targetCity)){
       addToHistory(targetCity);
    }
   
    setCity("");
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
            <WeatherCard weather={weather} favorite={favorite} addToFavorite={addToFavorite} deleteFavoriteItem={deleteFavoriteItem} />
          )}
          {weather && (
            <ForecastCard forecast={weather.forecast} />
          )}
        </div>
        <div className='col-md-3'>
          <FavoriteCity
            favorite={favorite}
            deleteFavoriteItem={deleteFavoriteItem}
            clearFavorite={clearFavorite}
            onCitySelect={handleCitySelect}
          />
          <SearchHistory
            history={history}
            onCitySelect={handleCitySelect}
            deleteHistoryItem={deleteHistoryItem}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;