import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import CloseCircle from '../../../assets/weather-icons/close-circle.svg';

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
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // const filteredCities = originalCities.filter((city) =>
        //   city.name.toLowerCase().includes(inputValue.toLowerCase())
        // );
        // setVisibleCities(filteredCities);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchQuery);
        }
    };

    const handleClear = () => {
        setSearchQuery("");
        // setVisibleCities(originalCities);
    };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {searchQuery && (
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
                <StyledCloseCircle />
            </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
