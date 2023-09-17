import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    .text {
        color: ${({theme}) => theme.colors.text};
    }

    body {
        overflow: hidden;
    }

    .small-text {
        font-size: 0.8rem;
    }

    hr {
        color: ${({ theme }) => theme.colors.text};
    }

    .icon {
        transition: filter 0.3s ease-in-out;
        cursor: pointer;
        &:hover {
            filter: brightness(50%);
        }
    }  


    .logo {
        font-weight: 700;
        white-space: nowrap;
        letter-spacing: -0.75px;
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
        background-color: #344;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #333;
    }

`;