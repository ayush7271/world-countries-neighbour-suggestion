import React, { useState, useEffect } from "react";
import "./App.css";

const WorldMap = () => {
  const [countries, setCountries] = useState([]);
  const [countriesWithBoundaries, setCountriesWithBoundaries] = useState([]);
  const [countriesWithoutBoundaries, setCountriesWithoutBoundaries] = useState([]);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    // Fetch country data from the API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Sort the countries alphabetically by their names
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);

        // Filter countries based on the presence of neighboring country codes
        const countriesWithBoundaries = sortedCountries.filter(
          (country) => country.borders && country.borders.length > 0
        );
        const countriesWithoutBoundaries = sortedCountries.filter(
          (country) => !country.borders || country.borders.length === 0
        );

        setCountriesWithBoundaries(countriesWithBoundaries);
        setCountriesWithoutBoundaries(countriesWithoutBoundaries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCountryHover = (neighbours) => {
    setTooltip(neighbours?.join(", "));
  };

  const handleCountryLeave = () => {
    setTooltip("");
  };
console.log(countriesWithBoundaries,countriesWithoutBoundaries)
  return (
    <div className="App">
      <div>
        <h2>Countries with Boundaries</h2>
        <ul>
          {countriesWithBoundaries.map((country) => (
            <li
              key={country.name.common}
              onMouseEnter={() => handleCountryHover(country.borders)}
              onMouseLeave={handleCountryLeave}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Countries without Boundaries</h2>
        <ul>
          {countriesWithoutBoundaries.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      </div>
      {tooltip && <div className="tooltip">{tooltip}</div>}
    </div>
  );
};

export default WorldMap;


