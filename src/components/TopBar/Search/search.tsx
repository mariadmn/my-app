import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import CloseCircle from '../../../assets/weather-icons/close-circle.svg';
import { useCityState } from '../../cityState';

const StyledCloseCircle = styled(CloseCircle)`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

const Input= styled.input`
  background: transparent;
  border: none;
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 1;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
`;

const Search: React.FC = () => {
  const { visibleCities, setSelectedCity, setVisibleCities, selectedCity } = useCityState();
  const [originalCities] = useState(visibleCities);
  const [searchInput, setSearchInput] = useState('');

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCitySelection();
    }
  };

  const handleCitySelection = () => {
    const foundCity = visibleCities.find(
      (city) => city.name.toLowerCase() === searchInput.toLowerCase()
    );
    if (foundCity) {
      setSelectedCity(foundCity);
    }
  };

  const handleClear = () => {
    setSearchInput('');
    setVisibleCities(originalCities);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCitySelection();
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <form onSubmit={handleSubmit} style={{flexDirection: "row"}}>
          <Input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
          <Button type="button" onClick={handleClear}>
            {/* <StyledCloseCircle /> */}
            x
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Search;
