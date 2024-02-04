import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  size?: "sm" | "md" | "lg";
  isStyled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  disabled?: boolean;
  isSelected?: boolean;
};

//TODO: change styling
const StyledButton = styled.button<ButtonProps>`
  background: ${({ theme }) => theme.backgorund};
  border: 2px solid ${({ theme }) => theme.blue};
  width: 100%;
  border-radius: 10px;
  padding: 14px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.blue};
    border-color: ${({ theme }) => theme.text};
  }

  ${(props) =>
    props.disabled === true &&
    css`
      background-color: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.blue};
      border-color: ${({ theme }) => theme.text};
      cursor: not-allowed;
  `}

  ${(props) =>
    props.size === "sm" &&
    css`
      font-size: 14px;
      padding: 8px;
    `}

  ${(props) =>
    props.size === "lg" &&
    css`
      font-size: 18px;
      padding: 18px;
    `}

  ${(props) =>
    props.isStyled &&
    css`
      background-color: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.blue};
      border-color: ${({ theme }) => theme.text};
    `}
`;

const Button: React.FC<ButtonProps> = ({
  size = "md",
  isStyled = false,
  onClick,
  label,
  disabled,
  isSelected
}) => {
  return (
    <StyledButton size={size} isStyled={isStyled} onClick={onClick} disabled={disabled} isSelected={isSelected}>
      {label}
    </StyledButton>
  );
};

export default Button;
