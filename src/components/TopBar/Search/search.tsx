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

//TODO: change to my theme
//TODO: handle the problem with the icon
const Search: React.FC = () => {
    const { visibleCities, setSelectedCity, setVisibleCities, setDisabledCities } = useCityState();
    //Make a copy of the original cities
    const [originalCities] = useState(visibleCities);
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (input: string) => {
      if(input === ""){
        setVisibleCities(originalCities);
        setDisabledCities([]);
      }else{
        const filteredCities = originalCities.filter((city) =>
          !city.name.toLowerCase().includes(input.toLowerCase())
        );
        setDisabledCities(filteredCities);
      }
    };

    //handle enter key
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          const filterCity = originalCities.filter((city) =>
            city.name.toLowerCase() === searchInput.toLowerCase()
          );
            if(filterCity.length > 0){
              setSelectedCity(filterCity[0]);
            }
        }
    };

    const handleClear = () => {
        setSearchInput("");
        setVisibleCities(originalCities);
        setDisabledCities([]);
    };

    const handleSubmit= (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const foundCity = originalCities.find(
        (city) => city.name.toLowerCase() === searchInput.toLowerCase()
      );
      if (foundCity) {
        setSelectedCity(foundCity);
      }
    };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  );
};

export default Search;


