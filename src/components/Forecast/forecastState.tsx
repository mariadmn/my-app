import { useQuery } from "react-query";
import { useSettings } from "../TopBar/Settings/settingsState";
import { useCityState } from "../cityState";
import { useEffect } from "react";
import { create } from "zustand";

//CHANGE TO YOUR API KEY
const apiKey = '8d3b84bd38e936c4c5fbc9e1c6094240';

type ForecastState = {
  isCurrent: boolean;
  is5Days?: boolean;
  setIsCurrent: (isCurrent: boolean) => void;
  setIs5Days: (is5Days: boolean) => void;
};

export const useForecastState = create<ForecastState>((set) => ({
  isCurrent: false,
  is5Days: false,
  setIsCurrent: (isCurrent) => set({ isCurrent }),
  setIs5Days: (is5Days) => set({ is5Days }),
}));

export function useForecast() {
  const { temperatureunits } = useSettings();
  const { selectedCity } = useCityState();
  const { isCurrent } = useForecastState();

  //Organizing the forecast data for 5 days forecast
  const organizeForecastData = (forecastData: any) => {
    const groupedData = [] as any;
  
    // Group data by date
    forecastData.list.forEach((item : any) => {
      const date = item.dt_txt.split(' ')[0];
  
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
  
      groupedData[date].push(item);
    });
  
    // Organize each day's data
    const organizedData = Object.keys(groupedData).map((date) => {
      const cityName = forecastData.city.name;

      const dayData = groupedData[date];
  
      // Find highest and lowest temperatures
      const maxTemperatures = dayData.map((item: any) => item.main.temp_max);
      const minTemperatures = dayData.map((item: any) => item.main.temp_min);
      const highestTemp = Math.max(...maxTemperatures);
      const lowestTemp = Math.min(...minTemperatures);
  
      // Extract forecast details
      const forecastDetails = dayData.map((item: any) => ({
        time: item.dt_txt.split(' ')[1],
        weather: item.weather[0],
      }));
  
      // Determine day of the week
      const dayOfWeek = new Date(dayData[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
  
      return {
        cityName,
        date,
        dayOfWeek,
        highestTemp,
        lowestTemp,
        forecastDetails,
      };
    });
    return organizedData;
  };

  const forecastQuery = useQuery({
    queryFn: async () => {
      if (!selectedCity) return null;
      console.log(selectedCity);
      console.log(isCurrent);
      const nameQuery = isCurrent ? "weather" : "forecast";

      const apiUrl = `https://api.openweathermap.org/data/2.5/${nameQuery}?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=${temperatureunits}&appid=${apiKey}`;

      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      let data = await response.json();
      if(!isCurrent){
        data = organizeForecastData(data);
      }
      return data;
    },
    enabled: !!selectedCity,
  });

  // Refetch forecast data when the selected city changes or the temperature units change
  useEffect(() => {
    forecastQuery.refetch();
  }, [selectedCity, temperatureunits]);

  return {
    forecastQuery,
    data: forecastQuery.data,
    isLoading: forecastQuery.isLoading,
    isError: forecastQuery.isError,
  };
}
