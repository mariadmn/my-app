import CityGrid from "./CityGrid/cityGrid";
import Forecast from "./Forecast/forecast";
import { useForecastState } from "./Forecast/forecastState";
import PeriodSelector from "./Forecast/periodSelector";
import TopBar from "./TopBar/topbar";
import styled from "styled-components";

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ForecastContainer = styled.div`
  flex: 1; 
  overflow-y: auto;
`;

const CityGridContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: auto;
  margin-bottom: 2rem;
`;

const PeriodSelectorContainer = styled.div`
  position: fixed;
  bottom: 15rem; /* Adjusted to 2rem to be above CityGrid by 2rem */
  left: 0;
  width: 100%;
`;

const Display = () => {
  const { isCurrent, is5Days } = useForecastState();

  return (
    <DisplayContainer>
        <TopBar />
        <ForecastContainer>
          <Forecast isCurrent={isCurrent} is5Days={is5Days} />
        </ForecastContainer>
        <PeriodSelectorContainer>
          <PeriodSelector />
        </PeriodSelectorContainer>
        <CityGridContainer>
          <CityGrid />
        </CityGridContainer>
    </DisplayContainer>
  );
};
 export default Display;