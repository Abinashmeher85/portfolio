/**
 * Main Application Module for Weather App
 * Coordinates all modules and handles user interactions
 */

// App namespace
const app = {
    // Current state
    currentUnits: 'metric',
    currentTheme: 'dark',
    currentLocation: null,
    searchTimeout: null,

    /**
     * Initialize the application
     */
    init() {
        // Initialize UI
        ui.init();
        
        // Load preferences
        this.loadPreferences();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load last city or default
        this.loadInitialData();
    },

    /**
     * Load user preferences from storage
     */
    loadPreferences() {
        this.currentUnits = weatherStorage.getUnits();
        this.currentTheme = weatherStorage.getTheme();
        
        // Apply theme
        ui.applyTheme(this.currentTheme);
        ui.updateUnitDisplay(this.currentUnits);
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Search input
        if (ui.elements.searchInput) {
            ui.elements.searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
            
            ui.elements.searchInput.addEventListener('focus', () => {
                if (ui.elements.searchInput.value.length >= 2) {
                    this.handleSearchInput(ui.elements.searchInput.value);
                }
            });
        }

        // Search button
        if (ui.elements.searchBtn) {
            ui.elements.searchBtn.addEventListener('click', () => {
                this.handleSearchSubmit();
            });
        }

        // Search results click delegation
        if (ui.elements.searchResults) {
            ui.elements.searchResults.addEventListener('click', (e) => {
                const resultItem = e.target.closest('.search-result-item');
                if (resultItem) {
                    this.selectCity({
                        name: resultItem.dataset.name,
                        country: resultItem.dataset.country,
                        latitude: parseFloat(resultItem.dataset.lat),
                        longitude: parseFloat(resultItem.dataset.lon)
                    });
                }
            });
        }

        // Recent searches click delegation
        if (ui.elements.recentSearches) {
            ui.elements.recentSearches.addEventListener('click', (e) => {
                const searchItem = e.target.closest('.recent-search-item');
                if (searchItem) {
                    this.selectCity({
                        name: searchItem.dataset.name,
                        country: searchItem.dataset.country,
                        latitude: parseFloat(searchItem.dataset.lat),
                        longitude: parseFloat(searchItem.dataset.lon)
                    });
                }
            });
        }

        // Theme toggle
        if (ui.elements.themeToggle) {
            ui.elements.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Unit toggle
        if (ui.elements.unitToggle) {
            ui.elements.unitToggle.addEventListener('click', () => {
                this.toggleUnits();
            });
        }

        // Close search results on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                ui.hideSearchResults();
            }
        });

        // Enter key in search input
        if (ui.elements.searchInput) {
            ui.elements.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearchSubmit();
                }
            });
        }
    },

    /**
     * Load initial data (last city or default)
     */
    async loadInitialData() {
        // Try to load last city
        const lastCity = weatherStorage.getLastCity();
        
        if (lastCity) {
            // FIX: Safely check for either naming convention
            const lat = lastCity.latitude !== undefined ? lastCity.latitude : lastCity.lat;
            const lon = lastCity.longitude !== undefined ? lastCity.longitude : lastCity.lon;
            
            await this.fetchWeather(lat, lon, {
                name: lastCity.name,
                country: lastCity.country
            });
        } else {
            // Load default city
            const defaultCity = {
                name: WEATHER_CONFIG.defaults.city,
                country: 'UK',
                latitude: 51.5074,
                longitude: -0.1278
            };
            await this.fetchWeather(defaultCity.latitude, defaultCity.longitude, defaultCity);
        }

        // Load recent searches
        this.loadRecentSearches();
    },

    /**
     * Handle search input with debounce
     * @param {string} query - Search query
     */
    handleSearchInput(query) {
        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Hide if too short
        if (query.length < 2) {
            ui.hideSearchResults();
            return;
        }

        // Debounce search
        this.searchTimeout = setTimeout(async () => {
            try {
                ui.showLoading();
                const results = await weatherService.searchCity(query);
                ui.hideLoading();
                ui.showSearchResults(results);
            } catch (error) {
                ui.hideLoading();
                ui.showError('Failed to search cities. Please try again.');
            }
        }, 300);
    },

    /**
     * Handle search form submit
     */
    async handleSearchSubmit() {
        const query = ui.elements.searchInput.value.trim();
        
        if (query.length < 2) {
            ui.showError('Please enter at least 2 characters to search.');
            return;
        }

        try {
            ui.showLoading();
            const results = await weatherService.searchCity(query);
            ui.hideLoading();

            if (results.length > 0) {
                this.selectCity(results[0]);
            } else {
                ui.showError('No cities found. Please try a different search.');
            }
        } catch (error) {
            ui.hideLoading();
            ui.showError('Failed to search cities. Please try again.');
        }
    },

    /**
     * Select a city and fetch weather
     * @param {Object} city - City object
     */
    async selectCity(city) {
        ui.hideSearchResults();
        
        if (ui.elements.searchInput) {
            ui.elements.searchInput.value = '';
        }

        // FIX: Extract coordinates safely regardless of property name
        const lat = city.latitude !== undefined ? city.latitude : city.lat;
        const lon = city.longitude !== undefined ? city.longitude : city.lon;

        await this.fetchWeather(lat, lon, {
            name: city.name,
            country: city.country
        });

        // Normalize city object for storage so it has both versions
        const normalizedCity = { ...city, latitude: lat, longitude: lon, lat: lat, lon: lon };
        weatherStorage.addRecentSearch(normalizedCity);
        this.loadRecentSearches();
    },

    /**
     * Fetch weather data for a location
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {Object} location - Location info
     */
    async fetchWeather(lat, lon, location) {
        try {
            ui.showLoading();
            ui.hideError();
            
            const weather = await weatherService.getWeatherData(lat, lon, this.currentUnits);
            
            // FIX: Store both naming conventions to prevent bugs everywhere else
            this.currentLocation = { ...location, lat: lat, lon: lon, latitude: lat, longitude: lon };
            
            // Save last city
            weatherStorage.saveLastCity(this.currentLocation);
            
            // Render weather data
            ui.renderCurrentWeather(weather, location, this.currentUnits);
            ui.renderForecast(weather.daily, this.currentUnits);
            
            ui.hideLoading();
        } catch (error) {
            ui.hideLoading();
            ui.showError('Failed to fetch weather data. Please check your connection and try again.');
            console.error('Weather fetch error:', error);
        }
    },

    /**
     * Load recent searches from storage
     */
    loadRecentSearches() {
        const searches = weatherStorage.getRecentSearches();
        ui.renderRecentSearches(searches);
    },

    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        weatherStorage.saveTheme(this.currentTheme);
        ui.applyTheme(this.currentTheme);
    },

    /**
     * Toggle between metric and imperial units
     */
    async toggleUnits() {
        this.currentUnits = this.currentUnits === 'metric' ? 'imperial' : 'metric';
        weatherStorage.saveUnits(this.currentUnits);
        ui.updateUnitDisplay(this.currentUnits);

        // Refresh weather if we have a current location
        if (this.currentLocation) {
            // FIX: Safely grab coordinates here too
            const lat = this.currentLocation.lat !== undefined ? this.currentLocation.lat : this.currentLocation.latitude;
            const lon = this.currentLocation.lon !== undefined ? this.currentLocation.lon : this.currentLocation.longitude;
            
            await this.fetchWeather(
                lat,
                lon,
                { name: this.currentLocation.name, country: this.currentLocation.country }
            );
        }
    }
};

// Export app
window.app = app;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});