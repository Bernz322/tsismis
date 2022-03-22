const router = require("express").Router()

const { validateToken } = require("../config/jwt")
const { registerUser, loginUser, searchUser } = require("../controllers/userControllers")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", validateToken, searchUser)

module.exports = router;