import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import CloseCircle from '../../../assets/weather-icons/close-circle.svg';
import { useCityState } from '../../cityState';

interface SearchBoxProps {
    onSearch: (query: string) => void;
}

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

//TODO: change to my theme
//TODO: handle the problem with the icon
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const { visibleCities, selectCity, selectedCity, setVisibleCities } = useCityState();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [originalCities] = useState(visibleCities);
    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setSearchInput(e.target.value);
        const filteredCities = originalCities.filter((city) =>
          city.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setVisibleCities(filteredCities);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchQuery);
        }
    };

    const handleClear = () => {
        setSearchQuery("");
        setVisibleCities(originalCities);
    };

    const handleSubmit= (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const foundCity = visibleCities.find(
        (city) => city.name.toLowerCase() === searchInput.toLowerCase()
      );
      if (foundCity) {
        selectCity(foundCity);
      }
    };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </form>
        <button
        type="button"
        onClick={handleClear}
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
          background: "none",
        }}
      >
        x
      </button>
      </div>
    </div>
  );
};

export default SearchBox;


