import styled from 'styled-components';
import { useSettings } from "../TopBar/Settings/settingsState";
import WeatherIcon from "./weatherIcon";
import { useForecast } from "./forecastState";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2,h3,h4{
    margin: 0;
    color: ${({ theme }) => theme.theme.text};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: 'row';
  justify-content: 'space-between';
  align-content: 'center';
  text-decoration-color: ${({ theme }) => theme.theme.text};
`;

const FiveDaysForecast: React.FC = () => {
    const { tempSuffix } = useSettings();
    const { data, isLoading } = useForecast();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data || !Array.isArray(data)) {
        //data is an array of objects
        return <h1>Loading...</h1>;
    }

  return (
    <CenteredContainer>
      <h1>{data[0].cityName || 'Loading...'}</h1>
      <InfoContainer>
        {data.map((day: any) => (
          <DayContainer key={day.date}>
            <h2>{day.dayOfWeek}</h2>
            {/* gets the first main weather */}
            <WeatherIcon condition={day.forecastDetails[0].weather.main} />
            <h3>{day.forecastDetails[0].weather.main}</h3>
            <h4>
              H:{day.highestTemp}{tempSuffix === 'K' ? "" : "°"}{tempSuffix}
              / L:{day.lowestTemp}{tempSuffix === 'K' ? "" : "°"}{tempSuffix}
            </h4>
            &nbsp;
          </DayContainer>
        ))}
      </InfoContainer>
    </CenteredContainer>
  );
};

export default FiveDaysForecast;
