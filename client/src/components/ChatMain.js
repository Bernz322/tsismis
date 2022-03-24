import React, { useContext, useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip';
import { CircularProgress } from '@mui/material';
import axios from "axios"
import { useSnackbar } from 'notistack';
import ScrollableFeed from 'react-scrollable-feed'
import io from 'socket.io-client'

import { StyledChatMain } from "../styles"
import { ChatContext } from "../context/ChatProvider"
import { getSenderName } from "../utils"
import { ChatMessage, Typing } from '.';

// Endpoint for our Socket.io server; Change this when deployed to the host name.
const endPoint = process.env.NODE_ENV !== 'production' ? `http://localhost:8888` : `https://tsismis.herokuapp.com`     
var socket, selectedChatCompare;

export default function ChatMain({ handleChatContainer, handleChatInfo, isBigWidth }) {
    const { selectedChat, user, notification, setNotification, fetchAgain, setFetchAgain } = useContext(ChatContext)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [currentUserTyping, setCurrentUserTyping] = useState(false)
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // useEffect for creating socket implementation
        socket = io(endPoint)
        socket.emit("setup", user)
        socket.on("connected", () => { setSocketConnected(true) })
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
    })

    const fetchChatMessages = async () => {
        if (!selectedChat) return;
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/message/${selectedChat._id}`)
            setMessages(data)
            setLoading(false)
            socket.emit("join chat", selectedChat._id)
        } catch (error) {
            setLoading(false)
            enqueueSnackbar("Failed fetching all messages. Try relogging.", { variant: "error" });
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!message) return    // If there is no message, then ignore the send submission
        socket.emit("stop typing", selectedChat._id)
        try {
            setMessage("")
            const { data } = await axios.post("/api/message", { content: message, chatId: selectedChat._id })
            socket.emit("message sent", data)
            setMessages([...messages, data])    // Append the new message to the fetched messages
            setFetchAgain(!fetchAgain)
        } catch (error) {
            enqueueSnackbar("Failed sending message. Try relogging.", { variant: "error" });
        }
    }

    useEffect(() => {
        // useEffect for receiving messages from socket implementation
        socket.on("message received", (messageData) => {
            // Check if the new message is from the selected chat (We are inside the chat)
            // If it is, then append the message to the messages array
            // Otherwise, give notification
            if (!selectedChatCompare || selectedChatCompare._id !== messageData.chat._id) {
                // give notif
                if (!notification.includes(messageData)) {
                    setNotification([messageData, ...notification])
                    setFetchAgain(!fetchAgain)
                }
            } else {
                setMessages([...messages, messageData])
                setFetchAgain(!fetchAgain)
            }
        })
    })
    const handleTyping = (e) => {
        setMessage(e.target.value)
        setCurrentUserTyping(true)

        if (!socketConnected) return

        if (!typing) {
            setTyping(true)
            socket.emit("typing", selectedChat._id)
        }

        // Since this function is called everytime the user types, we need to check if the user is still typing
        let lastTyping = new Date().getTime()
        let maxTypingTime = 4000    // max time we detect if the user is not typing
        setTimeout(() => {
            let timeNow = new Date().getTime()
            let timeDiff = timeNow - lastTyping

            if (timeDiff >= maxTypingTime && typing) {
                socket.emit("stop typing", selectedChat._id)
                setTyping(false)
                setCurrentUserTyping(false)
            }
        }, maxTypingTime)
    }

    useEffect(() => {
        fetchChatMessages()

        // Serves as the backup for the selected chat which will be used for deciding if we want to send the message as a message or as a notification
        selectedChatCompare = selectedChat
    }, [selectedChat])

    return (
        <StyledChatMain>
            <div className="header">
                <div className="left" onClick={isBigWidth ? handleChatContainer : undefined}>
                    <svg data-tip="Chats" data-type="info" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    <ReactTooltip />
                    <h4>Chats</h4>
                </div>
                <div className="center">
                    {selectedChat &&
                        <h1>{selectedChat?.isGroupChat ? selectedChat?.chatName.length > 24 ? selectedChat?.chatName.slice(0, 21) + "..." : selectedChat?.chatName
                            : getSenderName(user, selectedChat?.users).length > 24 ? getSenderName(user, selectedChat?.users).slice(0, 21) + "..." : getSenderName(user, selectedChat?.users)}</h1>
                    }
                </div>
                <div className="right" onClick={isBigWidth ? handleChatInfo : undefined}>
                    {selectedChat &&
                        <>
                            <svg data-tip="Chat Info" data-type="info" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <ReactTooltip />
                            <h4>Info</h4>
                        </>
                    }
                </div>
            </div>


            <>
                {!selectedChat ?
                    <div className="no-selected-chat">
                        <h1>No Chat selected!</h1>
                        <p>To get started:</p>
                        <ol>
                            <li>Navigate in your chats container (left side)</li>
                            <li>Select an existing chat or,</li>
                            <li>Find a user by using the search bar or,</li>
                            <li>Create a Group Chat by clicking the "+" icon.</li>
                            <p>When creating a Group Chat, you can find all people available to chat by entering a letter and reoving it inside the input field.</p>
                        </ol>
                    </div>
                    :
                    <>
                        <div className="chat-box-container">
                            <ScrollableFeed className='scrollable' forceScroll={true}>
                                {messages.length === 0 ?
                                    <h2 className="welcome-message">
                                        For starters, send: <p className="chat-message-content">"Hoy! Buntis daw si *insert name*"</p>
                                    </h2>
                                    :
                                    messages.map(message => {
                                        return <ChatMessage key={message._id} message={message} selectedChat={selectedChat} isTyping={isTyping} />
                                    })
                                }
                                {/* If the one typing is the current user then remove this typing animation */}
                                {isTyping && !currentUserTyping ? <Typing /> : <></>}
                                {loading && <div className="loader"><CircularProgress size="40" /></div>}
                            </ScrollableFeed>
                        </div>
                        <form onSubmit={handleSendMessage} className="chat-input-field">
                            <input value={message} type="text" placeholder="Spill that tea!" onChange={handleTyping} />
                            <button><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
                        </form>
                    </>
                }
            </>
        </StyledChatMain>
    )
}
