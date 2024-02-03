import { Cities, CitiesArray } from "../assets/cities";
import { create } from "zustand";

type CitiesState = {
  selectedCity: Cities | undefined;
  visibleCities: Cities[];//The cities that are visible
  disabledCities: Array<Cities>; //The cities that are not compatible with the search
  setDisabledCities: (cities: Array<Cities>) => void;
  setSelectedCity: (city: Cities) => void;
  setVisibleCities: (cities: Array<Cities>) => void;
};

const shuffleArray = (array: Cities[]) => {
  const shuffled = [...array];
  // Function to shuffle an array in-place using Fisher-Yates algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i !== j) {
        // Swap array[i] and array[j]
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }
  return shuffled;
};


export const useCityState = create<CitiesState>((set) => ({
  selectedCity: undefined, 
  visibleCities: shuffleArray(CitiesArray).slice(0, 18), // 18 cities
  disabledCities: [],
  setDisabledCities: (cities) => set({ disabledCities: cities }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  setVisibleCities: (cities) => set({ visibleCities: cities }),
}));
