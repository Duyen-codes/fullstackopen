import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ country }) => {
  const [weather, setWeather] = useState("");
  const lat = country.latlng[0];
  const lon = country.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [lat, lon]);

  const tempC = (((weather?.main?.temp - 32) * 5) / 9).toFixed(2);

  return (
    <div>
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {tempC} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
        alt=""
      />
      <p>wind {weather?.wind?.speed} m/s</p>
    </div>
  );
};
const CountriesToShow = ({ filteredCountries, handleSearch }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    console.log(country);
    return (
      <div>
        <h3>{country.name.common}</h3>
        <p>{country.capital[0]}</p>
        <p>{country.area}</p>
        <h3>Languages</h3>
        {Object.values(country.languages).map((row, index) => {
          return <li key={index}>{row}</li>;
        })}
        <img src={country.flags.svg} alt={country.name.common} width="250px" />
        <Weather country={country} />
      </div>
    );
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((country) => {
          return (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <button value={country.name.common} onClick={handleSearch}>
                show
              </button>
            </div>
          );
        })}
      </div>
    );
  }
};
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search);
  });

  return (
    <div className="App">
      <h1>countries</h1>
      <div>
        find countries
        <input value={search} onChange={handleSearch} />
      </div>
      <CountriesToShow
        filteredCountries={filteredCountries}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
    </div>
  );
}

export default App;
