import React, { useState, useEffect } from "react";
import {
  ComboBox,
  ComboBoxItem,
  Input,
  List,
  StandardListItem,
} from "@ui5/webcomponents-react";

const API_KEY = "d76d0ba625e01873300aaf0e0d205280";
const SUGGESTION_LIMIT = 3;
const WEATHER_EMOJIS = {
  Clouds: "☁️",
  Clear: "☀️",
  Thunderstorm: "⛈️",
};

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

  const [listItemLatitude, setListItemLatitude] = useState("51.5085");
  const [listItemLongitude, setListItemLongitude] = useState("-0.1257");
  const [listWeatherEmoji, setListeatherEmoji] = useState("");

  const [countriesApiData, setCountriesApiData] = useState([
    {
      name: {
        common: "United Kingdom",
        official: "United Kingdom of Great Britain and Northern Ireland",
        nativeName: {
          eng: {
            official: "United Kingdom of Great Britain and Northern Ireland",
            common: "United Kingdom",
          },
        },
      },
      tld: [".uk"],
      cca2: "GB",
      ccn3: "826",
      cca3: "GBR",
      cioc: "GBR",
      independent: true,
      status: "officially-assigned",
      unMember: true,
      currencies: {
        GBP: {
          name: "British pound",
          symbol: "£",
        },
      },
      idd: {
        root: "+4",
        suffixes: ["4"],
      },
      capital: ["London"],
      altSpellings: ["GB", "UK", "Great Britain"],
      region: "Europe",
      subregion: "Northern Europe",
      languages: {
        eng: "English",
      },
      translations: {
        ara: {
          official: "المملكة المتحدة لبريطانيا العظمى وايرلندا الشمالية",
          common: "المملكة المتحدة",
        },
        bre: {
          official: "Rouantelezh-Unanet Breizh-Veur ha Norzhiwerzhon",
          common: "Rouantelezh-Unanet",
        },
        ces: {
          official: "Spojené království Velké Británie a Severního Irska",
          common: "Spojené království",
        },
        cym: {
          official: "United Kingdom of Great Britain and Northern Ireland",
          common: "United Kingdom",
        },
        deu: {
          official: "Vereinigtes Königreich Großbritannien und Nordirland",
          common: "Vereinigtes Königreich",
        },
        est: {
          official: "Suurbritannia ja Põhja-Iiri Ühendkuningriik",
          common: "Suurbritannia",
        },
        fin: {
          official:
            "Ison-Britannian ja Pohjois-Irlannin yhdistynyt kuningaskunta",
          common: "Yhdistynyt kuningaskunta",
        },
        fra: {
          official: "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord",
          common: "Royaume-Uni",
        },
        hrv: {
          official: "Ujedinjeno Kraljevstvo Velike Britanije i Sjeverne Irske",
          common: "Ujedinjeno Kraljevstvo",
        },
        hun: {
          official: "Nagy-Britannia és Észak-Írország Egyesült Királysága",
          common: "Egyesült Királyság",
        },
        ita: {
          official: "Regno Unito di Gran Bretagna e Irlanda del Nord",
          common: "Regno Unito",
        },
        jpn: {
          official: "グレート·ブリテンおよび北アイルランド連合王国",
          common: "イギリス",
        },
        kor: {
          official: "그레이트브리튼 북아일랜드 연합 왕국",
          common: "영국",
        },
        nld: {
          official: "Verenigd Koninkrijk van Groot-Brittannië en Noord-Ierland",
          common: "Verenigd Koninkrijk",
        },
        per: {
          official: "پادشاهی متحد بریتانیای کبیر و ایرلند شمالی",
          common: "انگلیس",
        },
        pol: {
          official:
            "Zjednoczone Królestwo Wielkiej Brytanii i Irlandii Północnej",
          common: "Zjednoczone Królestwo",
        },
        por: {
          official: "Reino Unido da Grã-Bretanha e Irlanda do Norte",
          common: "Reino Unido",
        },
        rus: {
          official:
            "Соединенное Королевство Великобритании и Северной Ирландии",
          common: "Великобритания",
        },
        slk: {
          official: "Spojené kráľovstvo Veľkej Británie a SevernéhoÌrska",
          common: "Veľká Británia (Spojené kráľovstvo)",
        },
        spa: {
          official: "Reino Unido de Gran Bretaña e Irlanda del Norte",
          common: "Reino Unido",
        },
        srp: {
          official: "Уједињено Краљевство Велике Британије и Северне Ирске",
          common: "Уједињено Краљевство",
        },
        swe: {
          official: "Förenade konungariket Storbritannien och Nordirland",
          common: "Storbritannien",
        },
        tur: {
          official: "Büyük Britanya ve Kuzey İrlanda Birleşik Krallığı",
          common: "Birleşik Krallık",
        },
        urd: {
          official: "مملکتِ متحدہ برطانیہ عظمی و شمالی آئرلینڈ",
          common: "مملکتِ متحدہ",
        },
        zho: {
          official: "大不列颠及北爱尔兰联合王国",
          common: "英国",
        },
      },
      latlng: [54.0, -2.0],
      landlocked: false,
      borders: ["IRL"],
      area: 242900.0,
      demonyms: {
        eng: {
          f: "British",
          m: "British",
        },
        fra: {
          f: "Britannique",
          m: "Britannique",
        },
      },
      flag: "🇬🇧",
      maps: {
        googleMaps: "https://goo.gl/maps/FoDtc3UKMkFsXAjHA",
        openStreetMaps: "https://www.openstreetmap.org/relation/62149",
      },
      population: 67215293,
      gini: {
        2017: 35.1,
      },
      car: {
        signs: ["GB"],
        side: "left",
      },
      timezones: [
        "UTC-08:00",
        "UTC-05:00",
        "UTC-04:00",
        "UTC-03:00",
        "UTC-02:00",
        "UTC",
        "UTC+01:00",
        "UTC+02:00",
        "UTC+06:00",
      ],
      continents: ["Europe"],
      flags: {
        png: "https://flagcdn.com/w320/gb.png",
        svg: "https://flagcdn.com/gb.svg",
        alt: "The flag of the United Kingdom — the Union Jack — has a blue field. It features the white-edged red cross of Saint George superimposed on the diagonal red cross of Saint Patrick which is superimposed on the diagonal white cross of Saint Andrew.",
      },
      coatOfArms: {
        png: "https://mainfacts.com/media/images/coats_of_arms/gb.png",
        svg: "https://mainfacts.com/media/images/coats_of_arms/gb.svg",
      },
      startOfWeek: "monday",
      capitalInfo: {
        latlng: [51.5, -0.08],
      },
      postalCode: {
        format: "@# #@@|@## #@@|@@# #@@|@@## #@@|@#@ #@@|@@#@ #@@|GIR0AA",
        regex:
          "^(([A-Z]\\d{2}[A-Z]{2})|([A-Z]\\d{3}[A-Z]{2})|([A-Z]{2}\\d{2}[A-Z]{2})|([A-Z]{2}\\d{3}[A-Z]{2})|([A-Z]\\d[A-Z]\\d[A-Z]{2})|([A-Z]{2}\\d[A-Z]\\d[A-Z]{2})|(GIR0AA))$",
      },
    },
  ]);
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

  const handleSearchInputChange = async (event) => {
    const searchTerm = event.target.value;

    if (searchTerm.length > 2) {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=${SUGGESTION_LIMIT}&appid=${API_KEY}`
        );
        const suggestions = await response.json();

        setListItemLatitude(suggestions[0].lat);
        setListItemLongitude(suggestions[0].lon);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${listItemLatitude}&lon=${listItemLongitude}&appid=${API_KEY}`
        );
        const data = await response.json();
        setApiData(data);
        const countryCode = data.sys.country;

        const restCountriesResponse = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        const countriesData = await restCountriesResponse.json();
        setCountriesApiData(countriesData);

        const main = data.weather[0].main;
        setListeatherEmoji(WEATHER_EMOJIS[main]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [listItemLatitude, listItemLongitude]);

  return (
    <>
      <Input
        //icon={<Icon name="employee" />}
        placeholder="Enter a city name"
        onChange={handleSearchInputChange}
        onInput={function Ma() {}}
        onSuggestionItemPreview={function Ma() {}}
        onSuggestionItemSelect={function Ma() {}}
      />
      <p></p>
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
        </List>
      ) : (
        <div>Loading...</div>
      )}
      <p></p>
      {countriesApiData ? (
        <List
          headerText="Country Information"
          onItemClick={function noRefCheck() {}}
          onItemClose={function noRefCheck() {}}
          onItemDelete={function noRefCheck() {}}
          onItemToggle={function noRefCheck() {}}
          onLoadMore={function noRefCheck() {}}
          onSelectionChange={function noRefCheck() {}}
        >
          <StandardListItem additionalText="Official Name">
            {countriesApiData[0].name.official}
          </StandardListItem>
          <StandardListItem additionalText="Flag">
            {countriesApiData[0].flag}
          </StandardListItem>
          <StandardListItem additionalText="Capital">
            {countriesApiData[0].capital[0]}
          </StandardListItem>
          <StandardListItem additionalText="Subregion">
            {countriesApiData[0].subregion}
          </StandardListItem>
          <StandardListItem additionalText="Population">
            {countriesApiData[0].population.toLocaleString()}
          </StandardListItem>
          <StandardListItem additionalText="Area">
            {countriesApiData[0].area.toLocaleString()} km²
          </StandardListItem>
          <StandardListItem additionalText="UN Member">
            {countriesApiData[0].unMember ? "Yes" : "No"}
          </StandardListItem>
          <StandardListItem additionalText="Traffic">
            {capitalizeFirstLetter(countriesApiData[0].car.side)}
          </StandardListItem>
          <StandardListItem additionalText="Landlocked">
            {countriesApiData[0].landlocked ? "Yes" : "No"}
          </StandardListItem>
        </List>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
