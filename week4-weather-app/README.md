# Weather App ☀️🌧️❄️

A beautiful, modern weather application that allows you to check current weather conditions and 7-day forecasts for any city worldwide.

## Features

- **Current Weather**: Real-time temperature, feels-like, humidity, wind speed, and pressure
- **7-Day Forecast**: Detailed forecast including high/low temperatures and precipitation probability
- **City Search**: Search for any city worldwide using the Open-Meteo geocoding API
- **Recent Searches**: Quickly access previously searched cities
- **Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F)
- **Theme Toggle**: Switch between dark and light modes
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Local Storage**: Preferences and recent searches are saved locally

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, animations, and glassmorphism effects
- **JavaScript (ES6+)**: Modular JavaScript with async/await
- **Open-Meteo API**: Free weather API (no API key required)

## Project Structure

```
week4-weather-app/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles
│   ├── weather-icons.css  # Weather icon styles
│   └── responsive.css     # Responsive design
├── js/
│   ├── app.js            # Main application logic
│   ├── weatherService.js  # API calls and data parsing
│   ├── ui.js             # DOM manipulation
│   ├── storage.js        # LocalStorage operations
│   └── config.js         # Configuration and settings
├── assets/
│   ├── icons/            # Custom icons
│   └── images/           # Images
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls)

### Installation

1. Clone the repository or download the files
2. Navigate to the `week4-weather-app` directory
3. Open `index.html` in your web browser

That's it! No build process or server required.

## Usage

1. **Search for a city**: Type in the search box and select from the dropdown
2. **View weather**: Current conditions and 7-day forecast will display
3. **Toggle units**: Click the °C/°F button to switch between Celsius and Fahrenheit
4. **Toggle theme**: Click the moon/sun icon to switch between dark and light modes
5. **Recent searches**: Click on any recent search to quickly view that city's weather

## API Information

This app uses the **Open-Meteo API**, which is free and doesn't require an API key.

- **Geocoding API**: Convert city names to coordinates
- **Weather API**: Get current weather and forecasts

For more information, visit: https://open-meteo.com/

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Changing Default City

Edit `js/config.js`:
```
javascript
defaults: {
    city: 'YourCity',  // Change this
    units: 'metric',
    forecastDays: 7
}
```

### Adding More Weather Details

Edit `js/weatherService.js` and add more parameters to the API call in the `getWeatherData` method.

## License

This project is open source and available under the MIT License.

## Credits

- Weather data: [Open-Meteo](https://open-meteo.com/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
