import { useQuery } from "react-query"
import { getOpenWeather } from "./getOpenWeather"

export const useGetOpenWeather = (
    listItemLatitude,
    listItemLongitude
) => {
    const {dataResponse} = useQuery(['useGetOpenWeather', listItemLatitude,
    listItemLongitude], ()=> getOpenWeather(listItemLatitude,
        listItemLongitude) );
    return {dataResponse};
}