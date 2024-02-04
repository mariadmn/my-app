import styled from 'styled-components';
import { useSettings } from "../TopBar/Settings/settingsState";
import WeatherIcon from "./weatherIcon";
import { useForecast } from "./forecastState";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CurrentForecast: React.FC = () => {
    const { tempSuffix } = useSettings();
    const { data, isLoading } = useForecast();
    const { timeFormat } = useSettings();

    // Convert Unix timestamp to Date object
    const converteToDate = (timestamp: number) => {
        return new Date(timestamp * 1000);
    }

    const formatTime = (timestamp: number) => {
        return converteToDate(timestamp)
            .toLocaleTimeString('en-US', timeFormat === '24h' ? { hour: '2-digit', minute: '2-digit', hour12: false } : { hour: '2-digit', minute: '2-digit' });
    }

    if (!data || Array.isArray(data)) {
        //data is an array of objects
        return <h1>Loading...</h1>;
    }
    
    return (
        <CenteredContainer>
        {isLoading && <p>Loading...</p>}
        {data && (
            <ContentContainer>
            <h1>{data.name}</h1>
            <InfoContainer>
                <ContentContainer>
                    <WeatherIcon condition={data.weather[0].main} />
                    <h3>{data.weather[0].main}</h3>
                </ContentContainer>
                <div>
                <h3>Temp: {data.main.temp}{tempSuffix === 'K' ? "" : "°"}{tempSuffix}</h3>
                <p>Feels like: {data.main.feels_like}{tempSuffix === 'K' ? "" : "°"}{tempSuffix}</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Sunrise: {formatTime(data.sys.sunrise)}</p>
                <p>Sunset: {formatTime(data.sys.sunset)}</p>
                </div>
            </InfoContainer>
            </ContentContainer>
        )}
        </CenteredContainer>
    );
}
export default CurrentForecast;