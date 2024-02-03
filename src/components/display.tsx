import CityGrid from "./CityGrid/cityGrid";
import Forecast from "./Forecast/forecast";
import PeriodSelector from "./Forecast/periodSelector";
import TopBar from "./TopBar/topbar";
import { useCityState } from "./cityState";

const Display = () => {
    const { selectedCity } = useCityState();
    const isCurrent = selectedCity ? true : undefined;
    return (
        <div>
            <TopBar />
            <Forecast isCurrent={isCurrent}/>
            <CityGrid />
        </div>
    );
}

export default Display;