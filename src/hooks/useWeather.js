import { useState, useEffect } from "react";
import { fetchWeather, fetchCityName } from '../Services/weatherService';

export default function useWeather() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(null);
    const [localCityName, setLocalCityName] = useState("");

    useEffect(() => {

        async function initializeData() {

            if (!navigator.geolocation) {
                setError("Geolocation is not supported by your browser");
                return;
            }

            setLoading(true);
            setError("");

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const geoResponse = await fetchCityName(lat, lon);
                        const geoData = await geoResponse.json();

                        const cityName = geoData.address.city || geoData.address.town || geoData.address.village || "Unknown Location";
                       // setLocalCityName(cityName);
                        const countryName = geoData.address.country || "";

                        const fullLocation = cityName !== "Unknown Location" && countryName
                            ? `${cityName}, ${countryName}`
                            : countryName || cityName;

                        
                        setLocalCityName(fullLocation);

                        const weatherData = await fetchWeather(cityName);

                        setWeather(weatherData);
                    } catch (err) {
                        setError("Failed to determine city name from location.");
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    setLoading(false);
                    if (error.code === 1) {
                        setError("Location access denied. Please type your city manually.");
                    } else {
                        setError("Unable to retrieve your location.");
                    }
                }
            );
        }

        initializeData();
    }, []);

    const searchWeather = async (targetCity) => {
        setLoading(true);
        setError("");

        try {

            const weatherData = await fetchWeather(targetCity);
            if (!weatherData) {
                setError("No city found. Please check the spelling and try again.");
                return false;
            }
            setWeather(weatherData);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, localCityName, searchWeather };

}