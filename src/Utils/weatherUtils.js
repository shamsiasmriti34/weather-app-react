import { 
  IoSunny, 
  IoPartlySunny, 
  IoCloud, 
  IoRainy, 
  IoSnow, 
  IoThunderstorm, 
  IoEarth 
} from 'react-icons/io5';
import { FaCloudShowersHeavy } from "react-icons/fa6";
export default function getWeatherInterpretation(code,size) {
    if (code === 0) {
        return { label: 'Clear Sky', icon: <IoSunny size={size} color="#f1c40f" /> };
    }
    if (code >= 1 && code <= 3) {
        return { label: 'Partly Cloudy', icon: <IoPartlySunny size={size} color="#94a3b8" /> };
    }
    if (code === 45 || code === 48) {
        return { label: 'Foggy', icon: <IoCloud size={size} color="#cbd5e1" style={{ opacity: 0.7 }} /> };
    }
    if (code >= 51 && code <= 57) {
        return { label: 'Drizzle', icon: <IoRainy size={size} color="#60a5fa" /> };
    }
    if (code >= 61 && code <= 67) {
        return { label: 'Rainy', icon: <IoRainy size={size} color="#2563eb" /> };
    }
    if (code >= 71 && code <= 77) {
        return { label: 'Snowy', icon: <IoSnow size={size} color="#93c5fd" /> };
    }
    if (code >= 80 && code <= 86) {
        return { label: 'Showers', icon: <FaCloudShowersHeavy size={size} color="#60a5fa" /> };
    }
    if (code >= 95 && code <= 99) {
        return { label: 'Thunderstorm', icon: <IoThunderstorm size={size} color="#475569" /> };
    }
    
    return { label: 'Unknown Conditions', icon: <IoEarth size={size} color="#10b981" /> }; // Fallback protection
}

function convertCelsiustoFahrenheit(celsius, shouldRound = true) {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return shouldRound ? Math.round(fahrenheit) : parseFloat(fahrenheit.toFixed(1));
}

export function fahrenheitToCelsius(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5) / 9);
}