import { FaTemperatureLow } from "react-icons/fa";
import getWeatherInterpretation from "../Utils/weatherUtils";

export default function ForecastList({ forecast }) {
    return (

        <div className=" text-center">


            {forecast.map((day) => (
                <ForecastRow key={day.date} day={day} />

            ))}
        </div>

    );

}
function ForecastRow({ day }) {
    const condition = getWeatherInterpretation(day.weatherCode,40);
    const formatter = new Intl.DateTimeFormat(
        "en-US",
        { weekday: "long" }
    );
    return (
        <div className="row card maini-card" key={day.date}>

            <div className="row card-body">
                <div className="col">
                    {condition.icon}
                    {formatter.format(new Date(day.date))}
                </div>
                <div className="col">
                    <p><b>{day.maxTemp}°C</b><br/> {day.minTemp}°C</p>
                </div>


            </div>
        </div>
    )

}

