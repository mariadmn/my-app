import { useSettings } from "../TopBar/Settings/settingsState";
import { useCityState } from "../cityState";
import { useForecast } from "./forecastState";

const FiveDaysForecast: React.FC = () => {
    const { tempSuffix } = useSettings();
    const { selectedCity } = useCityState();
    const { data, isLoading } = useForecast(false);
    //TODO: Put icon in the right place
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {data && (
                <div>
                    <h1>{data.name}</h1>
                    {data.map((day: any) => (
                        <div key={day.date}>
                            <h2>{day.dayOfWeek}</h2>
                            <h3>
                                {day.highestTemp}
                                {tempSuffix} / {day.lowestTemp}
                                {tempSuffix}
                            </h3>
                            <p>
                                {day.forecastDetails[0].weather.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default FiveDaysForecast;
