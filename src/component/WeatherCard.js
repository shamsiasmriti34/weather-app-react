

import ForecastList from "./ForecastList";
import getWeatherInterpretation from "../Utils/weatherUtils";

export default function WeatherCard({ weather }) {


    const condition = getWeatherInterpretation(weather.weatherCode,90);

    return (
        <>

            <div className="card main-card text-center rounded-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="text-secondary mb-1">{weather.cityName}, {weather.countryName}</h4>
                            <h5>{weather.time}, {weather.day}</h5>

                            {/* Large visual Emoji and Temp Display */}
                            <div className="my-2">
                                {condition.icon}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h1 className="display-3 font-weight-bold mb-2">{weather.temp}°C</h1>

                            {/* Human-readable text label */}
                            <h5 className="text-dark font-weight-bold uppercase-text">{condition.label}</h5>
                            

                            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                                <span>💨 Wind: <strong>{weather.windspeed} km/h</strong></span>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
           
        </>
    );

}

