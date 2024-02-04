import React from "react";
import styled from "styled-components";
// import Button from "../button";
import { useCityState } from "../cityState";
// import { AnimatePresence, motion } from "framer-motion";
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
      {/* <AnimatePresence> */}
        {visibleCities.map((city) => (
          // <motion.div
          //   layout
          //   layoutId={city.name}
          //   key={city.name}
          //   initial={{ opacity: 0, scale: 0.75 }}
          //   animate={{ opacity: 1, scale: 1 }}
          //   exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.2 } }}
          // >
            <Button label={city.name} isStyled={selectedCity?.name === city.name} onClick={() => handleCityClick(city)} />
          // </motion.div>
        ))}
      {/* </AnimatePresence> */}
    </GridContainer>
  );
};

export default CityGrid;
