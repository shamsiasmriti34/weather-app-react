
import { IoMdSearch } from "react-icons/io";
import Loading from './Loading';
import Error from './Error';

export default function SearchForm({ state, actions }) {

  const { city, loading, error, weather } = state;
  const { setCity, handleSearch } = actions;

  return (
    <div className='row text-center'>
      <div className="card main-card">
        <div className="card-body d-flex justify-content-center">
          <form className='col-md-6 city-form text-center  ' onSubmit={handleSearch}>
            <div className="input-group mb-3 ">
              <input type="text" className="form-control"
                value={city} placeholder='Search for City'
                onChange={(e) => setCity(e.target.value)} />
                 <button className="btn btn-primary " type="submit">
                            <IoMdSearch size={28} />
                        </button>
            </div>
            {/* <div className="col-md-2">
              <button className="btn add-btn" type='submit'>
                 {loading ? 'Searching...' : 'Search'} 
                <IoMdSearch />
              </button>
            </div> */}
            
          </form>
        </div>
      </div>
      
      
      {loading && (<Loading loading={loading} />)}
      {error && (<Error error={error} />)}
    </div>
  )

}