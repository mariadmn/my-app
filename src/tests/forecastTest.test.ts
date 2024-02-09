import { renderHook } from "@testing-library/react";
import { useQuery } from "react-query";
import { useForecast } from "../components/Forecast/forecastState";
import { useSettings } from "../components/TopBar/Settings/settingsState";
import { useCityState } from "../components/cityState";
import { useForecastState } from "../components/Forecast/useForecastState";
import { act } from "react-dom/test-utils";

jest.mock("../components/TopBar/Settings/settingsState");
jest.mock("../components/cityState");
jest.mock("react-query");

describe("useForecast", () => {
  it("calls query correctly when a city is selected", () => {
    const mockSettings = {
      temperatureunits: "metric",
    };
    (useSettings as jest.MockedFunction<typeof useSettings>).mockReturnValue(mockSettings);

    const mockCityState = {
      selectedCity: { lat: 0, lon: 0 },
    };
    (useCityState as jest.MockedFunction<typeof useCityState>).mockReturnValue(mockCityState);

    const { result: forecastStateResult } = renderHook(() => useForecastState());

    act(() => {
      forecastStateResult.current.setIsCurrent(true);
    });

    const isCurrent = forecastStateResult.current.isCurrent;

    const { result } = renderHook(() => useForecast());

    const queryName = isCurrent ? "weather" : "forecast";

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: [queryName, { lat: 0, lon: 0 }, "metric"],
      queryFn: expect.any(Function), 
      enabled: true,
    });
  });
});

