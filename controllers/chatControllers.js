const User = require("../models/UserModel")
const Chat = require("../models/ChatModel")

/**
 * Route for opening a one-one chat with another user.
 * If chat already exists, return chat data.
 * If chat does not exist, create new chat and return chat data.
 * To verify that a chat already exists with that user, check if chatModel users 
 * contain the id of the user and the current logged in user.
 * @param {*} req 
 * @param {*} res 
 * @param {id} res.body // User ID you want to chat with
 * @param {id} res.user // Current logged in user
 * @returns {status, Promise}
 */
const openChat = async (req, res) => {
    const { userId } = req.body // Id of the user you want to chat with
    const currentUserId = req.user.id // Id of the current logged in user from JWT token

    // Find chat in the DB
    let isChat = await Chat.find({
        isGroupChat: false, // Whatever chat we want to find should not be a GC
        $and: [ // Find the chat with the current logged in user and the user you want to chat with. Both should be TRUE ($and), meaning both users are in the chat.
            // Since "users" in this schma is a type id, we need to use $elemMatch to match the id's.
            { users: { $elemMatch: { $eq: currentUserId } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })  // We now have to populate properties such as users and latestMessage as they only return their id's and we want more info about them.
        .populate("users", "-password")   // Populate the users array with all the user data, excluding the password. 
        .populate("latestMessage") // Populate the latestMessage with the message data.

    // Inside latestMessage, it is referred to the Message model which also has sender which is ref to the User Model. We have to populate that sender to get its data.
    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "username profileImg about" })

    // If chat already exists, return chat data
    if (isChat.length > 0) {
        res.status(200).send(isChat[0])
    } else {
        // If chat does not exist, create new chat and return chat data
        const newChat = new Chat({
            chatName: "sender", // Sender name
            isGroupChat: false,
            users: [currentUserId, userId], // Add the current logged in user and the user you want to chat with
        })

        // Save the chat to the DB
        try {
            const createdChat = await Chat.create(newChat)  // Save chat
            // Find the chat using the created chat id and populate the users array with all the user data, excluding the password.
            const chatData = await Chat.find({ _id: createdChat._id }).populate("users", "-password")
            res.status(200).send(chatData)
        } catch (err) {
            res.status(400).json({ message: "Error creating chat." })
        }

    }
}

/**
 * Route for fetching all chats of the current logged in user.
 * Check every Chat collection's users array and identify if the current logged in user is inside it. If so, then return that particular chat.
 * @param {*} req 
 * @param {*} res 
 * @param {id} res.user // Current logged in user
 * @returns {status, Promise}
 */
const fetchChat = async (req, res) => {
    const currentUserId = req.user.id // Id of the current logged in user from JWT token

    try {
        let allFoundChats = await Chat.find({ users: { $elemMatch: { $eq: currentUserId } } })    // Checks if a chat contains the current logged in user.
            .populate("users", "-password")   // Populate the users array with all the user data, excluding the password.
            .populate("groupAdmin", "-password")   // Populate the groupAdmin array with all the user (admin) data, excluding the password.
            .populate("latestMessage") // Populate the latestMessage with the message data.
            .sort({ updatedAt: -1 }) // Sort the chats by the date they were updated or used.

        allFoundChats = await User.populate(allFoundChats, { path: "latestMessage.sender", select: "username profileImg about" })

        res.status(200).json(allFoundChats)
    } catch (error) {
        res.status(400).json({ message: "Error fetching chats." })
    }
}

/**
 * Route for creating a group chat.
 * @param {*} req 
 * @param {*} res 
 * @param {id} res.body // User ID's you want to chat with (could be multiple)
 * @param {Name, About} res.body // Name and About text of the group chat
 * @returns {status, Promise}
 */
const createGC = async (req, res) => {
    const currentUser = req.user
    const { users, name, about } = req.body

    if (!users || !name || !about) return res.status(400).json({ message: "Please enter all fields." })

    // In frontend, users are in an array format so we have to Stringfy it first and then Parse that data here.
    let convertedUsers = JSON.parse(users)

    // Check if the created GC has more than 3 users.
    if (convertedUsers.length < 2) return res.status(400).json({ message: "Group chat must have at least 3 users." })

    // Create a new chat
    convertedUsers.push(req.user); // Include the current logged in user to the users array.

    try {
        const newChat = new Chat({
            chatName: name,
            isGroupChat: true,
            users: convertedUsers,
            groupAdmin: currentUser,
            about: about
        })

        // Save the chat to the DB
        const createdChat = await Chat.create(newChat)  // Save chat
        // Find the chat using the created chat id and populate the users array and admin with all the user data, excluding the password.
        const chatData = await Chat.find({ _id: createdChat._id }).populate("users", "-password").populate("groupAdmin", "-password")
        res.status(200).json(chatData)
    } catch (err) {
        res.status(400).json({ message: "Error creating group chat." })
    }
}

/**
 * Route for renaming a group chat.
 * @param {*} req 
 * @param {*} res 
 * @param {chatId, chatName} res.body
 * @returns {status, Promise}
 */
const renameGC = async (req, res) => {
    const { chatId, chatName } = req.body

    try {
        /**
         * What to find: "chatId"; What to change: "chatName".
         * The "new" here will return the modified document. If it is not included, then it will return the orig document
         * Read more: https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
         */
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if (!updatedChat) {
            res.status(400).json({ message: "Chat not found." })
        } else {
            res.status(200).json(updatedChat)
        }

    } catch (error) {
        res.status(400).json({ message: "Error renaming group chat." })
    }
}

/**
 * Route for removing a user from a group chat.
 * NOTE: Add verification if the user you want to remove is present in the GC.
 * @param {*} req 
 * @param {*} res 
 * @param {chatId, userId} res.body // Group chat ID and the user to remove
 * @returns {status, Promise}
 */
const removeUserGC = async (req, res) => {
    const { chatId, userId } = req.body

    try {
        /**
         * Find the chat ID and pull the new user to its users array.
         * Read mode: https://docs.mongodb.com/manual/reference/operator/update/pull/
         */
        const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if (!removed) {
            res.status(400).json({ message: "Chat not found." })
        } else {
            res.status(200).json(removed)
        }
    } catch (error) {
        res.status(400).json({ message: "Error removing the user from this group chat." })
    }
}

/**
 * Route for adding a user to a group chat.
 * NOTE: Add verification if the user you want to add is already present in the GC.
 * @param {*} req 
 * @param {*} res 
 * @param {chatId, userId} res.body // Group chat ID and the user to add
 * @returns {status, Promise}
 */
const addUserGC = async (req, res) => {
    const { chatId, userId } = req.body

    try {
        /**
         * Find the chat ID and push the new user to its users array.
         * Read mode: https://docs.mongodb.com/manual/reference/operator/update/push/
         */
        const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if (!added) {
            res.status(400).json({ message: "Chat not found." })
        } else {
            res.status(200).json(added)
        }
    } catch (error) {
        res.status(400).json({ message: "Error adding user to group chat." })
    }
}


module.exports = { openChat, fetchChat, createGC, renameGC, removeUserGC, addUserGC }