import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';
import CommonSidebar from './CommonSidebar';

export default function FavoriteCity({ favorite, removeFavoriteItem, clearFavorite, onCitySelect, }) {


    return (
        <div className="card shadow-sm border-0 rounded-4 mt-4 overflow-hidden">
            <CommonSidebar data={favorite} clearFunction={clearFavorite} title="Favorite Cities" />
            <div className="card-body p-0">
                {favorite.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {favorite.map((data, index) => (
                            <FavoriteList
                                key={data.cityName}
                                data={data}
                                onCitySelect={onCitySelect}
                                onDelete={removeFavoriteItem}
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

export function FavoriteList({ data, onCitySelect, onDelete }) {
    return (
        <li className="list-group-item d-flex align-items-start list-group-item-action px-4 py-3">
            {/* Heart Icon stays fixed on the left side */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(data.cityName);
                }}
                className="btn btn-sm btn-link text-secondary text-decoration-none p-0 lh-1 fs-5 mt-1"
                title="Delete from favorites"
                style={{ width: '24px', height: '24px', flexShrink: 0 }}
            >
                <IoHeartSharp className="favorite-item-active" />
            </button>

            {/* RESPONSIVE CONTAINER: Row on mobile -> Column on tablet sidebar -> Row on large desktop */}
            <button
                role="button"
                onClick={() => onCitySelect(data.cityName)}
                className="flex-row flex-md-column flex-xl-row align-items-center align-items-md-start align-items-xl-center favorite-info-list"
            >
                {/* Left side column: City Name */}
                <div className="mb-0 mb-md-2 mb-xl-0">
                    <h4 className="h6 mb-0 fw-bold text-dark">
                        {data.cityName}
                    </h4>
                    <p className=" mb-0 text-dark d-inline d-md-block d-xl-inline me-2 me-md-0 me-xl-0">
                        {data.temp}°C
                    </p>
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
            </button>
        </li>
    );
}