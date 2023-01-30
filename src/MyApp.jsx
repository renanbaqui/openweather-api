import React, { useState, useEffect } from "react";
import {
  ComboBox,
  ComboBoxItem,
  List,
  StandardListItem,
} from "@ui5/webcomponents-react";

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

  //  [35.6895, 139.6917]
  const [listItemLatitude, setListItemLatitude] = useState("51.5085");
  const [listItemLongitude, setListItemLongitude] = useState("-0.1257");

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

  const [apiData, setApiData] = useState({
    coord: {
      lon: -0.1278,
      lat: 51.5074,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01n",
      },
    ],
    base: "stations",
    main: {
      temp: 276.99,
      feels_like: 275.06,
      temp_min: 274.48,
      temp_max: 278.74,
      pressure: 1028,
      humidity: 85,
    },
    visibility: 10000,
    wind: {
      speed: 2.1,
      deg: 261,
      gust: 5.93,
    },
    clouds: {
      all: 7,
    },
    dt: 1675108308,
    sys: {
      type: 2,
      id: 2019646,
      country: "GB",
      sunrise: 1675064547,
      sunset: 1675097091,
    },
    timezone: 0,
    id: 2643743,
    name: "London",
    cod: 200,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${listItemLatitude}&lon=${listItemLongitude}&appid=${API_KEY}`
        );
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [listItemLatitude, listItemLongitude]);

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
            {apiData.weather[0].main},&nbsp;{apiData.weather[0].description}
          </StandardListItem>
          <StandardListItem additionalText="Temperature">
            {apiData.main.temp} K
          </StandardListItem>
          <StandardListItem additionalText="Perception">
            {apiData.main.feels_like} K
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
            🇬🇧&nbsp;
            {apiData.sys.country}
          </StandardListItem>
        </List>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
