import { useSettings } from "../TopBar/Settings/settingsState";
import WeatherIcon from "./weatherIcon";
import { useForecast } from "./forecastState";

const FiveDaysForecast: React.FC = () => {
    const { tempSuffix } = useSettings();
    const { data, isLoading } = useForecast();
    //TODO: Put icon in the right place

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data || !Array.isArray(data)) {
        //data is an array of objects
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {data && (
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: "center"}}>
                    <h1>{data[0].cityName || 'Loading...'}</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignContent: "center"}}>
                        {data.map((day: any) => (
                            <div key={day.date}>
                                <h2>{day.dayOfWeek}</h2>
                                <WeatherIcon condition={day.forecastDetails[0].weather.main} />
                                <h4>
                                    H:{day.highestTemp}{tempSuffix === 'K'? "":"°"}{tempSuffix} 
                                    / L:{day.lowestTemp}{tempSuffix === 'K'? "":"°"}{tempSuffix}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            )} 
        </div>
    );
}
export default FiveDaysForecast;
