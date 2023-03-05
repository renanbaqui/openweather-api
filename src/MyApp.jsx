import React, { useState, useEffect } from "react";
import {
  ComboBox,
  ComboBoxItem,
  List,
  StandardListItem,
} from "@ui5/webcomponents-react";
import { useGetOpenWeather } from "./integration/useGetOpenWeather";

const API_KEY = "d76d0ba625e01873300aaf0e0d205280";

export function MyApp() {
  const citiesCoordinates = [
    {
      name: "London",
      lat: 51.5,
      lon: -0.12,
    },
    {
      name: "Los Angeles",
      lat: 34.05,
      lon: -118.24,
    },
    {
      name: "New York",
      lat: 40.71,
      lon: -74.0,
    },
    {
      name: "Paris",
      lat: 48.8534,
      lon: 2.3488,
    },
    {
      name: "Rio de Janeiro",
      lat: -22.9028,
      lon: -43.2075,
    },
    {
      name: "Tokyo",
      lat: 35.6895,
      lon: 139.6917,
    },
  ];

  // const weatherEmojis = {
  //   Clouds: "☁️",
  //   Clear: "☀️",
  // };

  const [listItemLatitude, setListItemLatitude] = useState("51.5085");
  const [listItemLongitude, setListItemLongitude] = useState("-0.1257");
  const [listFlag, setListFlag] = useState("");
  const [listWeatherEmoji, setListeatherEmoji] = useState("");

  const [apiData, setApiData] = useState({
    coord: {
      lon: -0.1278,
      lat: 51.5074,
    },
    weather: [
      {
        id: 800,
        main: "",
        description: "",
        icon: "01n",
      },
    ],
    base: "stations",
    main: {
      temp: "",
      feels_like: "",
      temp_min: "",
      temp_max: "",
      pressure: "",
      humidity: "",
    },
    visibility: "",
    wind: {
      speed: "",
      deg: "",
      gust: "",
    },
    clouds: {
      all: "",
    },
    dt: "",
    sys: {
      type: "",
      id: "",
      country: "",
      sunrise: "",
      sunset: "",
    },
    timezone: "",
    id: "",
    name: "",
    cod: "",
  });

  const handleSelectionChange = (event) => {
    let objectIndex = null;
    for (let i = 0; i < citiesCoordinates.length; i++) {
      if (citiesCoordinates[i].name === event.target.value) {
        objectIndex = i;
        break;
      }
    }

    setListItemLatitude(citiesCoordinates[objectIndex].lat);
    setListItemLongitude(citiesCoordinates[objectIndex].lon);
  };
  
  const {dataResponse} = useGetOpenWeather(listItemLatitude, listItemLongitude);
  console.log()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${listItemLatitude}&lon=${listItemLongitude}&appid=${API_KEY}`
        );
        const data = await response.json();
        setApiData(data);
        const countryCode = data.sys.country;
        setListFlag(getFlagEmoji(countryCode));
        const main = data.weather[0].main;
        if (main === "Clear") {
          setListeatherEmoji("☀️");
        } else {
          setListeatherEmoji("☁️");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [listItemLatitude, listItemLongitude]);

  useEffect(() => {
    console.log(dataResponse);
  }, [listItemLatitude, listItemLongitude]);

  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return (
    <>
      <ComboBox
        onInput={function noRefCheck() {}}
        onSelectionChange={handleSelectionChange}
        placeholder="Select a City..."
      >
        <ComboBoxItem text="London" />
        <ComboBoxItem text="Los Angeles" />
        <ComboBoxItem text="New York" />
        <ComboBoxItem text="Paris" />
        <ComboBoxItem text="Rio de Janeiro" />
        <ComboBoxItem text="Tokyo" />
      </ComboBox>
      <p></p>
      {apiData ? (
        <List
          headerText="Current Weather"
          onItemClick={function noRefCheck() {}}
          onItemClose={function noRefCheck() {}}
          onItemDelete={function noRefCheck() {}}
          onItemToggle={function noRefCheck() {}}
          onLoadMore={function noRefCheck() {}}
          onSelectionChange={function noRefCheck() {}}
        >
          <StandardListItem additionalText="Location">
            {apiData.name}
          </StandardListItem>
          <StandardListItem additionalText="Description">
            {listWeatherEmoji}&nbsp;{apiData.weather[0].main},&nbsp;
            {apiData.weather[0].description}
          </StandardListItem>
          <StandardListItem additionalText="Temperature">
            🌡️&nbsp;{apiData.main.temp} K
          </StandardListItem>
          <StandardListItem additionalText="Perception">
            🌡️&nbsp;{apiData.main.feels_like} K
          </StandardListItem>
          <StandardListItem additionalText="Humidity">
            {apiData.main.humidity} %
          </StandardListItem>
          <StandardListItem additionalText="Cloudiness">
            {apiData.clouds.all} %
          </StandardListItem>
          <StandardListItem additionalText="Wind Speed">
            {apiData.wind.speed} m/s
          </StandardListItem>
          <StandardListItem additionalText="Wind Direction">
            {apiData.wind.deg} degrees
          </StandardListItem>
          <StandardListItem additionalText="Timezone">
            {apiData.timezone} s from UTC
          </StandardListItem>
          <StandardListItem additionalText="Country">
            {listFlag}&nbsp;
            {apiData.sys.country}
          </StandardListItem>
        </List>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
