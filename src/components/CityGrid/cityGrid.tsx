import React from "react";
import styled from "styled-components";
import { useCityState } from "../cityState";
import { Cities } from "../../assets/cities";
import Button from "../button";
import { useForecastState } from "../Forecast/forecastState";

const GridContainer = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 1rem;
`;

const CityGrid: React.FC = () => {
  const { visibleCities, setSelectedCity, selectedCity } = useCityState();
  const { setIsCurrent} = useForecastState();
  const handleCityClick = (city: Cities) => {
    setSelectedCity(city);
    setIsCurrent(true);
  };

  return (
    <GridContainer>
        {visibleCities.map((city) => (
            <Button label={city.name} isStyled={selectedCity?.name === city.name} onClick={() => handleCityClick(city)} />
        ))}
    </GridContainer>
  );
};

export default CityGrid;
