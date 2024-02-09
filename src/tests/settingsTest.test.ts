import { act, renderHook } from "@testing-library/react";
import { useSettings } from "../components/TopBar/Settings/settingsState";


describe("settings test", () => {
  test("starts with default settings", () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.temperatureunits).toBe("metric");
    expect(result.current.timeFormat).toBe("24h");
  });

  test("allows changing time format", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setTimeFormat("AM/PM");
    });

    expect(result.current.timeFormat).toBe("AM/PM");
  });

  test("allows changing temperature units", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setUnits("imperial");
    });

    expect(result.current.temperatureunits).toBe("imperial");
  });

  test("saves settings to local storage", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setUnits("imperial");
    });

    const includesImperial = localStorage.getItem("settings-preferences")?.includes("imperial");

    expect(includesImperial).toBe(true);
  });

  test("loads settings from local storage", () => {
    localStorage.setItem("settings-preferences", JSON.stringify({ temperatureunits: "imperial", tempSuffix: "F", timeFormat: "24h" }));

    const { result } = renderHook(() => useSettings());

    expect(result.current.temperatureunits).toBe("imperial");
  });


});
