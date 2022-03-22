import styled, { keyframes } from "styled-components/macro";

const rotation = keyframes`
    from {
    transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`

const StyledFooter = styled.footer`
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 45px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${(props) => props.theme.primary};

    @media (max-width: 500px) {
        font-size: var(--fz-sm);
    }

    a.floating-icons{
        border-radius: 100%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        color: ${(props) => props.theme.svg};

        @media screen and (min-width: 1200px) {
            margin-top: 0;
        }

        @media screen and (max-width: 1199px){
            
        }

        &:hover{
            filter: brightness(1.1);
            animation: ${rotation} 2s infinite linear;
        }
    }
`

export default StyledFooter