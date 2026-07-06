import { useState } from "react";
import {getLocalItem,setLocalItem } from '../Services/weatherService';
export default function useWeather(){
    const [history, setHistory] = useState(() => {
     const saved = getLocalItem("weather_history");
     return saved ? saved : [];
  });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("weather_history")) || [];
//     setHistory(saved);
//   }, []);

  const addToHistory = (targetCity) => {
    const normalizedQuery = targetCity.trim();
    if (!normalizedQuery) return;

    const cleanHistory = history.filter(
      (item) => item.toUpperCase() !== normalizedQuery.toUpperCase()
    );
    const newHistory = [normalizedQuery, ...cleanHistory].slice(0, 5);
    
    setHistory(newHistory);
    setLocalItem("weather_history", newHistory);
  };

  const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("weather_history");
    };

    // Delete a single item by its index
    const deleteHistoryItem = (cityToDelete) => {
        const updatedHistory = history.filter((city) => city !== cityToDelete);
        setHistory(updatedHistory);
        localStorage.setItem("weather_history", JSON.stringify(updatedHistory));
    };


  

  return { history, addToHistory,deleteHistoryItem,clearHistory };
}