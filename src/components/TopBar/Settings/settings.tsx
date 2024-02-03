import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TemperatureUnit, useSettings } from './settingsState';
import { AnimatePresence } from 'framer-motion';
import Button from '../../button';
import Clock from '../Clock/clock';
import { useForecast } from '../../Forecast/forecastState';

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
  padding: 20px;
  border-radius: 8px;
`;

const RowContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 10px;
  flex-direction: row; /* Change this line to make it a row */
  align-items: center;
  justify-content: center;

  label {
    text-align: center; 
  }
`;

const StyledModalTitle = styled.h2`
  text-align: center;
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { timeFormat, temperatureunits, setTimeFormat, setUnits } = useSettings();
  const { isOpen, onClose } = props;
  //Local Variables
  const [tempUnits, setTempUnits] = useState<TemperatureUnit>(temperatureunits);
  const [tempTimeFormat, setTempTimeFormat] = useState<string>(timeFormat);


  useEffect(() => {
    if (props.isOpen) {
      setTempUnits(temperatureunits);
      setTempTimeFormat(timeFormat);
    }
  }, [isOpen, temperatureunits, timeFormat]);

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
        <RowContainer>
          <label>
            Time Format:
            <Button
              label={"24H"}
              onClick={() => (setTempTimeFormat("24h"))}
              size="sm"
              isStyled={tempTimeFormat === "24h"}
            />
            <Button
              label={"AM/PM"}
              onClick={() => (setTempTimeFormat("AM/PM"))}
              size="sm"
              isStyled={tempTimeFormat === "AM/PM"}
            />
          </label>
        </RowContainer>
        <RowContainer>
          <label>
            Temperature Units:
            <Button
              label={"Metric"}
              onClick={() => (setTempUnits('metric'))}
              size="sm"
              isStyled={temperatureunits === 'metric'}
            />
            <Button
              label={"Imperial"}
              onClick={() => (setTempUnits('imperial'))}
              size="sm"
              isStyled={temperatureunits === 'imperial'}
            />
            <Button
              label={"Standard"}
              onClick={() => (setTempUnits('standard'))}
              size="sm"
              isStyled={temperatureunits === 'standard'}
            />
          </label>
        </RowContainer>
        <RowContainer>
          <Button label={"Cancel"} onClick={handleClose} size="sm" />
          <Button label={"Save"} onClick={saveSettings} size="sm" />
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
