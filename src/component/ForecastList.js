import getWeatherInterpretation from "../Utils/weatherUtils";

export default function ForecastCard({ forecast }) {
    return (

        <div className="d-flex flex-nowrap justify-content-between g-1 text-center mt-3 overflow-x-auto pb-2">
            {forecast.map((day) => (
                <div
                    className="flex-grow-1"
                    key={day.date}
                    style={{ minWidth: "0", flexBasis: "0" }}
                >
                    <ForecastRow day={day} />
                </div>
            ))}
        </div>
    );
}

function ForecastRow({ day }) {
    const condition = getWeatherInterpretation(day.weatherCode, 30);
    const formatter = new Intl.DateTimeFormat(
        "en-US",
        { weekday: "short" }
    );

    return (
        <div className="card shadow-sm border-0 h-100 mx-1">

            <div className="card-body d-flex flex-column align-items-center justify-content-between py-2 px-1">
                <div>

                    <p className="mb-1 fw-semibold small">{formatter.format(new Date(day.date))}</p>
                </div>

                <div className="fs-4 my-1 text-primary">
                    {condition.icon}
                </div>
                <p className="small text-muted">

                    {condition.label}

                </p>

                <div className="w-100">

                    <div className="small lh-sm">
                        <span className="fw-bold text-dark d-block">{day.maxTemp}°</span>
                        <span className="text-muted d-block small">{day.minTemp}°</span>
                    </div>
                </div>
            </div>
        </div>
    );
}