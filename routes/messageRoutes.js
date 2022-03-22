const router = require("express").Router()

const { validateToken } = require("../config/jwt")
const { sendMessage, getAllMessages } = require("../controllers/messageControllers")

router.post("/", validateToken, sendMessage)

router.get("/:chatId", validateToken, getAllMessages)

module.exports = router