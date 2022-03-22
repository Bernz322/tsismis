require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
const path = require('path')

const PORT = process.env.PORT || 8888
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/handleErrors')

// Serve all static files first
app.use(express.static(path.resolve('client/build')))

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connected to the DB")).catch((err) => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // To accept JSON data
app.use(cookieParser()); // Read Cookies (needed for auth/jwt)

// Routes
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)

// Handle Errors || Routes that aren't present
app.use(notFound)
app.use(errorHandler)

// Catch all remaining req that are not recognized and returns it to the React App, so it can handle routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const socketServer = app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

const io = require("socket.io")(socketServer, {
    pingTimeout: 60000, // Close connection if there is no activity for 60 seconds to save bandwidth
    cors: { origin: "http://localhost:3000" }
})

io.on('connection', (socket) => {  // When a user connects

    // Create a new socket for each user from the frontend when joining a room/ chat
    socket.on("setup", (userData) => {  // Parameters need to be filled up in the frontend using socket.emit("setup", userData)
        socket.join(userData?._id)   // Create a particular room/ chat for this user
        socket.emit("connected")
    })

    // In the frontend when we click a particular chat, the user will be added to this particular room/ chat
    // Happens also if another user clicks on that particular chat.
    socket.on("join chat", (chatId) => {
        socket.join(chatId) // Create a particular room/ chat for this user
        console.log(`User joined chat ${chatId}`)
    })

    // Socket for typing
    socket.on("typing", (chatId) => {
        socket.in(chatId).emit("typing")
    })

    // Socket for stop typing
    socket.on("stop typing", (chatId) => {
        socket.in(chatId).emit("stop typing")
    })

    // When a user sends a message, the message will be sent to all the users in the room/ chat
    socket.on("message sent", (messageData) => {
        let chat = messageData.chat
        if (!chat.users) return console.log("No users in the chat");

        chat.users.forEach((user) => {
            if (user._id == messageData.sender._id) return // If the user is the sender, then ignore it as we won't need it on their side
            // else send the message to the others present in the chat 
            socket.in(user._id).emit("message received", messageData)   // Emit the message to the sender created socket on line 40
        })
    })

    socket.off("setup", () => {
        console.log("User disconnected");
        socket.leave(userData?._id);
    })
});