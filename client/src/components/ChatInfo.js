import React, { useState, useContext } from 'react'
import ReactTooltip from 'react-tooltip';
import { Chip, Stack, Avatar, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from "axios"

import { ChatCardII } from '.';
import { StyledChatInfo, StyledModal, StyledBackdrop, StyledGroupChatModal } from '../styles'
import { ChatContext } from '../context/ChatProvider';
import { getSenderName, getSenderAbout, getSenderImg } from "../utils"

export default function ChatInfo({ handleBack, backBtnIndicator }) {
    const { selectedChat, setSelectedChat, user, fetchAgain, setFetchAgain } = useContext(ChatContext)
    const [gcName, setGcName] = useState("");   // Inputted GC Name for renaming
    const [searchedUsersGC, setSearchedUsersGC] = useState("");   // For searching users inside the modal
    const [loading, setLoading] = useState(false);  // Loader
    const [loadingRename, setLoadingRename] = useState(false);  // Loader when renaming
    const [openModal, setOpenModal] = useState(false);  // Modal
    const handleClose = () => setOpenModal(false);
    const { enqueueSnackbar } = useSnackbar();

    /**
     * Fetches users typed in the input field
     * @param {String} userToFindGC 
     */
    const handleSearchUserGC = async (userToFindGC) => {
        try {
            const searchedUserGC = await axios.get(`/api/user?search=${userToFindGC}`)
            setSearchedUsersGC(searchedUserGC.data)
        } catch (error) {
            enqueueSnackbar("An error occured while searching the user. Try again.", { variant: "error" });
        }
    }

    /**
     * Used for renaming the GC
     * @param {null} 
     */
    const handleRenameGC = async () => {
        if (!gcName) {
            enqueueSnackbar("Please enter a name for the group chat", { variant: "warning" });
            return
        }
        try {
            setLoadingRename(true)
            const { data } = await axios.put("/api/chat/gchatrename", { chatId: selectedChat._id, chatName: gcName })
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)  // To trigger the useEffect in ChatContainer, forcing the allChat state to be rerendered again.
            setGcName("")
            setLoadingRename(false)
            setOpenModal(false)
            enqueueSnackbar("Renamed Successfully!", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Renaming failed. Please try again.", { variant: "error" });
            setLoadingRename(false)
        }
    }

    /**
     * Used for removing a user inside a selected GC
     * @param {Object} userToRemove
     */
    const handleRemoveUserFromGC = async (userToRemove) => {
        // Check first if admin is present in the group chat
        const adminIsPresent = selectedChat?.users.some(user => user._id === selectedChat.groupAdmin._id)   // returns boolean

        // Check if the current user is NOT the admin of the group chat AND if the adminIsPresent returns true meaning there is an admin
        if (selectedChat.groupAdmin._id !== user._id && adminIsPresent) {
            // Needs TRUE and TRUE to trigger this
            // Current user is NOT the admin and there is an admin present inside the GC
            // If the current user is the admin, then the first condition returns false
            enqueueSnackbar("Only admins can remove participants.", { variant: "warning" });
            return
        } else {
            // else, remove the user IF there is NO admin present inside the GC even if the current user is not the admin.
            try {
                const { data } = await axios.put("/api/chat/gchatremove", { chatId: selectedChat._id, userId: userToRemove._id })
                setSelectedChat(data)
                setFetchAgain(!fetchAgain)  // To trigger the useEffect in ChatContainer, forcing the allChat state to be rerendered again.
                enqueueSnackbar("Removed User Successfully!", { variant: "error" });
            } catch (error) {
                enqueueSnackbar("Removing user failed. Please try again.", { variant: "error" });
            }
        }
    }

    /**
     * As removing a user from a group chat is only possible if you are an admin and  if there is no admin inside the group chat,
     * then you won't be able to remove yourself or leave the GC.
     * This will solve that problem.
     * The params id needed for this function is get from the current user logged in.
     * @param {id} userToLeave
     */
    const handleLeaveGC = async (userToLeave) => {
        try {
            const { data } = await axios.put("/api/chat/gchatremove", { chatId: selectedChat._id, userId: userToLeave })
            // If the user left, remove the chat from the state to remove access from it
            userToLeave === user._id ? setSelectedChat(null) : setSelectedChat(data)
            setFetchAgain(!fetchAgain)  // To trigger the useEffect in ChatContainer, forcing the allChat state to be rerendered again.
            enqueueSnackbar("You left the Group Chat", { variant: "error" });
        } catch (error) {
            enqueueSnackbar("Leaving failed. Tell the group admin to remove you instead.", { variant: "error" });
        }
    }

    /**
     * Used for adding a user inside a selected GC
     * @param {Object} userToAdd
     */
    const handleAddUserToGC = async (userToAdd) => {
        // Check first if admin is present in the group chat
        const adminIsPresent = selectedChat?.users.some(user => user._id === selectedChat.groupAdmin._id)   // returns boolean

        // If the user is already inside the chat
        if (selectedChat.users?.find(user => user._id === userToAdd._id)) {
            enqueueSnackbar("User is already inside the chat. Please select others.", { variant: "warning" });
            return
        }

        // Check if the current user is NOT the admin of the group chat AND if the adminIsPresent returns true meaning there is an admin
        if (selectedChat.groupAdmin._id !== user._id && adminIsPresent) {
            // Needs TRUE and TRUE to trigger this
            // Current user is NOT the admin and there is an admin present inside the GC
            // If the current user is the admin, then the first condition returns false
            enqueueSnackbar("Only admins can add participants.", { variant: "warning" });
            return
        } else {
            // else, remove the user IF there is NO admin present inside the GC even if the current user is not the admin.
            try {
                setLoading(true)
                const { data } = await axios.put("/api/chat/gchatadd", { chatId: selectedChat._id, userId: userToAdd._id })
                setSelectedChat(data)
                setFetchAgain(!fetchAgain)  // To trigger the useEffect in ChatContainer, forcing the allChat state to be rerendered again.
                setLoading(false)
                enqueueSnackbar("Added Successfully!", { variant: "success" });
            } catch (error) {
                enqueueSnackbar("Adding failed. Please try again.", { variant: "error" });
                setLoading(false)
            }
        }
    }

    return (
        <StyledChatInfo>
            <div className="top">
                <div className="header">
                    {backBtnIndicator &&
                        <>
                            <svg data-tip="Back" data-type="info" onClick={handleBack} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                            <ReactTooltip />
                        </>
                    }
                    {selectedChat?.isGroupChat ? <h2>Group Info:</h2> : <h2>Chatting with:</h2>}
                    {selectedChat?.isGroupChat &&
                        <>
                            <svg data-tip="Configure" data-type="info" onClick={() => setOpenModal(true)} className="w-6 h-6 configure" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <ReactTooltip />
                        </>
                    }

                </div>

                {selectedChat?.isGroupChat ?
                    <div className="info-container">
                        <h2 className='head'>{selectedChat.chatName}</h2>
                        <h4 className="sub-head">About:</h4>
                        <p className='about-gc'>{selectedChat?.about}</p>
                        <h4 className="sub-head">Members:</h4>
                        {selectedChat ?
                            selectedChat?.users.map((user) => {
                                return <ChatCardII key={user._id} type="group" user={user} selectedChat={selectedChat} />
                            })
                            :
                            <div className="loader">
                                <CircularProgress size="40" />
                            </div>
                        }
                        <div className="btn-container">
                            <button className='btn-leave' onClick={() => handleLeaveGC(user._id)}>Leave</button>
                        </div>
                    </div>
                    :
                    <div className="info-container">
                        {selectedChat ?
                            <>
                                <img src={getSenderImg(user, selectedChat?.users)} alt='avatar' />
                                <h1 className='head'>{getSenderName(user, selectedChat?.users)}</h1>
                            </>
                            :
                            <div className="loader">
                                <CircularProgress size="40" />
                            </div>
                        }
                        <h4 className='sub-head'>About</h4>
                        {selectedChat ?
                            <p className='about-gc'>{getSenderAbout(user, selectedChat?.users)}</p>
                            :
                            <div className="loader">
                                <CircularProgress size="40" />
                            </div>
                        }
                    </div>
                }
            </div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openModal}
                onClose={handleClose}
                BackdropComponent={StyledBackdrop}
            >
                <StyledGroupChatModal>
                    <h1>Update Group Chat</h1>
                    <h4>Chat Name</h4>
                    <input type="text" value={gcName} placeholder={selectedChat?.chatName} onChange={(e) => setGcName(e.target.value)} />
                    <button className='btn-submit' disabled={loading} onClick={handleRenameGC}>{loadingRename ? <div className="loader"><CircularProgress size="5" /></div> : "Rename Chat"}</button>
                    <div className="p-head">
                        <h4>Participants</h4>
                        <svg data-tip="Clicking a user will remove them immediately." data-type="info" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <ReactTooltip />
                    </div>
                    <Stack sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }} direction="row" spacing={1}>
                        {selectedChat.users?.map((user) => {
                            return <div key={user._id} className="chip">
                                <Chip
                                    avatar={<Avatar alt={user.username} src={user.profileImg} />}
                                    label={user.username}
                                    color="secondary"
                                    size="small"
                                    onDelete={() => handleRemoveUserFromGC(user)}
                                />
                            </div>
                        })}
                    </Stack>
                    <input type="text" placeholder='Enter participant name' onChange={(e) => handleSearchUserGC(e.target.value)} />
                    <div className="results">
                        {searchedUsersGC &&
                            searchedUsersGC.map((user) => {
                                return <ChatCardII key={user._id} user={user} handleAdd={() => handleAddUserToGC(user)} />
                            })}
                    </div>
                </StyledGroupChatModal>
            </StyledModal>
        </StyledChatInfo>
    )
}
