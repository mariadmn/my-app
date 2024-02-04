import React from "react";
import FiveDaysForecast from "./5dayforecast";
import CurrentForecast from "./currentForecast";
import PeriodSelector from "./periodSelector";

interface ForecastProps {
    isCurrent: boolean | undefined;
    is5Days?: boolean | undefined;
}
const Forecast: React.FC<ForecastProps> = (props) => {
    if(props.isCurrent === true){
        return (
            <div>
                <CurrentForecast />
                <PeriodSelector />
            </div>
        );
    }

    if(props.is5Days === true){
        return (
            <div>
                <FiveDaysForecast />
                <PeriodSelector />
            </div>
        );
    }

    return (
        <div>
            <h1>Pick a city to see the full forecast</h1>
        </div>
    );
}

export default Forecast;