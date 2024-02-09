import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseCircle } from '../../../assets/weather-icons/close-circle.svg';
import { useCityState } from '../../cityState';
import { useForecast } from '../../Forecast/forecastState';
import { useForecastState } from '../../Forecast/useForecastState';


const StyledCloseCircle = styled(CloseCircle)`
  width: 11px; 
  height: 11px; 
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  fill: ${({ theme }) => theme.theme.text};
`;


const Input = styled.input`
  background: transparent;
  border: none;
  padding-right: 24px; 
  flex: 1;
  color: ${({ theme }) => theme.theme.text};
  &::placeholder {
    color: ${({ theme }) => theme.theme.text};
    opacity: 1;
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.theme.text};

  &:hover {
    color: ${({ theme }) => theme.theme.blue};
  }
`;

const Search: React.FC<{isSearchVisible: boolean, onSearchToggle: () => void }> = ({ isSearchVisible, onSearchToggle }) => {
  const { visibleCities, setSelectedCity, setVisibleCities, selectedCity } = useCityState();
  const [ originalCities ] = useState(visibleCities);
  const [ searchInput, setSearchInput ] = useState('');
  const forecastQuery = useForecast(); 
  const { setIsCurrent, isCurrent } = useForecastState();

  const handleSearch = (input: string) => {
    if (input === '') {
      setVisibleCities(originalCities);
    } else {
      const filteredCities = originalCities.filter((city) =>
        city.name.toLowerCase().includes(input.toLowerCase())
      );
      setVisibleCities(filteredCities);
    }
  };

  const handleCitySelection = () => {
    const foundCity = visibleCities.find(
      (city) => city.name.toLowerCase() === searchInput.toLowerCase()
    );
    if (foundCity) {
      setSelectedCity(foundCity);
      setIsCurrent(true);
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCitySelection();
    }
  };

  const handleClear = () => {
    setSearchInput('');
    setVisibleCities(originalCities);
    onSearchToggle();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCitySelection();
  };


  useEffect(() => {
    if (selectedCity) {
      forecastQuery.refetch();
    }
  }, [selectedCity, isCurrent]);

  return (
    <SearchContainer>
      <form onSubmit={handleSubmit} style={{ flexDirection: 'row' }}>
        {isSearchVisible ? (
              <>
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setSearchInput(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  onKeyDown={handleEnterPress}
                />
                <Button type="button" onClick={handleClear}>
                  <StyledCloseCircle />
                </Button>
              </>
            ) : (
              <Button type="button" onClick={onSearchToggle}>
                Search
              </Button>
            )}
      </form>
    </SearchContainer>
  );
};

export default Search;
