import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';

export default function FavoriteCity({ favorite, setFavorite, onCitySelect }) {

    const clearFavorite = () => {
        setFavorite([]);
        localStorage.removeItem("favorite_cities");
    };

    const deleteFavoriteItem = (indexToDelete) => {
        const updatedHistory = favorite.filter((_, index) => index !== indexToDelete);
        setFavorite(updatedHistory);
        const namesToSave = updatedHistory.map(item => item.cityName);
        localStorage.setItem("favorite_cities", JSON.stringify(namesToSave));
    };

    return (
        <div className="card shadow-sm border-0 rounded-4 mt-4 overflow-hidden">
            <div className="card-header bg-white border-0 pt-4 pb-2 px-4 d-flex justify-content-between align-items-center">
                <h3 className="card-title fs-6 text-secondary text-uppercase fw-bold m-0" style={{ letterSpacing: '0.05em' }}>
                    Favorite Cities
                </h3>
                {favorite.length > 0 && (
                    <button
                        onClick={clearFavorite}
                        className="btn btn-link btn-sm text-danger p-0 text-decoration-none fw-semibold"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="card-body p-0">
                {favorite.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {favorite.map((data, index) => (
                            <FavoriteList
                                key={index}
                                data={data}
                                index={index}
                                onCitySelect={onCitySelect}
                                onDelete={deleteFavoriteItem}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="text-muted text-center py-4 fs-7">
                        no Favorite City Added
                    </div>
                )}
            </div>
        </div>
    );
}

function FavoriteList({ data, index, onCitySelect, onDelete }) {
    return (
        <li className="list-group-item d-flex align-items-start list-group-item-action px-4 py-3">
            {/* Heart Icon stays fixed on the left side */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                }}
                className="btn btn-sm btn-link text-secondary text-decoration-none p-0 lh-1 fs-5 mt-1"
                title="Delete from favorites"
                style={{ width: '24px', height: '24px', flexShrink: 0 }}
            >
                <IoHeartSharp className="favorite-item-active" />
            </button>

            {/* RESPONSIVE CONTAINER: Row on mobile -> Column on tablet sidebar -> Row on large desktop */}
            <div
                role="button"
                onClick={() => onCitySelect(data.cityName)}
                className="d-flex flex-row flex-md-column flex-xl-row justify-content-between align-items-center align-items-md-start align-items-xl-center flex-grow-1 ms-3"
            >
                {/* Left side column: City Name */}
                <div className="mb-0 mb-md-2 mb-xl-0">
                    <h4 className="h6 mb-0 fw-bold text-dark">
                        {data.cityName}
                    </h4>
                    <h4 className="h6 mb-0 fw-bold text-dark d-inline d-md-block d-xl-inline me-2 me-md-0 me-xl-0">
                        {data.temp}°C
                    </h4>
                </div>

                {/* Right side column: Temperatures */}
                <div className="text-end text-md-start text-xl-end lh-sm">
                    <h4 className="h6 mb-0 fw-bold text-dark me-2 me-md-0 me-xl-0">
                        High/Low
                    </h4>
                    <span className="text-secondary small fw-semibold d-inline-block d-md-block d-xl-inline-block">
                        <strong>{data.todayHigh}°C</strong> / {data.todayLow}°C
                    </span>
                </div>
            </div>
        </li>
    );
}