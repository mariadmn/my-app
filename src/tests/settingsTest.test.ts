import { act, renderHook } from "@testing-library/react";
import { useSettings } from "../components/TopBar/Settings/settingsState";


describe("settings test", () => {
  it("starts with default settings", () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.temperatureunits).toBe("metric");
    expect(result.current.timeFormat).toBe("24h");
  });

  it("allows changing time format", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setTimeFormat("AM/PM");
    });

    expect(result.current.timeFormat).toBe("AM/PM");
  });

  it("allows changing temperature units", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setUnits("imperial");
    });

    expect(result.current.temperatureunits).toBe("imperial");
  });
});
