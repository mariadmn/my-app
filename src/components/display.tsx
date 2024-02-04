import CityGrid from "./CityGrid/cityGrid";
import Forecast from "./Forecast/forecast";
import { useForecastState } from "./Forecast/forecastState";
import PeriodSelector from "./Forecast/periodSelector";
import TopBar from "./TopBar/topbar";

const Display = () => {
    const { isCurrent, is5Days } = useForecastState();
    return (
        <div>
            <TopBar />
            <Forecast isCurrent={isCurrent} is5Days={is5Days}/>
            <CityGrid />
        </div>
    );
}

export default Display;