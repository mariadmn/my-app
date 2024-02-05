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

const StyledButton = styled(Button)`
  font-size: 14px; /* Adjust the font size as needed */
  padding: 8px 16px; /* Adjust padding as needed */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.blue}; 
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.blue}; 
    color: ${theme.white};
  `}
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
        <StyledButton
          label="Now"
          size="sm"
          isStyled={location.pathname === "/"}
          isSelected={location.pathname === "/"}
          onClick={handleNowClick}
        />
        <StyledButton
          label="5 days"
          size="sm"
          isStyled={location.pathname === "/5days"}
          isSelected={location.pathname === "/5days"}
          onClick={handle5DaysClick}
        />
      </StyledContainer>
    </div>
  );
};

export default PeriodSelector;
