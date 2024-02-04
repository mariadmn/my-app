import CityGrid from "./CityGrid/cityGrid";
import Forecast from "./Forecast/forecast";
import { useForecastState } from "./Forecast/forecastState";
import TopBar from "./TopBar/topbar";
import styled from "styled-components";

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ForecastContainer = styled.div`
  flex: 1; 
  max-height: 70vh; 
`;

const Display = () => {
  const { isCurrent, is5Days } = useForecastState();

  return (
    <DisplayContainer>
        <TopBar />
        <ForecastContainer>
        <Forecast isCurrent={isCurrent} is5Days={is5Days} />
        </ForecastContainer>
        <CityGrid />
    </DisplayContainer>
  );
};

export default Display;
