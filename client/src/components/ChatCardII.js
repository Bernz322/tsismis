import React from 'react'
import ReactTooltip from 'react-tooltip';

import { StyledChatCardII } from '../styles'

export default function ChatCardII({ user, accessChat, type, handleAdd, selectedChat }) {
    return (
        <StyledChatCardII>
            <div className="card" >
                <div className="card-left">
                    <img src={user?.profileImg} alt="avatar" />
                    <div className="chat-title">{user?.username}</div>
                </div>

                {
                    type === "single" ?
                        <>
                            <svg onClick={accessChat} data-tip="Chat" data-type="info" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            <ReactTooltip />
                        </>
                        : type === "group" ?
                            <>
                                {/* Check if the current logged in user is an admin of the selected chat or not*/}
                                {user._id === selectedChat.groupAdmin._id ? "Admin" : ""}
                            </>
                            :
                            <>
                                <svg onClick={handleAdd} data-tip="Include to GC" data-type="info" className="w-6 h-6" fill="none" stroke="#3D59AB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                                <ReactTooltip />
                            </>
                }
            </div>
        </StyledChatCardII>
    )
}
