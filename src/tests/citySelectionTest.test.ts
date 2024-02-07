
import { act, renderHook } from "@testing-library/react";
import { useCityState } from "../components/cityState";
import { Cities } from "../assets/cities";

// Define the CitiesState type
type CitiesState = {
  selectedCity: Cities | undefined;
  setSelectedCity: (city: Cities) => void;
};

const handleCitySelection = (result: CitiesState, searchInput: string) => {
  const foundCity = mockVisibleCities.find(
    (city) => city.name.toLowerCase() === searchInput.toLowerCase()
  );
  if (foundCity) {
    result.setSelectedCity(foundCity);
  }
};


const handleEnterPress = (result: CitiesState,event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    handleCitySelection(result, mockVisibleCities[0].name);
  }
};

const mockVisibleCities: Cities[] = [
  { name: "City A", lat: 0, lon: 0 },
  { name: "City B", lat: 0, lon: 0 },
  { name: "City C", lat: 0, lon: 0 },
];

describe("city grid test", () => {

  it("start with no selected city", () => {
    const { result } = renderHook(() => useCityState());
    expect(result.current.selectedCity).toBeUndefined();
  });

  it("allow selecting a city", () => {
    const { result } = renderHook(() => useCityState());

    act(() => {
      result.current.setSelectedCity(mockVisibleCities[0]);
    });

    expect(result.current.selectedCity).toEqual(mockVisibleCities[0]);
  });

  // it("selects the city search if it's within the visible cities when Enter is pressed", () => {
  //   const { result } = renderHook(() => useCityState());

  //   act(() => {
  //     const mockEvent = { key: 'Enter' } as React.KeyboardEvent<HTMLInputElement>;
  //     const searchInput = mockVisibleCities[0].name;
  //     if (mockEvent.key === 'Enter') {
  //       const foundCity = mockVisibleCities.find(
  //         (city) => city.name.toLowerCase() === searchInput.toLowerCase()
  //       );
  //       if (foundCity) {
  //         result.current.setSelectedCity(foundCity);
  //       }
  //     }
  //   });

  //   expect(result.current.selectedCity).toBe(mockVisibleCities[0]);
  // });


});


