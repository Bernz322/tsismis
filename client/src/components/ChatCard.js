import React from 'react'
import moment from "moment"

import { StyledChatCard } from '../styles'
import { getSenderName, getSenderImg } from '../utils'

export default function ChatCard({ chat, selectedChat, isSelectedChat, currentUser, handleBack }) {
    /**
     * Formatting moment fromNow() 
     * https://stackoverflow.com/questions/55234064/momentjs-with-two-separate-fromnow-formats
     * https://stackoverflow.com/questions/38367038/format-relative-time-in-momentjs
     */
    moment.updateLocale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "secs",
            ss: "%ss",
            m: "a min",
            mm: "%dm",
            h: "1h",
            hh: "%dh",
            d: "a day",
            dd: "%dd",
            M: "month",
            MM: "%dM",
            y: "year",
            yy: "%dY"
        }
    });

    const handleClick = () => {
        /**
         * This is to ensure that everytime we click a single chat, we display the
         * ChatMain.js which contains all messages. Important especially for small screens.
         */
        handleBack()
        isSelectedChat()
    }

    const senderName = chat?.latestMessage?.sender?.username === currentUser?.username ? "You" : chat?.latestMessage?.sender?.username
    const message = chat?.latestMessage?.content
    const fullLatestMsg = senderName?.concat(': ', message)
    return (
        <StyledChatCard>
            {chat &&
                <div onClick={handleClick} className={`card ${selectedChat === chat && "selected"}`}>
                    <div className="card-left">
                        <img src={!chat?.isGroupChat ? getSenderImg(currentUser, chat.users) : "https://library.kissclipart.com/20180829/jle/kissclipart-icon-whatsapp-group-png-clipart-computer-icons-onl-574dd457563d3c20.png"} alt="avatar" />
                        <div className="chat-deets">
                            <div className="chat-title">{!chat?.isGroupChat ? getSenderName(currentUser, chat.users) : chat.chatName}</div>
                            {chat?.latestMessage &&
                                <div className="recent-chat">{fullLatestMsg.slice(0, 23) + (fullLatestMsg.length > 23 ?  "..." : "")}</div>
                            }
                        </div>
                    </div>
                    <p className="timespan">{moment(chat.updatedAt).fromNow()}</p>
                </div>
            }
        </StyledChatCard >
    )
}
