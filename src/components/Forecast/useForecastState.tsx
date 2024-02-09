import { create } from "zustand";

type ForecastState = {
    isCurrent: boolean;
    is5Days?: boolean;
    setIsCurrent: (isCurrent: boolean) => void;
    setIs5Days: (is5Days: boolean) => void;
  };
  
  export const useForecastState = create<ForecastState>((set) => ({
    isCurrent: false,
    is5Days: false,
    setIsCurrent: (isCurrent) => set({ isCurrent }),
    setIs5Days: (is5Days) => set({ is5Days }),
  }));
  