export default function getWeatherInterpretation(code) {
    if (code === 0) return { label: 'Clear Sky', emoji: '☀️' };
    if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', emoji: '🌤️' };
    if (code === 45 || code === 48) return { label: 'Foggy', emoji: '🌫️' };
    if (code >= 51 && code <= 55) return { label: 'Drizzle', emoji: '🌧️' };
    if (code >= 61 && code <= 65) return { label: 'Rainy', emoji: '🌧️' };
    if (code >= 71 && code <= 75) return { label: 'Snowy', emoji: '❄️' };
    if (code >= 95 && code <= 99) return { label: 'Thunderstorm', emoji: '⛈️' };
    
    return { label: 'Unknown Conditions', emoji: '🌍' }; // Fallback protection
  }