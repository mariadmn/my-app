import React from "react";
import FiveDaysForecast from "./5dayforecast";
import CurrentForecast from "./currentForecast";
import PeriodSelector from "./periodSelector";
import styled from "styled-components";

interface ForecastProps {
    isCurrent: boolean | undefined;
    is5Days?: boolean | undefined;
}

const CenteredContent = styled.div`
  text-align: center;
`;

const AbsolutePeriodSelector = styled(PeriodSelector)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const Forecast: React.FC<ForecastProps> = (props) => {
    if(props.isCurrent === true){
        return (
            <CenteredContent>
                <CurrentForecast />
                {/* <AbsolutePeriodSelector /> */}
            </CenteredContent>
        );
    }

    if(props.is5Days === true){
        return (
            <CenteredContent>
                <FiveDaysForecast />
                {/* <AbsolutePeriodSelector /> */}
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