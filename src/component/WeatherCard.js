

import getWeatherInterpretation from "../Utils/weatherUtils";
import { IoHeartSharp } from 'react-icons/io5';

export default function WeatherCard({ weather, favorite, addToFavorite }) {


    const condition = getWeatherInterpretation(weather.weatherCode, 120);
    const isFavorite = favorite.some(
        (item) => item.cityName.trim().toLowerCase() === weather.cityName.trim().toLowerCase()
    );

    return (
        <div className="row">
            <div className="card shadow-sm border-0 rounded-4 main-card text-center">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">

                            <p className="text-muted mb-0 d-flex justify-content-center gap-2" >
                                📍<strong>{weather.cityName}, {weather.countryName}</strong>
                            </p>

                            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                                🕒 <strong> {weather.day}.{weather.time} </strong>
                            </p>

                            <div className="my-2">
                                {condition.icon}
                            </div>
                            <h5 className="text-dark font-weight-bold uppercase-text">{condition.label}</h5>
                        </div>
                        <div className="col-md-6 text-center">
                            <h1 className="display-3 font-weight-bold mb-2">{weather.temp}°C</h1>


                            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                                💨 Wind
                            </p>
                            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                                <strong>{weather.windspeed} km/h</strong>
                            </p>
                            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                                <span>🌡 High / Low<strong></strong></span>
                            </p>
                            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                                <span><strong>{weather.todayHigh}°C / {weather.todayLow}°C</strong></span>
                            </p>
                            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                                <span>
                                    <button
                                        className="btn btn-sm btn-link text-secondary text-decoration-none p-0 lh-1 fs-5"
                                        title="Add to Favorite"
                                        onClick={() => addToFavorite(weather.cityName)}
                                    >
                                         {isFavorite ? <IoHeartSharp size={40} color="red" /> : <IoHeartSharp size={40} className="favorite-item" />}
                                        
                                    </button>
                                </span>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );

}

