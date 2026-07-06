
import { useState,useEffect } from "react";
import { fetchWeather, getLocalItem,setLocalItem } from '../Services/weatherService';
export default function useFavorite() {
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {

        async function initializeData() {


            const savedFav = getLocalItem("favorite_cities");
            
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
            setLocalItem("favorite_cities", namesToSave);
        } catch (err) {
            console.error("Could not add city to favorites:", err);
        }
    }

    const clearFavorite = () => {
        setFavorite([]);
        localStorage.removeItem("favorite_cities");
    };

    const deleteFavoriteItem = (cityToDelete) => {
        const updatedHistory = favorite.filter((item, index) => item.cityName.trim().toLowerCase() !== cityToDelete.trim().toLowerCase());
        setFavorite(updatedHistory);
        const namesToSave = updatedHistory.map(item => item.cityName);
        localStorage.setItem("favorite_cities", JSON.stringify(namesToSave));
    };
    return { favorite, addToFavorite, deleteFavoriteItem, clearFavorite };

}