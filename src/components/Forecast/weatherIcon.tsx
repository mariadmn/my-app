import {ReactComponent as Unknown} from '../../assets/weather-icons/unknown.svg'
import {ReactComponent as Sun} from '../../assets/weather-icons/weather-clear.svg';
import {ReactComponent as Clouds} from '../../assets/weather-icons/weather-cloudy.svg';
import {ReactComponent as  Fog} from '../../assets/weather-icons//weather-fog.svg';
import {ReactComponent as Haze} from '../../assets/weather-icons/weather-hail.svg';
import {ReactComponent as Thunderstorm} from '../../assets/weather-icons/weather-lightning-rainy.svg';
import {ReactComponent as Moon} from '../../assets/weather-icons/weather-night.svg';
import {ReactComponent as Pouring} from '../../assets/weather-icons/weather-pouring.svg';
import {ReactComponent as Snow} from '../../assets/weather-icons/weather-snowy.svg';
import styled from 'styled-components';


export const WeatherIconContainer = styled.div`
  & > svg {
    width: 7rem;
    height: 7rem;
  }
`;

const WeatherIcon: React.FC<{ condition: string; isDayTime?: boolean }> = ({
  condition,
  isDayTime = true,
}) => {
  if (condition === 'Clear')
    return (
      <WeatherIconContainer  >
        {isDayTime ? <Sun /> : <Moon />}
      </WeatherIconContainer>
    );
  if (condition === 'Clouds')
    return (
      <WeatherIconContainer>
        <Clouds />
      </WeatherIconContainer>
    );
  if (condition === 'Rain')
    return (
      <WeatherIconContainer>
        <Pouring />
      </WeatherIconContainer>
    );
  if (condition === 'Thunderstorm')
    return (
      <WeatherIconContainer>
        <Thunderstorm />
      </WeatherIconContainer>
    );
  if (condition === 'Snow')
    return (
      <WeatherIconContainer>
        <Snow />
      </WeatherIconContainer>
    );
  if (condition === 'Mist' || condition === 'Fog')
    return (
      <WeatherIconContainer>
        <Fog />
      </WeatherIconContainer>
    );

  if (condition === 'Haze')
    return (
      <WeatherIconContainer>
        <Haze />
      </WeatherIconContainer>
    );

  return (
    <WeatherIconContainer>
      <Unknown />
    </WeatherIconContainer>
  );
};

export default WeatherIcon;
