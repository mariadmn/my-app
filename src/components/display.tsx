import CityGrid from "./CityGrid/cityGrid";
import Forecast from "./Forecast/forecast";
import { useForecastState } from "./Forecast/forecastState";
import PeriodSelector from "./Forecast/periodSelector";
import TopBar from "./TopBar/topbar";
import styled, { useTheme } from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; 
  background-color: ${({ theme }) => theme.theme.background};
`;

const ForecastContainer = styled.div`
  flex: 1; 
  overflow-y: auto;
  height: 100;
  width: 100%;
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
  bottom: 15rem; 
  width: 100%;
`;

const Display = () => {
  const { isCurrent, is5Days } = useForecastState();

  return (
    <>
      <GlobalStyle /> 
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
    </>
  );
};
export default Display;
