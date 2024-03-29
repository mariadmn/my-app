import { useState } from "react";
import Clock from "./Clock/clock";
import Search from "./Search/search";
import styled from "styled-components";
import Modal from "./Settings/settings";
import useTheme from "../theme";
import { ReactComponent as ThemeSwitch } from "../../assets/weather-icons/theme-switch.svg";

const StyledTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
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

const StyledThemeSwitch = styled(ThemeSwitch)`
  width: 15px; 
  height: 15px; 
  fill: ${({ theme }) => theme.theme.text};
`;

const ThemeSwitchButton = styled(Button)`
  margin-right: 10x; 
  color: ${({ theme }) => theme.theme.text};
`;

const TopBar: React.FC = () => {
  // Handle the search bar visibility
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Handle the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle the theme
  const { toggleTheme } = useTheme();

  return (
    <StyledTopBar>
      <Clock />
      <RightSection>
        <Search
          isSearchVisible={isSearchVisible}
          onSearchToggle={() => setIsSearchVisible(!isSearchVisible)}
        />
         <Button onClick={openModal}>Settings</Button>
        <ThemeSwitchButton type="button" onClick={toggleTheme}>
          <StyledThemeSwitch />
        </ThemeSwitchButton>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </RightSection>
    </StyledTopBar>
  );
}

export default TopBar;
