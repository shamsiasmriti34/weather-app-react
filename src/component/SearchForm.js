
import { IoMdSearch } from "react-icons/io";
import Loading from './Loading';
import Error from './Error';

export default function SearchForm({ state, actions }) {

  const { city, loading, error } = state;
  const { setCity, handleSearch } = actions;

  return (
    <div className='row text-center'>
      <div className="card shadow-sm border-0 rounded-4 main-card">
        <form className='card-body d-flex justify-content-center city-form text-center  ' onSubmit={handleSearch}>
          <div className="input-group mb-3 ">
            <input type="text" className="form-control"
              value={city} placeholder='Search for City'
              onChange={(e) => setCity(e.target.value)} />
            <button className="btn btn-primary " type="submit">
              {loading ? 'Searching...' : <IoMdSearch size={28} />}
              
            </button>
          </div>
        </form>
      </div>


      {loading && (<Loading loading={loading} />)}
      {error && (<Error error={error} />)}
    </div>
  )

}