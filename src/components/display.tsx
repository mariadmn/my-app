import CityGrid from "./CityGrid/cityGrid";
import Forecast from "./Forecast/forecast";
import TopBar from "./TopBar/topbar";
import { useCityState } from "./cityState";

const Display = () => {
    const { selectedCity } = useCityState();
    const isCurrent = selectedCity ? true : undefined;
    return (
        <div>
            <TopBar />
            <Forecast isCurrent={isCurrent} is5Days={undefined}/>
            <button>5 days forecast</button>
            <CityGrid />
        </div>
    );
}

export default Display;