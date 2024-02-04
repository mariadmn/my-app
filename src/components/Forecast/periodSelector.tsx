import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../button";
import { useCityState } from "../cityState";
import { useForecastState } from "./forecastState";


const StyledContainer = styled.div`
  display: inline-flex;
  width: 100%;
  max-width: 400px;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const PeriodSelector: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCity } = useCityState();
  const { setIsCurrent, setIs5Days } = useForecastState();

  const handleNowClick = () => {
    setIs5Days(false);
    setIsCurrent(true);
    navigate("/");
  };

  const handle5DaysClick = () => {
    setIs5Days(true);
    setIsCurrent(false);
    navigate("/5days");
  };

  if (!selectedCity) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Forecast
      </div>
      <StyledContainer>
        <Button
          label="Now"
          size="sm"
          isStyled={location.pathname === "/"}
          onClick={handleNowClick}
        />
        <Button
          label="5 days"
          size="sm"
          isStyled={location.pathname === "/5days"}
          onClick={handle5DaysClick}
        />
      </StyledContainer>
    </div>
  );
};

export default PeriodSelector;
