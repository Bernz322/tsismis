import React, { useContext } from 'react'
import styled from "styled-components/macro"
import ReactTooltip from 'react-tooltip';

import { ChatContext } from "../context/ChatProvider"

const StyledSenderChatMessage = styled.div`
    max-width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin: 5px 0;
    
    img.chat-message-avatar{
        background-color: white;
        border-radius: var(--border-radius-circle);
        width: 40px;
        height: 40px;
        margin-right: 10px;
        /* padding: 2.5px; */

        @media (max-width: 500px) {
            width: 30px;
            height: 30px;
         }
    }
    
    .chat-message-content{
        text-align: justify;
        padding: 13px;
        border-radius: 15px;
        background-color: ${(props) => props.theme.primary};
        @media (max-width: 500px) {
            padding: 5px 13px;
            font-size: var(--fz-sm);
         }
    }
`

const StyledYouChatMessage = styled.div`
    max-width: 90%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 5px 0px 10px 15%;
    color: var(--light-mode-body-color);
    
    .chat-message-content{
        text-align: justify;
        padding: 13px;
        border-radius: 15px;
        background-color: ${(props) => props.theme.svg};
        @media (max-width: 500px) {
            padding: 5px 13px;
            font-size: var(--fz-sm);
         }
    }
`

export default function ChatMessage({ message, selectedChat }) {
    const { user } = useContext(ChatContext)
    const sender = message.sender
    return (
        <>
            {message &&
                (sender._id === user._id) // If the message is sent by the current logged in user, render the one without image
                ?
                <StyledYouChatMessage>
                    <p className="chat-message-content">{message.content}</p>
                </StyledYouChatMessage>
                :
                <StyledSenderChatMessage>
                    <img data-tip={message.sender.username} data-type="info" className="chat-message-avatar" src={message.sender.profileImg} alt="avatar" />
                    <ReactTooltip />
                    <p className="chat-message-content">{message.content}</p>

                </StyledSenderChatMessage>
            }
        </>
    )
}
