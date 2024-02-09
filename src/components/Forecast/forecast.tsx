import React from "react";
import FiveDaysForecast from "./5dayforecast";
import CurrentForecast from "./currentForecast";
import styled from "styled-components";

interface ForecastProps {
    isCurrent: boolean | undefined;
    is5Days?: boolean | undefined;
}

const CenteredContent = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.theme.text};
`;

const Forecast: React.FC<ForecastProps> = (props) => {
    if(props.isCurrent === true){
        return (
            <CenteredContent>
                <CurrentForecast />
            </CenteredContent>
        );
    }

    if(props.is5Days === true){
        return (
            <CenteredContent>
                <FiveDaysForecast />
            </CenteredContent>
        );
    }

    return (
        <CenteredContent>
            <h1>Pick a city to see the full forecast</h1>
        </CenteredContent>
    );
}

export default Forecast;