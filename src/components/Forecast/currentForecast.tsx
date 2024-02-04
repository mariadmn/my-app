import { useSettings } from "../TopBar/Settings/settingsState";
import { useForecast } from "./forecastState";

const CurrentForecast: React.FC = () => {
    const { tempSuffix } = useSettings();
    const { data, isLoading } = useForecast();
    //TODO: Put icon in the right place
    if (!data || Array.isArray(data)) {
        //data is an array of objects
        return <h1>Loading...</h1>;
    }
    
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {data && (
                <div>
                    <h1>{data.name}</h1>
                    <h2>{data.weather[0].description}</h2>
                    <h3>{data.main.temp}{tempSuffix === 'K'? "":"°"}{tempSuffix}</h3>
                    <p>Feels like {data.main.feels_like}{tempSuffix === 'K'? "":"°"}{tempSuffix}</p>
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Wind: {data.wind.speed} m/s</p>
                    <p>Visibility: {data.visibility / 1000} km</p>
                </div>
            )}
        </div>
    );
}
export default CurrentForecast;