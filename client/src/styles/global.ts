import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    .text {
        color: ${({theme}) => theme.colors.text};
    }

    body {
        overflow-x: hidden;
    }

    a:hover {
        color: $custom-black-light;
    }

    .small-text {
        font-size: 0.8rem;
    }

    hr {
        color: ${({ theme }) => theme.colors.text};
    }


    //ScrollBar
    ::-webkit-scrollbar {
        height: 5px;
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: gray;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #333;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #333;
    }

`;