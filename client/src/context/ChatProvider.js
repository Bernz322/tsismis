import { createContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

export const ChatContext = createContext()

export function ChatProvider({ children }) {
    const history = useNavigate();
    const [user, setUser] = useState();     // Contains current logged in user data
    const [searchedUsers, setSearchedUsers] = useState();   // Contains all searched users
    const [allChats, setAllChats] = useState([]); // Contains all fetched chats of the current logged in user
    const [selectedChat, setSelectedChat] = useState();   // Contains all chat data of a selected chat
    const [notification, setNotification] = useState([]);   // Contains al notifications
    const [fetchAgain, setFetchAgain] = useState(false);   // Used to trigger useEffect inside ChatContainer.js


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if (!userInfo) {
            history("/")
        }
    }, [history]);

    const contextValues = {
        user,
        setUser,
        searchedUsers,
        setSearchedUsers,
        allChats,
        setAllChats,
        selectedChat,
        setSelectedChat,
        fetchAgain,
        setFetchAgain,
        notification,
        setNotification
    }

    return (
        <ChatContext.Provider value={contextValues}>
            {children}
        </ChatContext.Provider>
    )
}