import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../button";
import { useCityState } from "../cityState";


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
          onClick={() => navigate("/")}
        />
        <Button
          label="5 days"
          size="sm"
          isStyled={location.pathname === "/5days"}
          onClick={() => {navigate("/5days"); console.log(location.pathname)}}
        />
      </StyledContainer>
    </div>
  );
};

export default PeriodSelector;
