

import WeatherCard from "./WeatherCard";
import Loading from './Loading';
import Error from './Error';

export default function SearchForm({ state, actions }) {

  const { city, loading, error, weather } = state;
  const { setCity, handleSearch } = actions;

  return (
    <div className='col-md-10 offset-1'>
      <form className='row city-form ' onSubmit={handleSearch}>
        <div className="col-md-6">
          <input type="text" className="form-control"
            value={city} placeholder='City Name'
            onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary add-btn" type='submit'>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {/* Status Messages */}
      {loading && (<Loading loading={loading} />)}
      {error && (<Error error={error} />)}


      {/* 💡 NEW UI CARD: Displays only when 'weather' state is no longer null */}
      {weather && (
        <WeatherCard weather={weather} />
      )}
    </div>
  )

}