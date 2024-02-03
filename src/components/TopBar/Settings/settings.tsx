import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSettings } from './settingsState';

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

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  const { timeFormat, temperatureunits, setTimeFormat, setUnits } = useSettings();

  //Hnadle the closing when the user clicks outside the modal
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer ref={modalRef}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <div>
      <div>
        <label>
          Time Format:
          <button
            onClick={() => setTimeFormat("24h")}
            style={{ marginRight: '8px', background: timeFormat === '24h' ? 'lightblue' : 'white' }}
          >
            24h
          </button>
          <button
            onClick={() => setTimeFormat("AM/PM")}
            style={{ background: timeFormat === 'AM/PM' ? 'lightblue' : 'white' }}
          >
            AM/PM
          </button>
        </label>
      </div>

      <div>
        <label>
          Temperature Units:
          <button
            onClick={() => setUnits('metric')}
            style={{ marginRight: '8px', background: temperatureunits === 'metric' ? 'lightblue' : 'white' }}
          >
            Metric
          </button>
          <button
            onClick={() => setUnits('imperial')}
            style={{ marginRight: '8px', background: temperatureunits === 'imperial' ? 'lightblue' : 'white' }}
          >
            Imperial
          </button>
          <button
            onClick={() => setUnits('standard')}
            style={{ background: temperatureunits === 'standard' ? 'lightblue' : 'white' }}
          >
            Standard
          </button>
        </label>
      </div>
    </div>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
