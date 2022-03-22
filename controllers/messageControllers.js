const Message = require("../models/MessageModel")
const User = require("../models/UserModel")
const Chat = require("../models/ChatModel")

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body
    const currentUserId = req.user.id // Id of the current logged in user from JWT token which is the sender of the message

    if (!content || !chatId) return res.status(400).json({ message: "Missing content or chat doesn't exist." })

    const newMessage = new Message({
        sender: currentUserId,
        content,
        chat: chatId,
    })

    try {
        let message = await Message.create(newMessage)
        message = await message.populate("sender", "profileImg username") // Populate the sender with its username and profileImg
        message = await message.populate("chat") // Populate the chat with all its data
        message = await User.populate(message, { path: "chat.users", select: "username profileImg" }) // Populate the chat.users array with their username and profileImg

        // Everytime a new message is sent, update the chat.latestMessage property with the new message.
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id })

        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({ message: "Error sending message." })
        console.log(error)
    }
}

const getAllMessages = async (req, res) => {
    const { chatId } = req.params
    try {
        const messages = await Message.find({ chat: chatId }).populate("sender", "profileImg username").populate("chat")
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({ message: "Error accessing chat messages." })
    }
}

module.exports = { sendMessage, getAllMessages }