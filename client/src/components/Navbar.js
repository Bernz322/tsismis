import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { StyledNavbar } from '../styles'
import { ChatContext } from "../context/ChatProvider";

export default function Navbar({ themeToggler, theme }) {
    const history = useNavigate();
    const [openNotif, setOpenNotif] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const { user, notification, setNotification, setSelectedChat } = useContext(ChatContext)


    const handleProfileClick = () => { setOpenNotif(false); setOpenProfile(!openProfile) }
    const handleLogout = () => { localStorage.removeItem('userInfo'); history("/"); setOpenProfile(false)}

    const handleNotifClick = () => {
        setOpenNotif(!openNotif);
        setOpenProfile(false);
    }

    const handleNotifItemClick = (chat, notif) => {
        setSelectedChat(chat)
        setNotification(notification.filter((n) => n !== notif))
    }

    return (
        <StyledNavbar>
            <div className="navbar">
                <div className="left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <h1>Tsismis</h1>
                </div>
                {user ?
                    <>
                        <div className="right">
                            <div className="user">
                                <p>Hello, <span className="username">{user.username}</span></p>
                                <div className="theme" onClick={() => themeToggler()}>
                                    {theme === 'light' ?
                                        <svg className="w-6 h-6 right-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                        :
                                        <svg className="w-6 h-6 right-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                    }
                                </div>
                                <div className="notif" onClick={handleNotifClick}>
                                    <svg className="w-6 h-6 right-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                    {notification.length > 0 && <span className='notif'>{notification.length}</span>}

                                </div>
                                <img onClick={handleProfileClick} src={user.profileImg} alt="avatar" />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="right">
                            <div className="user">
                                <div className="theme" onClick={() => themeToggler()}>
                                    {theme === 'light' ?
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                        :
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
                {openNotif &&
                    <div className="floating-notif-menu">
                        <div className="notif-container">
                            {notification.length > 0 && notification ?
                                notification.map((notif, index) => {
                                    return <React.Fragment key={index}>
                                        {notif.chat.isGroupChat ?
                                            <p onClick={() => handleNotifItemClick(notif.chat, notif)}>{notif.chat.chatName}<span> has new message.</span></p>
                                            :
                                            <p onClick={() => handleNotifItemClick(notif.chat, notif)}>{notif.sender.username}<span> messaged you.</span></p>
                                        }
                                        {notification.length > 1 && <hr />}
                                    </React.Fragment>
                                })
                                :
                                <p>No notification</p>
                            }
                        </div>
                    </div>
                }
                {openProfile &&
                    <div className="floating-profile-menu">
                        <div className="logout-container" onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                }
            </div>
        </StyledNavbar>
    )
}
