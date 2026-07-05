
import { useState,useEffect } from "react";
import { fetchWeather } from '../Services/weatherService';
export default function UseFavorite() {
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {

        async function initializeData() {


            const savedFav = JSON.parse(localStorage.getItem("favorite_cities")) || [];
            try {
                const weatherPromises = savedFav.map(city => fetchWeather(city));
                const results = await Promise.all(weatherPromises);
                const validResults = results.filter(data => data !== undefined);
                setFavorite(validResults);
            } catch (err) {
                console.error("Failed to load favorite cities weather:", err);
            }

        }

        initializeData();
    }, []);

    const addToFavorite = async (cityToAdd) => {

        const favCityName = cityToAdd.trim();
        const isDuplicate = favorite.some(
            (item) => item.cityName.toUpperCase() === favCityName.toUpperCase()
        );
        if (isDuplicate) return;

        try {

            const favWeatherData = await fetchWeather(favCityName);
            if (!favWeatherData) return;


            const newFavoriteState = [favWeatherData, ...favorite].slice(0, 5);
            setFavorite(newFavoriteState);


            const namesToSave = newFavoriteState.map(item => item.cityName);
            localStorage.setItem("favorite_cities", JSON.stringify(namesToSave));
        } catch (err) {
            console.error("Could not add city to favorites:", err);
        }
    }

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
    return { favorite, addToFavorite, deleteFavoriteItem, clearFavorite };

}