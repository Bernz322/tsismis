const router = require("express").Router()

const { validateToken } = require("../config/jwt")
const { openChat, fetchChat, createGC, renameGC, removeUserGC, addUserGC } = require("../controllers/chatControllers")

router.post("/", validateToken, openChat)

router.get("/", validateToken, fetchChat)

router.post("/gchat", validateToken, createGC)

router.put("/gchatrename", validateToken, renameGC)

router.put("/gchatremove", validateToken, removeUserGC)

router.put("/gchatadd", validateToken, addUserGC)

module.exports = router;