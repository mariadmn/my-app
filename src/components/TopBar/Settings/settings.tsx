import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TemperatureUnit, useSettings } from './settingsState';
import Button from '../../button';
import Clock from '../Clock/clock';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  width: 400px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.theme.background};
  border: 1px solid ${({ theme }) => theme.theme.blue};
`;


const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
`;

const StyledModalTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.theme.text};
`;
;

const StyledButton = styled(Button)`
  flex: 1;
  min-width: 80px; 
  height: 30px; 
`;

const StyledText = styled.h4`
  color: ${({ theme }) => theme.theme.text};
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  gap: 10px; 
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { timeFormat, temperatureunits, setTimeFormat, setUnits } = useSettings();
  const { onClose } = props;
  //Local Variables
  const [tempUnits, setTempUnits] = useState<TemperatureUnit>(temperatureunits);
  const [tempTimeFormat, setTempTimeFormat] = useState<string>(timeFormat);

  useEffect(() => {
    if (props.isOpen) {
      setTempUnits(temperatureunits);
      setTempTimeFormat(timeFormat);
    }
  }, [props.isOpen, temperatureunits, timeFormat]);

  const saveSettings = () => {
    setUnits(tempUnits);
    setTimeFormat(tempTimeFormat as '24h' | 'AM/PM');
    onClose();
  };

  const handleClose = () => {
    setTempUnits(temperatureunits);
    setTempTimeFormat(timeFormat);
    onClose();
  };

  if (!props.isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <StyledModalTitle>Settings</StyledModalTitle>
        <ColumnContainer>
            <StyledText>Units</StyledText>
            <RowContainer>
              <StyledButton
                label={"Metric"}
                onClick={() => (setTempUnits('metric'))}
                isSelected={tempUnits === 'metric'}
              />
              <StyledButton
                label={"Imperial"}
                onClick={() => (setTempUnits('imperial'))}
                isSelected={tempUnits === 'imperial'}
              />
              <StyledButton
                label={"Standard"}
                onClick={() => (setTempUnits('standard'))}
                isSelected={tempUnits === 'standard'}
              />
            </RowContainer>
        </ColumnContainer>
        <ColumnContainer>
          <h4>Time</h4>
          <RowContainer>
            <StyledButton
              label={"24H"}
              onClick={() => (setTempTimeFormat("24h"))}
              isSelected={tempTimeFormat === "24h"}
            />
            <StyledButton
              label={"AM/PM"}
              onClick={() => (setTempTimeFormat("AM/PM"))}
              isSelected={tempTimeFormat === "AM/PM"}
            />
          </RowContainer>
        </ColumnContainer>
        &nbsp;
        <RowContainer>
          <StyledButton label={"Cancel"} onClick={handleClose} />
          <StyledButton label={"Save"} onClick={saveSettings} />
        </RowContainer>
        <div
          style={{
            textAlign: "center",
            fontSize: "10px",
            marginTop: "1rem",
          }}
        >
            <Clock />
        </div>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
