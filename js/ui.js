/**
 * UI Module for Weather App
 * Handles all DOM manipulations and display logic
 */

// UI namespace
const ui = {
    // DOM Elements
    elements: {
        searchInput: null,
        searchBtn: null,
        searchResults: null,
        currentWeather: null,
        temperature: null,
        feelsLike: null,
        humidity: null,
        wind: null,
        description: null,
        weatherIcon: null,
        forecast: null,
        recentSearches: null,
        loading: null,
        error: null,
        themeToggle: null,
        unitToggle: null,
        currentCity: null,
        currentCountry: null,
        currentDate: null
    },

    /**
     * Initialize UI elements
     */
    init() {
        this.elements = {
            searchInput: document.getElementById('search-input'),
            searchBtn: document.getElementById('search-btn'),
            searchResults: document.getElementById('search-results'),
            currentWeather: document.getElementById('current-weather'),
            temperature: document.getElementById('temperature'),
            feelsLike: document.getElementById('feels-like'),
            humidity: document.getElementById('humidity'),
            wind: document.getElementById('wind'),
            pressure: document.getElementById('pressure'),
            description: document.getElementById('weather-description'),
            weatherIcon: document.getElementById('weather-icon'),
            forecast: document.getElementById('forecast'),
            recentSearches: document.getElementById('recent-searches'),
            loading: document.getElementById('loading'),
            error: document.getElementById('error-message'),
            themeToggle: document.getElementById('theme-toggle'),
            unitToggle: document.getElementById('unit-toggle'),
            currentCity: document.getElementById('current-city'),
            currentCountry: document.getElementById('current-country'),
            currentDate: document.getElementById('current-date')
        };
    },

    /**
     * Show loading state
     */
    showLoading() {
        if (this.elements.loading) {
            this.elements.loading.classList.add('active');
        }
        this.hideError();
    },

    /**
     * Hide loading state
     */
    hideLoading() {
        if (this.elements.loading) {
            this.elements.loading.classList.remove('active');
        }
    },

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        if (this.elements.error) {
            this.elements.error.textContent = message;
            this.elements.error.classList.add('active');
        }
    },

    /**
     * Hide error message
     */
    hideError() {
        if (this.elements.error) {
            this.elements.error.classList.remove('active');
        }
    },

    /**
     * Display search results dropdown
     * @param {Array} results - Array of city results
     */
    showSearchResults(results) {
        if (!this.elements.searchResults) return;
        
        if (results.length === 0) {
            this.elements.searchResults.innerHTML = '<div class="no-results">No cities found</div>';
            this.elements.searchResults.classList.add('active');
            return;
        }

        this.elements.searchResults.innerHTML = results.map(city => `
            <div class="search-result-item" data-name="${city.name}" data-country="${city.country}" data-lat="${city.latitude}" data-lon="${city.longitude}">
                <span class="city-name">${city.name}</span>
                <span class="city-country">${city.country}</span>
            </div>
        `).join('');
        
        this.elements.searchResults.classList.add('active');
    },

    /**
     * Hide search results
     */
    hideSearchResults() {
        if (this.elements.searchResults) {
            this.elements.searchResults.classList.remove('active');
        }
    },

    /**
     * Render current weather data
     * @param {Object} weather - Weather data object
     * @param {Object} location - Location data
     * @param {string} units - Units system
     */
    renderCurrentWeather(weather, location, units) {
        const unitLabels = WEATHER_CONFIG.units[units];
        
        // Update location
        if (this.elements.currentCity) {
            this.elements.currentCity.textContent = location.name;
        }
        if (this.elements.currentCountry) {
            this.elements.currentCountry.textContent = location.country;
        }
        if (this.elements.currentDate) {
            this.elements.currentDate.textContent = new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        // Update temperature
        if (this.elements.temperature) {
            this.elements.temperature.innerHTML = `${weather.current.temperature}<span class="unit">${unitLabels.temperature}</span>`;
        }

        // Update feels like
        if (this.elements.feelsLike) {
            this.elements.feelsLike.textContent = `Feels like ${weather.current.feelsLike}${unitLabels.temperature}`;
        }

        // Update description
        if (this.elements.description) {
            this.elements.description.textContent = weather.current.description;
        }

        // Update weather icon
        if (this.elements.weatherIcon) {
            this.elements.weatherIcon.className = `weather-icon ${weather.current.icon}`;
        }

        // Update details
        if (this.elements.humidity) {
            this.elements.humidity.innerHTML = `<i class="fas fa-tint"></i> ${weather.current.humidity}%`;
        }
        if (this.elements.wind) {
            const windDir = weatherService.getWindDirection(weather.current.windDirection);
            this.elements.wind.innerHTML = `<i class="fas fa-wind"></i> ${weather.current.windSpeed} ${unitLabels.wind} ${windDir}`;
        }
        if (this.elements.pressure) {
            this.elements.pressure.innerHTML = `<i class="fas fa-gauge-high"></i> ${weather.current.pressure} hPa`;
        }

        // Show weather section
        if (this.elements.currentWeather) {
            this.elements.currentWeather.classList.add('active');
        }
    },

    /**
     * Render forecast data
     * @param {Array} forecast - Array of forecast days
     * @param {string} units - Units system
     */
    renderForecast(forecast, units) {
        if (!this.elements.forecast) return;

        const unitLabels = WEATHER_CONFIG.units[units];
        
        // Skip today in forecast (index 0), start from tomorrow
        const forecastData = forecast.slice(1);
        
        this.elements.forecast.innerHTML = forecastData.map(day => `
            <div class="forecast-day">
                <div class="forecast-day-name">${day.dayName}</div>
                <div class="forecast-icon ${day.icon}"></div>
                <div class="forecast-temps">
                    <span class="temp-high">${day.maxTemp}°</span>
                    <span class="temp-low">${day.minTemp}°</span>
                </div>
                <div class="forecast-precip">
                    <i class="fas fa-tint"></i> ${day.precipitationProb}%
                </div>
            </div>
        `).join('');
    },

    /**
     * Render recent searches
     * @param {Array} searches - Array of recent search objects
     */
    renderRecentSearches(searches) {
        if (!this.elements.recentSearches) return;

        if (searches.length === 0) {
            this.elements.recentSearches.innerHTML = '<p class="no-searches">No recent searches</p>';
            return;
        }

        this.elements.recentSearches.innerHTML = searches.map(city => `
            <div class="recent-search-item" data-name="${city.name}" data-country="${city.country}" data-lat="${city.lat}" data-lon="${city.lon}">
                <span class="recent-city">${city.name}</span>
                <span class="recent-country">${city.country}</span>
            </div>
        `).join('');
    },

    /**
     * Apply theme
     * @param {string} theme - Theme name ('dark' or 'light')
     */
    applyTheme(theme) {
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(`${theme}-mode`);
        
        if (this.elements.themeToggle) {
            this.elements.themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }
    },

    /**
     * Update unit toggle display
     * @param {string} units - Units system
     */
    updateUnitDisplay(units) {
        if (this.elements.unitToggle) {
            this.elements.unitToggle.textContent = units === 'metric' ? '°C' : '°F';
        }
    },

    /**
     * Clear weather display
     */
    clearWeather() {
        if (this.elements.currentWeather) {
            this.elements.currentWeather.classList.remove('active');
        }
    }
};

// Export UI
window.ui = ui;
