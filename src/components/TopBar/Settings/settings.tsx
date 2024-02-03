import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TemperatureUnit, useSettings } from './settingsState';
import { AnimatePresence } from 'framer-motion';
import Button from '../../button';
import Row from '../../row';

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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// ... (your existing imports)

type ModalProps = {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { timeFormat, temperatureunits, setTimeFormat, setUnits } = useSettings();
  const { isOpen, onClose } = props;
  const [localUnits, setLocalUnits] = useState<TemperatureUnit>(temperatureunits);
  const [localTimeFormat, setLocalTimeFormat] = useState<string>(timeFormat);

  //Hnadle the closing when the user clicks outside the modal
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.isOpen) {
      setLocalUnits(temperatureunits);
      setLocalTimeFormat(timeFormat);
    }
  }, [isOpen, temperatureunits, timeFormat]);

  if (!props.isOpen) return null;

  // Use local variables to track changes before saving
  let tempLocalUnits = localUnits;
  let tempLocalTimeFormat = localTimeFormat;

  const saveSettings = () => {
    // Save only when the "Save" button is clicked
    setUnits(tempLocalUnits as TemperatureUnit);
    setTimeFormat(tempLocalTimeFormat as "AM/PM" | "24h");
    onClose();
  };

  const handleClose = () => {
    setLocalUnits(temperatureunits);
    setLocalTimeFormat(timeFormat);
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer ref={modalRef}>
        <RowContainer>
          <label>
            Time Format:
            <Button
              label={"24H"}
              onClick={() => (tempLocalTimeFormat = "24h")}
              size="sm"
              isStyled={localTimeFormat === "24h"}
            />
            <Button
              label={"AM/PM"}
              onClick={() => (tempLocalTimeFormat = "AM/PM")}
              size="sm"
              isStyled={localTimeFormat === "AM/PM"}
            />
          </label>
        </RowContainer>
        <RowContainer>
          <label>
            Temperature Units:
            <Button
              label={"Metric"}
              onClick={() => (tempLocalUnits = 'metric')}
              size="sm"
              isStyled={temperatureunits === 'metric'}
            />
            <Button
              label={"Imperial"}
              onClick={() => (tempLocalUnits = 'imperial')}
              size="sm"
              isStyled={temperatureunits === 'imperial'}
            />
            <Button
              label={"Standard"}
              onClick={() => (tempLocalUnits = 'standard')}
              size="sm"
              isStyled={temperatureunits === 'standard'}
            />
          </label>
        </RowContainer>
        <RowContainer>
          <Button label={"Cancel"} onClick={handleClose} size="sm" />
          <Button label={"Save"} onClick={saveSettings} />
        </RowContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
