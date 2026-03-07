/**
 * Weather Service Module
 * Handles API calls to Open-Meteo for weather data
 */

// Weather Service namespace
const weatherService = {
    /**
     * Search for a city using geocoding API
     * @param {string} query - City name to search
     * @returns {Promise<Array>} Array of matching cities
     */
    async searchCity(query) {
        if (!query || query.trim().length < 2) {
            return [];
        }

        try {
            const url = `${WEATHER_CONFIG.geocodingApi}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch city data');
            }
            
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error searching city:', error);
            throw error;
        }
    },

    /**
     * Get weather data for a specific location
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {string} units - Units system ('metric' or 'imperial')
     * @returns {Promise<Object>} Weather data object
     */
    async getWeatherData(lat, lon, units = 'metric') {
        // NEW: Strict validation to catch the 400 error cause before fetching
        if (lat === undefined || lon === undefined || lat === null || lon === null || isNaN(lat) || isNaN(lon)) {
            console.error(`🚨 Coordinate Error: getWeatherData received lat: ${lat}, lon: ${lon}`);
            throw new Error('Invalid coordinates provided to weather service.');
        }

        try {
            const params = new URLSearchParams({
                // NEW: Ensure they are parsed as numbers to be safe
                latitude: Number(lat),
                longitude: Number(lon),
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant',
                timezone: 'auto',
                // NEW: Added a fallback just in case WEATHER_CONFIG defaults are missing
                forecast_days: WEATHER_CONFIG.defaults?.forecastDays || 7
            });

            const url = `${WEATHER_CONFIG.weatherApi}?${params.toString()}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.status}`);
            }
            
            const data = await response.json();
            return this.parseWeatherData(data, units);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    },

    /**
     * Parse raw API response into organized weather data
     * @param {Object} data - Raw API response
     * @param {string} units - Units system
     * @returns {Object} Parsed weather data
     */
    parseWeatherData(data, units) {
        const current = data.current;
        const daily = data.daily;
        
        // Get weather description
        const weatherCode = current.weather_code;
        const weatherInfo = WEATHER_CONFIG.weatherCodes[weatherCode] || { 
            description: 'Unknown', 
            icon: 'question' 
        };

        // Convert temperature if imperial
        let currentTemp = current.temperature_2m;
        let feelsLike = current.apparent_temperature;
        let maxTemp = daily.temperature_2m_max[0];
        let minTemp = daily.temperature_2m_min[0];

        if (units === 'imperial') {
            currentTemp = this.celsiusToFahrenheit(currentTemp);
            feelsLike = this.celsiusToFahrenheit(feelsLike);
            maxTemp = this.celsiusToFahrenheit(maxTemp);
            minTemp = this.celsiusToFahrenheit(minTemp);
        }

        return {
            current: {
                temperature: Math.round(currentTemp),
                feelsLike: Math.round(feelsLike),
                humidity: current.relative_humidity_2m,
                pressure: Math.round(current.surface_pressure),
                windSpeed: Math.round(current.wind_speed_10m),
                windDirection: current.wind_direction_10m,
                windGusts: Math.round(current.wind_gusts_10m),
                precipitation: current.precipitation,
                cloudCover: current.cloud_cover,
                isDay: current.is_day === 1,
                weatherCode: weatherCode,
                description: weatherInfo.description,
                icon: weatherInfo.icon
            },
            daily: this.parseDailyForecast(daily, units),
            location: {
                timezone: data.timezone,
                timezoneOffset: data.timezone_offset
            }
        };
    },

    /**
     * Parse daily forecast data
     * @param {Object} daily - Daily data from API
     * @param {string} units - Units system
     * @returns {Array} Array of daily forecast objects
     */
    parseDailyForecast(daily, units) {
        const forecasts = [];
        const dates = daily.time;
        
        for (let i = 0; i < dates.length; i++) {
            let maxTemp = daily.temperature_2m_max[i];
            let minTemp = daily.temperature_2m_min[i];
            let feelsMax = daily.apparent_temperature_max[i];
            let feelsMin = daily.apparent_temperature_min[i];

            if (units === 'imperial') {
                maxTemp = this.celsiusToFahrenheit(maxTemp);
                minTemp = this.celsiusToFahrenheit(minTemp);
                feelsMax = this.celsiusToFahrenheit(feelsMax);
                feelsMin = this.celsiusToFahrenheit(feelsMin);
            }

            const weatherCode = daily.weather_code[i];
            const weatherInfo = WEATHER_CONFIG.weatherCodes[weatherCode] || { 
                description: 'Unknown', 
                icon: 'question' 
            };

            forecasts.push({
                date: dates[i],
                dayName: this.getDayName(dates[i]),
                maxTemp: Math.round(maxTemp),
                minTemp: Math.round(minTemp),
                feelsMax: Math.round(feelsMax),
                feelsMin: Math.round(feelsMin),
                precipitation: daily.precipitation_sum[i],
                precipitationProb: daily.precipitation_probability_max[i],
                windSpeed: Math.round(daily.wind_speed_10m_max[i]),
                weatherCode: weatherCode,
                description: weatherInfo.description,
                icon: weatherInfo.icon,
                sunrise: daily.sunrise[i],
                sunset: daily.sunset[i]
            });
        }

        return forecasts;
    },

    /**
     * Convert Celsius to Fahrenheit
     * @param {number} celsius - Temperature in Celsius
     * @returns {number} Temperature in Fahrenheit
     */
    celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    },

    /**
     * Get day name from date string
     * @param {string} dateStr - Date string
     * @returns {string} Day name
     */
    getDayName(dateStr) {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        }
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    },

    /**
     * Get wind direction as compass point
     * @param {number} degrees - Wind direction in degrees
     * @returns {string} Compass direction
     */
    getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                          'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }
};

// Export weather service
window.weatherService = weatherService;