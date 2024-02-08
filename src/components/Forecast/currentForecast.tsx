import styled from 'styled-components';
import { useSettings } from "../TopBar/Settings/settingsState";
import WeatherIcon from "./weatherIcon";
import { useForecast } from "./forecastState";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
  margin: 0; 
  p {
    margin-bottom: 0; 
    margin-top: 10px;
    align-self: "left" !important;
    text-align: left !important;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    const navigate = useNavigate();

    // Convert Unix timestamp to Date object
    const converteToDate = (timestamp: number) => {
        return new Date(timestamp * 1000);
    }

    const formatTime = (timestamp: number) => {
        return converteToDate(timestamp)
            .toLocaleTimeString('en-US', timeFormat === '24h' ? { hour: '2-digit', minute: '2-digit', hour12: false } : { hour: '2-digit', minute: '2-digit' });
    }

    useEffect(() => {
        navigate("/");
    }, []);

    if (!data || Array.isArray(data)) {
        //data is an array of objects
        return <h1>Loading...</h1>;
    }

    return (
        <CenteredContainer>
        {isLoading && <p>Loading...</p>}
        {data && (
            <ContentContainer>
           
            <InfoContainer>
                <ContentContainer>
                    <h2>{data.name}</h2>
                    <WeatherIcon condition={data.weather[0].main} />
                    <h3>{data.weather[0].main}</h3>
                </ContentContainer>
                <div>
                    <p>Temp: {data.main.temp}{tempSuffix === 'K' ? "" : "°"}{tempSuffix}</p>
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