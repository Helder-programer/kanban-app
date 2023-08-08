import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    input {
        color: ${({theme}) => theme.colors.text};
    }
`;