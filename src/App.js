
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
  
  const { history, addToHistory, deleteHistoryItem, clearHistory } = useHistory();
  const { weather, loading, error, localCityName, searchWeather } = useWeather();
  const { favorite, addToFavorite, removeFavoriteItem, clearFavorite } = useFavorite();

  async function handleSearch(city) {
   
    if(await searchWeather(city)){
       addToHistory(city);
       return true;
    }
   
  }

  return (
    <div className="container App">
      <Header cityName={localCityName} />
      <div className='row'>
        <div className='col-md-9'>
          <SearchForm
            loading={ loading}
            error={error}
            handleSearch={handleSearch}
          />
          {weather && (
            <WeatherCard weather={weather} 
            favorite={favorite} 
            addToFavorite={addToFavorite} 
            removeFavoriteItem={removeFavoriteItem} />
          )}
          {weather && (
            <ForecastCard forecast={weather.forecast} />
          )}
        </div>
        <div className='col-md-3'>
          <FavoriteCity
            favorite={favorite}
            removeFavoriteItem={removeFavoriteItem}
            clearFavorite={clearFavorite}
            onCitySelect={handleSearch}
          />
          <SearchHistory
            history={history}
            onCitySelect={handleSearch}
            deleteHistoryItem={deleteHistoryItem}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;