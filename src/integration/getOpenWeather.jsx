import axios from "axios";

export const clientInstance = axios.create();

export const getOpenWeather = async (
    listItemLatitude,
    listItemLongitude
) => {
    const API_KEY = "d76d0ba625e01873300aaf0e0d205280";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${listItemLatitude}&lon=${listItemLongitude}&appid=${API_KEY}`
    const { data: dataResponse } = await axios.get(url);
    return { dataResponse };
}