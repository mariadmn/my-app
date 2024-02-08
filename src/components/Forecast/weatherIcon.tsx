import {ReactComponent as Unknown} from '../../assets/weather-icons/unknown.svg'
import {ReactComponent as Sun} from '../../assets/weather-icons/weather-clear.svg';
import {ReactComponent as Clouds} from '../../assets/weather-icons/weather-cloudy.svg';
import {ReactComponent as Fog} from '../../assets/weather-icons//weather-fog.svg';
import {ReactComponent as Haze} from '../../assets/weather-icons/weather-hail.svg';
import {ReactComponent as Thunderstorm} from '../../assets/weather-icons/weather-lightning-rainy.svg';
import {ReactComponent as Moon} from '../../assets/weather-icons/weather-night.svg';
import {ReactComponent as Pouring} from '../../assets/weather-icons/weather-pouring.svg';
import {ReactComponent as Snow} from '../../assets/weather-icons/weather-snowy.svg';
import {ReactComponent as Dust} from '../../assets/weather-icons/weather-windy-variant.svg';

import styled, { useTheme } from 'styled-components';


export const IconContainer = styled.div`
  & > svg {
    width: 7rem;
    height: 7rem;
  }
`;

const WeatherIcon: React.FC<{ condition: string; isDay?: boolean }> = ({ condition, isDay = true }) => {
  const theme = useTheme();
  if (condition === 'Clear')
    return (
      <IconContainer  >
        {isDay ? <Sun style={{ fill: theme.theme.yellow, filter: "drop-shadow(0 0 10px #ffea80)" }}/> 
          : <Moon style={{ fill: theme.theme.blue, filter: "drop-shadow(0 0 10px #00f)" }}/>}
      </IconContainer>
    );

  if (condition === 'Clouds')
    return (
      <IconContainer>
        <Clouds style={{ fill: theme.theme.blue, filter: "drop-shadow(0 0 10px #00f)" }} />

      </IconContainer>
    );

  if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Squall')
    return (
      <IconContainer>
        <Pouring style={{ fill: theme.theme.blue, filter: "drop-shadow(0 0 10px #00f)" }}/>
      </IconContainer>
    );

  if (condition === 'Thunderstorm')
    return (
      <IconContainer>
        <Thunderstorm style={{ fill: theme.theme.blue, filter: "drop-shadow(0 0 10px #00f)" }}/>
      </IconContainer>
    );

  if (condition === 'Snow')
    return (
      <IconContainer>
        <Snow style={{ fill: theme.theme.cyan , filter: "drop-shadow(0 0 10px #00a2ff)"}}/>
      </IconContainer>
    );

  if (condition === 'Mist' || condition === 'Fog')
    return (
      <IconContainer>
        <Fog style={{ fill: theme.theme.blue, filter: "drop-shadow(0 0 10px #00f)" }}/>
      </IconContainer>
    );

  if (condition === 'Haze')
    return (
      <IconContainer>
        <Haze style={{ fill: theme.theme.blue, filter: "drop-shadow(0 0 10px #00f)" }}/>
      </IconContainer>
    );

  if(condition === 'Smoke' || condition === 'Dust')
    return (
      <IconContainer>
        <Dust style={{ fill: theme.theme.yellow, filter: "drop-shadow(0 0 10px #ffea80)" }}/>
      </IconContainer>
    );

  return (
    <IconContainer>
      <Unknown style={{ fill: theme.theme.text }}/>
    </IconContainer>
  );
};

export default WeatherIcon;
