import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TemperatureUnit = "imperial" | "metric" | "standard";

interface SettingsState {
  temperatureunits: TemperatureUnit;
  timeFormat: "AM/PM" | "24h";
  tempSuffix: "K" | "C" | "F";
  setTimeFormat: (format: "AM/PM" | "24h") => void;
  setUnits: (units: TemperatureUnit) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
        //Default values
        temperatureunits: "metric",
        tempSuffix: "C",
        timeFormat: "24h",
        //Functions
        setTimeFormat: (format) => set(() => ({ timeFormat: format })),
        setUnits: (temperatureunits) => {
            let suffix: "K" | "C" | "F";
            switch (temperatureunits) {
            case "metric":
                suffix = "C";
                break;
            case "imperial":
                suffix = "F";
                break;
            case "standard":
                suffix = "K";
                break;
            default:
                suffix = "C";
            }
            set({ temperatureunits, tempSuffix: suffix });
        },
    }),
    { name: "settings-preferences" }
  )
);
