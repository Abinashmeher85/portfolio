/**
 * Configuration for Weather App
 * API and app settings
 */

// API Configuration - Using Open-Meteo (free, no API key required)
const CONFIG = {
    // Open-Meteo API endpoints
    geocodingApi: 'https://geocoding-api.open-meteo.com/v1/search',
    weatherApi: 'https://api.open-meteo.com/v1/forecast',
    
    // Default settings
    defaults: {
        city: 'London',
        units: 'metric', // 'metric' or 'imperial'
        forecastDays: 7
    },
    
    // Weather condition codes mapping
    weatherCodes: {
        0: { description: 'Clear sky', icon: 'sun' },
        1: { description: 'Mainly clear', icon: 'sun' },
        2: { description: 'Partly cloudy', icon: 'cloud-sun' },
        3: { description: 'Overcast', icon: 'cloud' },
        45: { description: 'Foggy', icon: 'smog' },
        48: { description: 'Depositing rime fog', icon: 'smog' },
        51: { description: 'Light drizzle', icon: 'cloud-rain' },
        53: { description: 'Moderate drizzle', icon: 'cloud-rain' },
        55: { description: 'Dense drizzle', icon: 'cloud-rain' },
        56: { description: 'Light freezing drizzle', icon: 'snowflake' },
        57: { description: 'Dense freezing drizzle', icon: 'snowflake' },
        61: { description: 'Slight rain', icon: 'cloud-showers-heavy' },
        63: { description: 'Moderate rain', icon: 'cloud-showers-heavy' },
        65: { description: 'Heavy rain', icon: 'cloud-showers-heavy' },
        66: { description: 'Light freezing rain', icon: 'snowflake' },
        67: { description: 'Heavy freezing rain', icon: 'snowflake' },
        71: { description: 'Slight snow', icon: 'snowflake' },
        73: { description: 'Moderate snow', icon: 'snowflake' },
        75: { description: 'Heavy snow', icon: 'snowflake' },
        77: { description: 'Snow grains', icon: 'snowflake' },
        80: { description: 'Slight rain showers', icon: 'cloud-rain' },
        81: { description: 'Moderate rain showers', icon: 'cloud-rain' },
        82: { description: 'Violent rain showers', icon: 'cloud-showers-heavy' },
        85: { description: 'Slight snow showers', icon: 'snowflake' },
        86: { description: 'Heavy snow showers', icon: 'snowflake' },
        95: { description: 'Thunderstorm', icon: 'bolt' },
        96: { description: 'Thunderstorm with slight hail', icon: 'bolt' },
        99: { description: 'Thunderstorm with heavy hail', icon: 'bolt' }
    },
    
    // Unit labels
    units: {
        metric: {
            temperature: '°C',
            wind: 'km/h',
            precipitation: 'mm'
        },
        imperial: {
            temperature: '°F',
            wind: 'mph',
            precipitation: 'in'
        }
    }
};

// Export config
window.WEATHER_CONFIG = CONFIG;
