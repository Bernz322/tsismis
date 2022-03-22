import React, { useState, useEffect, useContext } from 'react';


import { ChatContainer, ChatMain, ChatInfo } from '../components'
import { StyledChatPage } from '../styles'
import { ChatContext } from '../context/ChatProvider'

export default function ChatPage() {
    const { selectedChat } = useContext(ChatContext)
    const [isChatContainerOpen, setIsChatContainerOpen] = useState(true)
    const [isChatMainOpen, setIsChatMainOpen] = useState(true)
    const [isChatInfoOpen, setIsChatInfoOpen] = useState(true)
    const [backBtnIndicator, setBackBtnIndicator] = useState(false)
    const [isBigWidth, setIsBigWidth] = useState(false)

    /**
     * @description - This function is used to toggle the chat container (left)
     * whenever the Chats icon is clicked in the main container.
     * It sets the left container as true, which will make it visible and
     * false to the other 2 containers.
     * A back button is also added to the left container, which will be used
     */
    const handleChatContainer = () => {
        setIsChatContainerOpen(true)
        setIsChatMainOpen(!isChatMainOpen)
        setIsChatInfoOpen(false)
        setBackBtnIndicator(true)
    }

    /**
     * @description - This function is used to toggle the chat info (right)
     * whenever the Info icon is clicked in the main container.
     * It sets the right container as true, which will make it visible and
     * false to the other 2 containers.
     * A back button is also added to the left container, which will be used
     */
    const handleChatInfo = () => {
        setIsChatContainerOpen(false)
        setIsChatMainOpen(!isChatMainOpen)
        setIsChatInfoOpen(true)
        setBackBtnIndicator(true)
    }

    /**
     * @description - This function is used to toggle back to the main container/ view.
     * It sets all 3 containers as true and false to the back button which uses this function.
     * This function is called when the screen width is greater than 1250, mostly desktops.
     */
    const handleBack = () => {
        setIsChatContainerOpen(true)
        setIsChatMainOpen(true)
        setIsChatInfoOpen(true)
        setBackBtnIndicator(false)
    }

    /**
     * @description - This function is used to toggle back to the main container/ view.
     * It sets the main container as true (visible) and false on the other containers.
     * Sets false to the back button which uses this function.
     * This function is called when the screen width is less than 1250, mostly mobile.
     */
    const handleBackMobile = () => {
        setIsChatContainerOpen(false)
        setIsChatMainOpen(true)
        setIsChatInfoOpen(false)
        setBackBtnIndicator(false)
    }

    /**
     * Below is used to determine and get the screen size of the device.
     */
    const [width, setWidth] = useState(window.innerWidth);  // width of the screen

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        /**
         * The resize event fires when the document view (window) has been resized.
         * So whenever the screen is resized, we call the function handleResizeWindow which sets the width with the current window width.
         * Read more about resize here https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event/
         */

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, [width]);

    useEffect(() => {
        /**
         * Set the states of the two containers (left and right) depending on the screen size.
         * Very important as the screen size is used to determine the visibility of the containers.
         */
        if (width < 1250) {
            setIsChatContainerOpen(false);
            setIsChatInfoOpen(false);
            setIsBigWidth(true);
        } else {
            setIsChatContainerOpen(true);
            setIsChatMainOpen(true);
            setIsChatInfoOpen(true);
            setIsBigWidth(false);
        }
    }, [width]);

    return (
        <StyledChatPage>
            <div className={`container_left ${isChatContainerOpen ? "unhide" : "hide"}`}>
                <ChatContainer handleBack={width < 1250 ? handleBackMobile : handleBack} backBtnIndicator={backBtnIndicator} />
            </div>
            <div className={`container_middle ${isChatMainOpen ? "unhide" : "hide"}`}>
                <ChatMain handleChatContainer={handleChatContainer} handleChatInfo={handleChatInfo} isBigWidth={isBigWidth} />
            </div>
            {selectedChat &&
                <div className={`container_right ${isChatInfoOpen ? "unhide" : "hide"}`}>
                    <ChatInfo handleBack={width < 1250 ? handleBackMobile : handleBack} backBtnIndicator={backBtnIndicator} />
                </div>
            }
        </StyledChatPage >
    )
}
