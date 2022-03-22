import { createGlobalStyle } from "styled-components/macro";
import fonts from './fonts';
import variables from './variables';

export const lightTheme = {
    body: "#f5f6fb",
    color: "#2f3f56",
    primary: "#ffffff",
    svg: "#191970",
    input: "#f1f4f9",
    font: "#2f3f56"
}

export const darkTheme = {
    body: "#0c0f1d",
    color: "#cecfd1",
    primary: "#1b1d2a",
    svg: "#3D59AB",
    input: "#343746",
    font: "#cecfd1"
}

export const GlobalStyles = createGlobalStyle`
    ${fonts};
    ${variables};

    html{
        box-sizing: border-box;
    }

    *, *:before, *:after{
        box-sizing: inherit;
        margin:0;
        padding:0;
    }


    body{
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        ${'' /* overflow-y: hidden; */}
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.color};
        font-family: var(--font);
        font-size: var(--fz-md);
        transition: all 0.7s ease;
        position: relative;
    }

    ::-webkit-scrollbar {
        width: 0;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }

    .loader{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a{
        text-decoration: none;
    }
`