import ForecastList from "./ForecastList";
import getWeatherInterpretation from "../Utils/weatherUtils";

export default function WeatherCard({ weather }) {

    
    const condition = getWeatherInterpretation(weather.weatherCode);

    return (
        <div className="card bg-light p-4 text-center mt-2 border-0 rounded-4">
            <h4 className="text-secondary mb-1">{weather.cityName}, {weather.countryName}</h4>

            {/* Large visual Emoji and Temp Display */}
            <div  className="my-2">
                {condition.emoji}
            </div>
            <h1 className="display-3 font-weight-bold mb-2">{weather.temp}°C</h1>

            {/* Human-readable text label */}
            <h5 className="text-dark font-weight-bold uppercase-text">{condition.label}</h5>
            <hr className="my-3 opacity-25" />

            <p className="text-muted mb-0 d-flex justify-content-center gap-2">
                <span>💨 Wind: <strong>{weather.windspeed} km/h</strong></span>
            </p>
            <ForecastList forecast={weather.forecast}  />
        </div>
    );

}

