/**
 * Storage Module for Weather App
 * Handles localStorage operations for preferences and recent searches
 */

// Storage keys
const STORAGE_KEYS = {
    RECENT_SEARCHES: 'weatherApp_recentSearches',
    UNITS: 'weatherApp_units',
    THEME: 'weatherApp_theme',
    LAST_CITY: 'weatherApp_lastCity'
};

// Maximum recent searches to store
const MAX_RECENT_SEARCHES = 5;

// Storage namespace
const storage = {
    /**
     * Get recent searches from localStorage
     * @returns {Array} Array of recent search objects
     */
    getRecentSearches() {
        try {
            const searches = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
            return searches ? JSON.parse(searches) : [];
        } catch (error) {
            console.error('Error getting recent searches:', error);
            return [];
        }
    },

    /**
     * Add a city to recent searches
     * @param {Object} city - City object with name, lat, lon, country
     */
    addRecentSearch(city) {
        try {
            let searches = this.getRecentSearches();
            
            // Remove if already exists
            searches = searches.filter(s => s.name.toLowerCase() !== city.name.toLowerCase());
            
            // Add to beginning
            searches.unshift({
                name: city.name,
                country: city.country,
                lat: city.latitude,
                lon: city.longitude,
                timestamp: Date.now()
            });
            
            // Limit to max recent searches
            if (searches.length > MAX_RECENT_SEARCHES) {
                searches = searches.slice(0, MAX_RECENT_SEARCHES);
            }
            
            localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(searches));
        } catch (error) {
            console.error('Error adding recent search:', error);
        }
    },

    /**
     * Clear all recent searches
     */
    clearRecentSearches() {
        try {
            localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
        } catch (error) {
            console.error('Error clearing recent searches:', error);
        }
    },

    /**
     * Get preferred units (metric/imperial)
     * @returns {string} Units preference
     */
    getUnits() {
        try {
            return localStorage.getItem(STORAGE_KEYS.UNITS) || 'metric';
        } catch (error) {
            console.error('Error getting units:', error);
            return 'metric';
        }
    },

    /**
     * Save preferred units
     * @param {string} units - Units preference ('metric' or 'imperial')
     */
    saveUnits(units) {
        try {
            localStorage.setItem(STORAGE_KEYS.UNITS, units);
        } catch (error) {
            console.error('Error saving units:', error);
        }
    },

    /**
     * Get theme preference
     * @returns {string} Theme preference ('dark' or 'light')
     */
    getTheme() {
        try {
            return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
        } catch (error) {
            console.error('Error getting theme:', error);
            return 'dark';
        }
    },

    /**
     * Save theme preference
     * @param {string} theme - Theme preference ('dark' or 'light')
     */
    saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEYS.THEME, theme);
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    },

    /**
     * Get last viewed city
     * @returns {Object|null} Last city object
     */
    getLastCity() {
        try {
            const city = localStorage.getItem(STORAGE_KEYS.LAST_CITY);
            return city ? JSON.parse(city) : null;
        } catch (error) {
            console.error('Error getting last city:', error);
            return null;
        }
    },

    /**
     * Save last viewed city
     * @param {Object} city - City object
     */
    saveLastCity(city) {
        try {
            localStorage.setItem(STORAGE_KEYS.LAST_CITY, JSON.stringify(city));
        } catch (error) {
            console.error('Error saving last city:', error);
        }
    }
};

// Export storage
window.weatherStorage = storage;
