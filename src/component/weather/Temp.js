import React, { useState, useEffect, useCallback } from "react";
import WeatherCard from "./WeatherCard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Lahore");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = useCallback(async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=48ea5016b7de802699524b485c957bee`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }, [searchValue]); // Dependency: searchValue

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]); // Now includes getWeatherInfo

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temp;
