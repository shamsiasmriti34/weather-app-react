import { 
  IoSunny, 
  IoCloudyNight, // fallback if needed, but we use PartSunny
  IoPartlySunny, 
  IoCloud, 
  IoRainy, 
  IoSnow, 
  IoThunderstorm, 
  IoEarth 
} from 'react-icons/io5';
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
    if (code >= 51 && code <= 55) {
        return { label: 'Drizzle', icon: <IoRainy size={size} color="#60a5fa" /> };
    }
    if (code >= 61 && code <= 65) {
        return { label: 'Rainy', icon: <IoRainy size={size} color="#2563eb" /> };
    }
    if (code >= 71 && code <= 75) {
        return { label: 'Snowy', icon: <IoSnow size={size} color="#93c5fd" /> };
    }
    if (code >= 95 && code <= 99) {
        return { label: 'Thunderstorm', icon: <IoThunderstorm size={size} color="#475569" /> };
    }
    
    return { label: 'Unknown Conditions', icon: <IoEarth size={size} color="#10b981" /> }; // Fallback protection
}