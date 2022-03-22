import React from 'react';
import styled, { keyframes } from "styled-components/macro"

const typing = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.8;
    }
    100% {
        opacity: 0;
    }
`

const StyledTyping = styled.div`
    width: 4.5em;
    height: 2em;
    position: relative;
    padding: 10px;
    margin: 5px 50px;
    background: ${(props) => props.theme.primary};
    border-radius: 20px;

    .typing__dot {
        float: left;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        background: #8d8c91;
        border-radius: 50%;
        opacity: 0;
        animation: ${typing} 1s infinite;
    }

    .typing__dot:nth-child(1) {
        animation-delay: 0s;
    }

    .typing__dot:nth-child(2) {
        animation-delay: 0.2s;
    }

    .typing__dot:nth-child(3) {
        animation-delay: 0.4s;
    }
`

export default function Typing() {
    return (
        <StyledTyping>
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
            <div className="typing__dot"></div>
        </StyledTyping>
    )
}
