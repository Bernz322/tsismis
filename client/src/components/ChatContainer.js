import React, { useContext, useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip';
import axios from "axios"
import { Chip, Stack, Avatar, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';

import { StyledChatContainer, StyledModal, StyledBackdrop, StyledGroupChatModal } from '../styles'
import { ChatCard, ChatCardII } from '.'
import { ChatContext } from "../context/ChatProvider"

export default function ChatContainer({ handleBack, backBtnIndicator }) {

    const { searchedUsers, setSearchedUsers, selectedChat, setSelectedChat, allChats, setAllChats, fetchAgain } = useContext(ChatContext)
    const [isSearching, setIsSearching] = useState("");   // For rendering the chats container. If empty, render all avail chats, else render searched users
    const [searchedUsersGC, setSearchedUsersGC] = useState("");   // For searching users inside the modal
    const [currentUser, setCurrentUser] = useState();   // Current user logged in
    const [gcName, setGcName] = useState("");   // Inputted GC Name
    const [gcAbout, setGcAbout] = useState("");   // Inputted GC About
    const [selectedUsers, setSelectedUsers] = useState([]);   // Container for all users to be included in the GC
    const [loading, setLoading] = useState(false);  // Loader
    const [openModal, setOpenModal] = useState(false);  // Modal
    const handleClose = () => setOpenModal(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("userInfo")))
        const fetchData = async () => {
            try {
                const allAvailableChats = await axios.get("/api/chat")
                setAllChats(allAvailableChats.data)

            } catch (error) {
                enqueueSnackbar("Please wait as we are loading stuffs 😃.", { variant: "info" });
            }
        }
        fetchData()
    }, [fetchAgain, setAllChats, enqueueSnackbar]);


    /**
     * For fetching a one-one chat.
     * Called when we search a name in the search bar and clicked it.
     * @param {id} userId 
     */
    const fetchSingleChat = async (userId) => {
        try {
            const { data } = await axios.post("/api/chat", { userId })
            if (!allChats.find(chat => chat._id === data._id)) setAllChats([data[0], ...allChats]) // Append a newly created chat from someone to the allChats state.
            // data[0] is the newly created chat and used rather than "data" only as it returns an array which causes several errors.
            setIsSearching("")
            setSelectedChat(data[0])
        } catch (error) {
            enqueueSnackbar("Error accessing that particular chat. Try relogging in.", { variant: "error" });
        }
    }
    /**
     * For fetching a searched user.
     * Called everytime an onChange occurs on the search field on chat container.
     * @param {String} userToFind 
     */
    const handleSearchUser = async (userToFind) => {
        try {
            const searchedUser = await axios.get(`/api/user?search=${userToFind}`)
            setSearchedUsers(searchedUser.data)
        } catch (error) {
            enqueueSnackbar("An error occured while searching the user. Try again.", { variant: "error" });
        }
    }

    /**
     * For fetching a searched user.
     * Called everytime an onChange occurs on the search field on modal when creating a new GC
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
     * Handler for all users to be included in the GC
     * After searching for users, the user can select them to be included in the GC
     * @param {Object} user 
     */
    const handleAddUserGC = async (userToInclude) => {
        if (selectedUsers?.includes(userToInclude)) {    // If the user is already selected
            enqueueSnackbar("User is already in the list. Try adding others.", { variant: "warning" });
        } else {
            setSelectedUsers([...selectedUsers, userToInclude])
        }
    }

    /**
     * Handler for removing users to be included in the GC
     * Called on the MUI Chip component onDelete prop
     * @param {Object} user 
     */
    const handleRemoveFromSelectedUsers = (userToRemove) => {
        setSelectedUsers(selectedUsers.filter(user => user._id !== userToRemove._id))   // Remove the user from the selectedUsers state
    }

    /**
     * Handler creating the GC
     * After searching for users, the user can select them to be included in the GC
     * @param {null} 
     */
    const handleCreateGC = async () => {
        setLoading(true)

        if (selectedUsers.length < 2) {
            enqueueSnackbar("You need at least 2 users to create a group chat.", { variant: "warning" });
            setLoading(false)
            return;
        }

        if (!selectedUsers || !gcName) {
            enqueueSnackbar("Please fill in fields.", { variant: "warning" });
            setLoading(false)
            return;
        }

        try {
            const { data } = await axios.post("/api/chat/gchat", {
                users: JSON.stringify(selectedUsers.map((user) => user._id)),
                name: gcName,
                about: gcAbout
            })
            setAllChats([data[0], ...allChats]) // Append a newly created chat from someone to the allChats state.
            setLoading(false)
            setOpenModal(false)
            enqueueSnackbar("Group chat created.", { variant: "success" });
        } catch (error) {
            setLoading(false)
            enqueueSnackbar("Error creating group chat. Try again.", { variant: "error" });
        }
    }

    const handleSearchUserSingle = (e) => {
        handleSearchUser(e.target.value);
        setIsSearching(e.target.value);
    }

    return (
        <StyledChatContainer>
            <div className="header">
                {backBtnIndicator &&
                    <>
                        <svg data-tip="Back" data-type="info" onClick={handleBack} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                        <ReactTooltip />
                    </>
                }
                <h2>Chats</h2>
                <div className="search-add">
                    <div className="search-field">
                        <input value={isSearching} data-tip="Enter name here" data-type="info" type="text" placeholder='Search' onChange={handleSearchUserSingle} />
                        <ReactTooltip />
                        <svg className="w-6 h-6 search-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <svg onClick={() => setOpenModal(true)} data-tip="Create a Group Chat" data-type="info" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <ReactTooltip />
                </div>
            </div>
            {allChats.length <= 0 &&
                <div className='no-chats'>
                    <h1>Welcome!</h1>
                    <p>To get started, please read the instructions inside the right container.</p>
                    <hr />
                    <p>By the way, thank you for taking an interest on using this ❤️.</p>
                    <hr />
                    <p>You can find the source code on the footer below with the Github icon. Give it a ⭐ maybe?</p>
                </div>
            }
            {
                isSearching ?
                    searchedUsers ?
                        searchedUsers.map((user) => {
                            return <ChatCardII key={user._id} user={user} accessChat={() => fetchSingleChat(user._id)} type="single" />
                        })
                        : <div className="loader"><CircularProgress size="40"/></div>
                    :
                    allChats ? allChats?.map((chat) => {
                        return <ChatCard key={chat._id} chat={chat} selectedChat={selectedChat} isSelectedChat={() => setSelectedChat(chat)} currentUser={currentUser} handleBack={handleBack} />
                    }) : <div className="loader"><CircularProgress size="40"/></div>
            }
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openModal}
                onClose={handleClose}
                BackdropComponent={StyledBackdrop}
            >
                <StyledGroupChatModal>
                    <h1>Create Group Chat</h1>
                    <h4>Chat Name</h4>
                    <input type="text" placeholder="Enter chat name" onChange={(e) => setGcName(e.target.value)} />
                    <h4>Chat About (Optional)</h4>
                    <textarea name="" id="" cols="30" rows="5" placeholder="Maybe add some description? (Optional)" onChange={(e) => setGcAbout(e.target.value)}></textarea>
                    {selectedUsers.length > 0 && <h4>Participants</h4>}
                    <Stack direction="row" spacing={1}>
                        {selectedUsers?.map((user) => {
                            return <div key={user._id} className="chip"><Chip
                                avatar={<Avatar alt={user.username} src={user.profileImg} />}
                                label={user.username}
                                color="secondary"
                                size="small"
                                onDelete={() => handleRemoveFromSelectedUsers(user)}
                            /></div>
                        })}
                    </Stack>
                    <h4>Search a user</h4>
                    <input type="text" placeholder='Enter participant name' onChange={(e) => handleSearchUserGC(e.target.value)} />
                    <div className="results">
                        {searchedUsersGC &&
                            searchedUsersGC.map((user) => {
                                return <ChatCardII key={user._id} user={user} handleAdd={() => handleAddUserGC(user)} />
                            })}
                        {loading && <div className="loader"><CircularProgress size="40"/></div>}
                    </div>
                    <button className='btn-submit' onClick={handleCreateGC} disabled={loading}>Create Group Chat</button>
                </StyledGroupChatModal>
            </StyledModal>
        </StyledChatContainer >
    )
}
