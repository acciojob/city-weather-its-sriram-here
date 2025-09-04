import React, { useState } from "react";
import axios from "axios";

const API_KEY = "904e49ce83bee9cb927e53bd3d2efdb8"; // your key

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setQuery("");
      } catch (error) {
        setWeather({ error: "City not found!" });
      }
    }
  };

  return (
    <div className="app">
      <input
        type="text"
        className="search"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather && !weather.error && (
        <div className="weather">
          <div className="city">{weather.name}</div>
          <div className="temperature">{Math.round(weather.main.temp)}°C</div>
          <div className="description">{weather.weather[0].description}</div>
          <div className="icon">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        </div>
      )}
      {weather && weather.error && (
        <div className="weather">
          <p>{weather.error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
