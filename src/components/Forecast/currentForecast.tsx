import styled from "styled-components";
import { useSettings } from "../TopBar/Settings/settingsState";
import { useCityState } from "../cityState";
import { useForecast } from "./forecastState";

const TimeDisplay: React.FC<{ timestamp: number; timezone: string }> = ({
    timestamp,
    timezone,
  }) => {
    const date = new Date(timestamp * 1000);
    const { timeFormat } = useSettings();
  
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timezone,
        hour12: timeFormat === "24h" ? false : true,
      });
    };
  
    return <>{formatTime(date)}</>;
  };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
`;

const CurrentForecast: React.FC = () => {
    const { tempSuffix } = useSettings();
    const { selectedCity } = useCityState();
    const { data, isLoading } = useForecast(true);
    //TODO: Put icon in the right place
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {data && (
                <div>
                    <h1>{data.name}</h1>
                    <h2>{data.weather[0].description}</h2>
                    <h3>
                        {data.main.temp}
                        {tempSuffix}
                    </h3>
                    <p>Feels like {data.main.feels_like}{tempSuffix}</p>
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Wind: {data.wind.speed} m/s</p>
                    <p>Visibility: {data.visibility / 1000} km</p>
                </div>
            )}
        </div>
    );
}
export default CurrentForecast;