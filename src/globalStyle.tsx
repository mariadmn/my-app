import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body, input, button {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica,  sans-serif;
    background-color: "#000";
    color: ${(props) => props.theme.text};
  }
`;