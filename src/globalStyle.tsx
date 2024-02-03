import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, input, button {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica,  sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
  }
`;