import { useState } from "react";
import Clock from "./Clock/clock";
import Search from "./Search/search";
import styled from "styled-components";
import Modal from "./Settings/settings";
import useTheme, { lightTheme } from "../../theme";
// import ThemeSwitch from "../../assets/weather-icons/theme-switch.svg";
// import { useSettings } from "./Settings/settingsState";
// import SettingsModal from "./Settings/settings";

const StyledTopBar = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

// const StyledIconButton = styled(Button)`
//   padding: 0;
//   margin: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StyledThemeSwitchIcon = styled(ThemeSwitch)`
//   height: 1rem;
//   width: 1rem;
//   border-radius: 50%;
//   background: #fff;
//   border: solid 1px white;
// `;

const TopBar = () => {
  //Handle the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Handle the theme
  const { toggleTheme, theme } = useTheme();

  return (
    <StyledTopBar>
      <Clock />
      <Search />
      <Button onClick={openModal}>Settings</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      {/* TODO: make this button work */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={toggleTheme}
      >
        {theme.background === lightTheme.background ? "Light Theme" : "Dark Theme"}
      </button> 

    </StyledTopBar>
  );
}

export default TopBar;