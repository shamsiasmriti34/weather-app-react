
import getWeatherInterpretation from "../Utils/weatherUtils";

export default function ForecastList({ forecast }) {
    return (

        <table className="table">

            <thead>
            </thead>
            <tbody>
                {forecast.map((day) => (
                    <ForecastRow key={day.date} day={day} />

                ))}
            </tbody>
        </table>

    );

}
function ForecastRow({day}) {
    const condition = getWeatherInterpretation(day.weatherCode);
    const formatter = new Intl.DateTimeFormat(
        "en-US",
        { weekday: "long" }
    );
    return (
        <tr key={day.date}>

            <td>
                {condition.emoji}
                {formatter.format(new Date(day.date))}

            </td>

            <td>{day.maxTemp}°C</td>

            <td>{day.minTemp}°C</td>

        </tr>
    )

}

